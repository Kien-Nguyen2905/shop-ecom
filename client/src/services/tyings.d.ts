export interface SuccessResponse<T = any> {
  message: string;
  status?: number;
  data: T;
}
