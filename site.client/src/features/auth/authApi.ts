import { LoginDto } from '@/types/auth/LoginDto';
import { RegisterDto } from '@/types/auth/RegisterDto';
import { UserDto } from '@/types/auth/UserDto';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserDto, RegisterDto>({
      query: (data) => ({
        url: 'auth/register-user',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          data: response.data
        }
      }
    }),
    loginUser: builder.mutation<UserDto, LoginDto>({
      query: (credentials) => ({
        url: 'auth/login-user',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
