export interface ApiResult<T> {
  isSuccess: boolean;
  data?: T;
  errors: string[];
  isServiceUnavailable: boolean;
}
