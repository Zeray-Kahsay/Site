import customBaseQuery from "@/lib/api/baseApi";
import { LoginDto } from "@/types/auth/LoginDto";
import { RegisterDto } from "@/types/auth/RegisterDto";
import { userAuthState } from "@/types/auth/userAuthState";
import { UserDto } from "@/types/auth/UserDto";
import { Result } from "@/types/result";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserDto, RegisterDto>({
      query: (data: RegisterDto) => ({
        url: "auth/register-user",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response: { status: any; data: any; }) => {
        return {
          status: response.status,
          data: response.data,
        };
      },
    }),
    loginUser: builder.mutation<Result<userAuthState>, LoginDto>({
      query: (credentials) => ({
        url: "auth/login-user",
        method: "POST",
        body: credentials,
      }),
    })
  })
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
