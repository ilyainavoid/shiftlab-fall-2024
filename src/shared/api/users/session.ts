import { RequestConfig, SessionResponse } from '@/entities/api/api';
import api from '@/shared/api/api.ts';

export type GetSessionConfig = RequestConfig;
export const getSession = ({ config }: GetSessionConfig) =>
  api.get<SessionResponse>('/users/session', config);
