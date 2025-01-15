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

// Handle HTTP
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({
    status,
    payload,
    message = 'HTTP Error',
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

// Handle Axios
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
    super({ status, payload, message: 'Entity Error' });
    this.status = status;
    this.payload = payload;
  }
}

export function handleAxiosError(error: AxiosError): HttpError {
  if (error.response?.status === ENTITY_ERROR_STATUS) {
    const { message, errors } = error.response.data as EntityErrorPayload;
    return new EntityError({
      status: ENTITY_ERROR_STATUS,
      payload: { message, errors },
    });
  } else {
    const data = error.response?.data as Partial<ErrorPayload>;
    const message = data?.message || error.message || 'Entity Error';
    const status = error.response?.status || 500;

    return new HttpError({
      status,
      payload: data || {},
      message,
    });
  }
}
