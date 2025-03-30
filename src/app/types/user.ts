// src/app/types/user.ts
export type UserRole = "admin" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
};

export type AuthResponse = {
  success: boolean;
  isAdmin?: boolean;
  error?: string;
  user?: User;
};

// Para extender tu sistema de autenticación
export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
