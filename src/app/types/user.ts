export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  isAdmin?: boolean;
  error?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   token?: string;
// };

// export type AuthResponse = {
//   success: boolean;
//   isAdmin?: boolean;
//   error?: string;
//   user?: User;
// };

// // Para extender tu sistema de autenticación
// export type LoginFormData = {
//   email: string;
//   password: string;
// };

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

