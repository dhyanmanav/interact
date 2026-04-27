import { questionsData } from '../data/questions';

export interface TestState {
  status: 'not_started' | 'in_progress' | 'completed';
  startTime?: number;
  currentQuestion?: number;
  answers?: (number | null)[];
  score?: number;
  time_taken?: number;
}

export interface Submission {
  user: string;
  answers: (number | null)[];
  score: number;
  time_taken: number;
  status: string;
  submittedAt: number;
}

export function calculateScore(answers: (number | null)[]): number {
  return answers.reduce((total, answer, index) => {
    if (answer === questionsData[index].correct_answer) {
      return total + questionsData[index].points;
    }
    return total;
  }, 0);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeShort(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function getTestState(userEmail: string): TestState | null {
  const testStateStr = localStorage.getItem(`test_${userEmail}`);
  if (!testStateStr) return null;
  
  try {
    return JSON.parse(testStateStr);
  } catch {
    return null;
  }
}

export function saveTestState(userEmail: string, state: TestState): void {
  localStorage.setItem(`test_${userEmail}`, JSON.stringify(state));
}

export function getSubmissions(): Submission[] {
  const submissionsStr = localStorage.getItem('submissions');
  if (!submissionsStr) return [];
  
  try {
    return JSON.parse(submissionsStr);
  } catch {
    return [];
  }
}

export function saveSubmission(submission: Submission): void {
  const submissions = getSubmissions();
  submissions.push(submission);
  localStorage.setItem('submissions', JSON.stringify(submissions));
}

export function getUserSubmission(userEmail: string): Submission | null {
  const submissions = getSubmissions();
  return submissions.find(s => s.user === userEmail) || null;
}
