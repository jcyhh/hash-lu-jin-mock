import { post } from '@/utils/request'

export interface AuthResult { token: string }
export interface LoginParams { username: string; password: string }
export interface RegisterParams extends LoginParams { ref?: string }

export const loginAccount = (data: LoginParams) => post('/api/auth/login', data) as unknown as Promise<AuthResult>
export const registerAccount = (data: RegisterParams) => post('/api/auth/register', data) as unknown as Promise<AuthResult>
