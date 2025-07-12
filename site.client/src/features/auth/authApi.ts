import { customBaseQuery } from "@/lib/api/baseApi";
import { LoginDto } from "@/types/auth/LoginDto";
import { UserDto } from "@/types/auth/UserDto";
import { ApiResult } from "@/types/shared/ApiResult";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<ApiResult<UserDto>, LoginDto>({
      query: (credentials) => ({
        url: "auth/login-user",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<ApiResult<UserDto>, LoginDto>({
      query: (credentials) => ({
        url: "auth/register-user",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
