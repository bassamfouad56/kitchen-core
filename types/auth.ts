// Authentication-related types
import { User } from '@prisma/client';

export type UserRole = 'ADMIN' | 'EDITOR';

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface AuthSession {
  user: SessionUser;
  expires: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export type { User };
