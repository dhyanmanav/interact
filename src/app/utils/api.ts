import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-641c2aec`;

export interface LoginResponse {
  success: boolean;
  user?: {
    username: string;
    isAdmin: boolean;
  };
  message?: string;
}

export interface CreateUserResponse {
  success: boolean;
  user?: {
    username: string;
  };
  message?: string;
}

export interface SubmitTestResponse {
  success: boolean;
  submission?: any;
  message?: string;
}

export interface GetUsersResponse {
  success: boolean;
  users?: Array<{
    username: string;
    isAdmin: boolean;
    createdAt: number;
  }>;
  message?: string;
}

export interface GetSubmissionsResponse {
  success: boolean;
  submissions?: Array<{
    username: string;
    answers: (number | null)[];
    score: number;
    timeTaken: number;
    submittedAt: number;
    status: string;
  }>;
  message?: string;
}

export interface TestStatusResponse {
  success: boolean;
  status?: string;
  submission?: any;
  message?: string;
}

// Fallback to localStorage if backend is not available
const USE_BACKEND = true; // Using Supabase backend

// Helper to hash passwords (simple for demo, not cryptographically secure)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  if (!USE_BACKEND) {
    // Fallback: localStorage implementation
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check admin credentials
    if (username === 'dhyan@gmail.com' && password === '12345678') {
      return {
        success: true,
        user: { username: 'dhyan@gmail.com', isAdmin: true }
      };
    }

    // Check regular users
    const user = users.find((u: any) => u.username === username && u.passwordHash === simpleHash(password));
    if (user) {
      return {
        success: true,
        user: { username: user.username, isAdmin: false }
      };
    }

    return { success: false, message: 'Invalid credentials' };
  }

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log('Login response:', data);
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, message: 'Network error during login' };
  }
}

export async function createUser(username: string, password: string, adminKey: string): Promise<CreateUserResponse> {
  if (!USE_BACKEND) {
    // Fallback: localStorage implementation
    if (adminKey !== 'INTERACT2026') {
      return { success: false, message: 'Invalid admin key' };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }

    const newUser = {
      username,
      passwordHash: simpleHash(password),
      isAdmin: false,
      createdAt: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return {
      success: true,
      message: 'User created successfully',
      user: { username },
    };
  }

  try {
    const response = await fetch(`${API_BASE}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ username, password, adminKey }),
    });

    const data = await response.json();
    console.log('Create user response:', data);
    return data;
  } catch (error) {
    console.error('Create user API error:', error);
    return { success: false, message: 'Network error during user creation' };
  }
}

export async function submitTest(
  username: string,
  answers: (number | null)[],
  score: number,
  timeTaken: number
): Promise<SubmitTestResponse> {
  if (!USE_BACKEND) {
    // Fallback: localStorage implementation
    const submission = {
      username,
      answers,
      score,
      timeTaken,
      submittedAt: Date.now(),
      status: 'submitted',
    };

    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    return {
      success: true,
      message: 'Test submitted successfully',
      submission,
    };
  }

  try {
    const response = await fetch(`${API_BASE}/submit-test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ username, answers, score, timeTaken }),
    });

    return await response.json();
  } catch (error) {
    console.error('Submit test API error:', error);
    return { success: false, message: 'Network error during test submission' };
  }
}

export async function getUsers(): Promise<GetUsersResponse> {
  if (!USE_BACKEND) {
    // Fallback: localStorage implementation
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return {
      success: true,
      users: users.map((u: any) => ({
        username: u.username,
        isAdmin: u.isAdmin || false,
        createdAt: u.createdAt,
      })),
    };
  }

  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Get users API error:', error);
    return { success: false, message: 'Network error while fetching users' };
  }
}

export async function getSubmissions(): Promise<GetSubmissionsResponse> {
  if (!USE_BACKEND) {
    // Fallback: localStorage implementation
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const sorted = submissions.sort((a: any, b: any) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    return {
      success: true,
      submissions: sorted,
    };
  }

  try {
    const response = await fetch(`${API_BASE}/submissions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Get submissions API error:', error);
    return { success: false, message: 'Network error while fetching submissions' };
  }
}

export async function getTestStatus(username: string): Promise<TestStatusResponse> {
  if (!USE_BACKEND) {
    // Fallback: localStorage implementation
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const userSubmission = submissions.find((s: any) => s.username === username);

    if (userSubmission) {
      return {
        success: true,
        status: 'completed',
        submission: userSubmission,
      };
    }

    return {
      success: true,
      status: 'not_started',
    };
  }

  try {
    const response = await fetch(`${API_BASE}/test-status/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Get test status API error:', error);
    return { success: false, message: 'Network error while fetching test status' };
  }
}
