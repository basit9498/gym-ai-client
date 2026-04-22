// Mock authentication system — replace with real API calls later

export type UserRole = 'user' | 'admin';
const SESSION_KEY = 'agentic_session';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: string;
}

interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}
interface WalletSettingsResult {
  success: boolean;
  data: any;
  error?: string;
}
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export async function login(email: string, password: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return { success: false, error: data.message || 'Invalid email or password.' };
    }
    
    const user: AuthUser = {
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role, // Defaulting to user for now
      joinedAt: new Date().toISOString().split('T')[0],
    };
    
    // Store token globally if needed, for now attaching to user in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, token: data.token }));
    }
    
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Network Error' };
  }
}

export async function register(name: string, email: string, password: string, walletNetworkId: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, walletNetworkId }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return { success: false, error: data.message || 'Registration failed.' };
    }
    
    const user: AuthUser = {
      id: data._id,
      name: data.name,
      email: data.email,
      role: 'user',
      joinedAt: new Date().toISOString().split('T')[0],
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, token: data.token }));
    }
    
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Network Error' };
  }
}

export async function getWalletSettings(): Promise<WalletSettingsResult> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/wallet-settings`);
    const data = await res.json();
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, data: [], error: error.message || 'Network Error' };
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getSession(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function getRole(): UserRole | null {
  return getSession()?.role ?? null;
}

export function getDashboardRoute(role: UserRole): string {
  return role === 'admin' ? '/admin' : '/dashboard';
}
