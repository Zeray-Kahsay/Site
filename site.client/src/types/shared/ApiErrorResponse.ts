export interface ApiErrorResponse {
  status: number;
  data: {
    message: string;
    errors: string[];
    isServiceUnavailable: boolean;
  };
}
