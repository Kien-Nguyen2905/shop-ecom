export interface SuccessResponse<T> {
  message: string;
  status?: number;
  data: T;
}
