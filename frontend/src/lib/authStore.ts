export interface UserAccount {
  username: string;
  email: string;
  passwordHash: string; // Plain/hashed simulation for client-side persistence
  role: 'operator' | 'viewer';
  createdAt: string;
}

const STORAGE_USERS_KEY = 'payresolve_users_db';
const STORAGE_SESSION_KEY = 'payresolve_current_user';
const STORAGE_RESET_KEY = 'payresolve_reset_tokens';

// Seed default accounts matching .env and hackathon requirements
const DEFAULT_USERS: UserAccount[] = [
  {
    username: 'operator',
    email: 'operator@payresolve.dev',
    passwordHash: 'operator123',
    role: 'operator',
    createdAt: new Date().toISOString()
  },
  {
    username: 'viewer',
    email: 'viewer@payresolve.dev',
    passwordHash: 'viewer123',
    role: 'viewer',
    createdAt: new Date().toISOString()
  }
];

export const initUserStore = () => {
  const existing = localStorage.getItem(STORAGE_USERS_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
};

export const getUsers = (): UserAccount[] => {
  initUserStore();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
  } catch {
    return DEFAULT_USERS;
  }
};

export const registerUser = (account: Omit<UserAccount, 'createdAt'>): { success: boolean; error?: string } => {
  const users = getUsers();
  const exists = users.some(
    u => u.username.toLowerCase() === account.username.toLowerCase() || 
         u.email.toLowerCase() === account.email.toLowerCase()
  );

  if (exists) {
    return { success: false, error: 'Username or email already registered.' };
  }

  const newUser: UserAccount = {
    ...account,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const authenticateUser = (identifier: string, password: string): { success: boolean; user?: UserAccount; error?: string } => {
  const users = getUsers();
  const user = users.find(
    u => (u.username.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase()) &&
         u.passwordHash === password
  );

  if (!user) {
    return { success: false, error: 'Invalid username/email or password.' };
  }

  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const getCurrentUser = (): UserAccount | null => {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_SESSION_KEY);
};

export const createPasswordResetToken = (email: string): string => {
  const token = 'tok_' + Math.random().toString(36).substring(2, 10);
  const existingTokens: Record<string, string> = JSON.parse(localStorage.getItem(STORAGE_RESET_KEY) || '{}');
  existingTokens[email.toLowerCase()] = token;
  localStorage.setItem(STORAGE_RESET_KEY, JSON.stringify(existingTokens));
  return token;
};

export const updatePasswordByEmail = (emailOrUsername: string, newPassword: string): boolean => {
  const users = getUsers();
  const target = users.find(
    u => u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
         u.username.toLowerCase() === emailOrUsername.toLowerCase()
  );

  if (!target) return false;

  target.passwordHash = newPassword;
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  return true;
};
