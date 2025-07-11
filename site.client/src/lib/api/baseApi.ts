// src/lib/customBaseQuery.ts
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
    isSuccess: boolean;
    data: T | null;
    errors?: string[];
    isServiceUnavailable?: boolean;
}


const rawBaseQuery = fetchBaseQuery({ baseUrl });

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    // Check if the result has a data property and if it is an object with 'isSuccess'>)
    if (result?.data && typeof result.data === 'object' && 'isSuccess' in result.data) {
        const res = result.data as ApiResponse<unknown>;

        if (res.isSuccess) {
            return { data: res.data };
        }

        return {
            error: {
                status: res.isServiceUnavailable ? 503 : 400,
                data: {
                    message: res.errors?.join(', ') || 'Something went wrong',
                    errors: res.errors,
                },
            },
        };
    }

    return result;
};

export default customBaseQuery;
