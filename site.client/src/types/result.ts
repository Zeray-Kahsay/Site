export interface Result<T> {
    isSuccess: boolean;
    data: T | null;
    errors?: string[];
    isServiceUnavailable?: boolean;
}
