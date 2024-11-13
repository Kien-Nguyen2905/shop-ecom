import { AxiosError } from 'axios';

const ENTITY_ERROR_STATUS = 422;

type EntityErrorPayload = {
  message: string;
  errors: {
    [field: string]: string;
  };
};

type ErrorPayload = {
  message: string;
  status: number;
};

// Lớp cơ bản xử lý lỗi HTTP chung
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({
    status,
    payload,
    message = 'Lỗi HTTP',
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

// Lớp xử lý lỗi thực thể từ Axios
export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: 'Lỗi thực thể' });
    this.status = status;
    this.payload = payload;
  }
}

// Tạo một hàm để xử lý lỗi từ AxiosError và chuyển thành EntityError nếu cần
export function handleAxiosError(error: AxiosError): HttpError {
  if (error.response?.status === ENTITY_ERROR_STATUS) {
    const { message, errors } = error.response.data as EntityErrorPayload;
    return new EntityError({
      status: ENTITY_ERROR_STATUS,
      payload: { message, errors },
    });
  } else {
    // Sử dụng toán tử optional chaining và kiểm tra kiểu dữ liệu
    const data = error.response?.data as Partial<ErrorPayload>;
    const message = data?.message || error.message || 'Lỗi không xác định';
    const status = error.response?.status || 500;

    return new HttpError({
      status,
      payload: data || {},
      message,
    });
  }
}