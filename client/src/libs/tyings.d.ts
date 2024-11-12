export interface IToast {
  type: 'error' | 'success' | 'info';
  message: string;
  error?: any;
}
