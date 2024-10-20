import { User } from '@/entities/user/user.ts';

export type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };

export interface CreateOTPPayload {
  phone: string;
}

export interface SubmitOTPPayload {
  phone: string;
  code: number;
}

export interface CreateOTPResponse {
  success: boolean;
  reason?: string;
  retryDelay: string;
}

export interface SubmitOTPResponse {
  success: boolean;
  reason?: string;
  user: User;
  token: string;
}

export interface SessionResponse {
  success: boolean;
  reason?: string;
  user: User;
}
