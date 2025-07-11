"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLoginUserMutation } from "@/features/auth/authApi";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { setAuthUser } from "@/features/auth/authSlice";
import { saveUserToLocalStorage } from "@/utils/storage";
import { userAuthState } from "@/types/auth/userAuthState";
import { useState } from "react";

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
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data).unwrap();

      if (result.isSuccess && result.data) {
        saveUserToLocalStorage(result.data);
        dispatch(setAuthUser(result.data));
        router.push("/");
        console.log("Login successful:", result.data);
      } else {
        setErrorMessage(result.errors?.join(", ") || "Login failed");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMessage("An unexpected error occurred.");
    }

  }

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
      <div className="max-w-xl mx-auto mt-1 p-3 space-y-4">
        {error && 'data' in error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 text-sm font-serif" role="alert">
            <strong className="font-semibold">Login failed:</strong>
            {(error.data as any)?.errors?.join(', ') || "Something went wrong. Please try again."}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="max-w-xl mx-auto mt-1 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm font-serif">{errorMessage}</p>
        </div>
      )}



    </>
  )
};


export default LoginForm;
