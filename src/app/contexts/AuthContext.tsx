import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, accessCode: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'dhyan@gmail.com';
const ADMIN_PASSWORD = '12345678';
const ACCESS_CODE = 'interact2026';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { email, isAdmin: true };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return true;
    }

    // Regular user login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const regularUser = { email, isAdmin: false };
      setUser(regularUser);
      localStorage.setItem('currentUser', JSON.stringify(regularUser));
      return true;
    }

    return false;
  };

  const signup = (email: string, password: string, accessCode: string) => {
    if (accessCode !== ACCESS_CODE) {
      return { success: false, message: 'Invalid access code' };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'Credentials generated. Use them to login.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
