import { ApiError, ResponseHttp } from "@/types";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const message: string = error.message;
    const data: ResponseHttp = error.data as ResponseHttp;
    return String(data?.message ?? message);
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Error desconocido';
  }
};
