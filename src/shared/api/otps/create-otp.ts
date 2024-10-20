import {
  CreateOTPPayload,
  CreateOTPResponse,
  RequestConfig,
} from '@/entities/api/api';
import api from '@/shared/api/api.ts';

export type CreateOTPConfig = RequestConfig<CreateOTPPayload>;
export const createOTP = ({ params, config }: CreateOTPConfig) =>
  api.post<CreateOTPResponse>('/auth/otp', params, config);
