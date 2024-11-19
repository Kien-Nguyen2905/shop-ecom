export interface IToast {
  type: 'error' | 'success' | 'info' | 'warn';
  message: string;
  error?: any;
}
