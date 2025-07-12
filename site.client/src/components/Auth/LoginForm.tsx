"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/store";
import { saveUserToLocalStorage } from "@/utils/storage";
import { useLoginUserMutation } from "@/features/auth/authApi";
import { setAuthUser } from "@/features/auth/authSlice";
import { ApiErrorResponse } from "@/types/shared/ApiErrorResponse";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(15, "Phone number is too long"),
  password: z.string().min(6, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    const response = await loginUser(data);

    if ("data" in response && response.data?.isSuccess) {
      const user = response.data.data!;
      dispatch(setAuthUser(user));
      saveUserToLocalStorage(user);
      router.push("/");
    } else if (
      "data" in response &&
      response.data &&
      !response.data.isSuccess
    ) {
      // This is a business logic failure (like wrong credentials)
      setErrorMessage(response.data.errors?.join(", ") || "Login failed.");
    } else if ("error" in response) {
      const err = response.error as FetchBaseQueryError;
      if (err.status === "FETCH_ERROR") {
        setErrorMessage("Network error occurred.");
      } else {
        const apiErr = err.data as ApiErrorResponse["data"];
        setErrorMessage(
          apiErr?.errors?.join(", ") || apiErr?.message || "Login failed."
        );
      }
    } else {
      setErrorMessage("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-bold tracking-widest">Login Form</h2>

        <div>
          <label className="block mb-1 tracking-widest">Phone Number</label>
          <input
            {...register("phoneNumber")}
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 tracking-widest">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Logining in ..." : "Login"}
        </button>
      </form>
      {errorMessage && (
        <div className="max-w-xl mx-auto mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded font-serif">
          {<div className="error">{errorMessage}</div>}
        </div>
      )}
    </>
  );
};

export default LoginForm;
