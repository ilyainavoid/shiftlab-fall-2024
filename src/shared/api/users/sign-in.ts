import {
  RequestConfig,
  SubmitOTPPayload,
  SubmitOTPResponse,
} from '@/entities/api/api';
import api from '@/shared/api/api.ts';

export type SignInConfig = RequestConfig<SubmitOTPPayload>;
export const signIn = ({ params, config }: SignInConfig) =>
  api.post<SubmitOTPResponse>('/users/signin', params, config);
