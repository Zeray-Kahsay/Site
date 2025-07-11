"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    userName: z.string().min(2, "Username is required"),
    phoneNumber: z.string().min(10, "Phone number is required"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();
      router.push("/login");
      alert("registration succeeded!"); // temporary
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold tracking-widest">Registration Form</h2>
      <div>
        <input
          {...register("userName")}
          placeholder="User name"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phoneNumber")}
          placeholder="Phone Number"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email Address"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {error &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "errors" in error.data && (
          <div className="text-red-600 text-sm space-y-1 mt-2">
            {Object.entries(
              (error.data as { errors: Record<string, unknown> }).errors
            ).map(
              ([field, messages]) =>
                Array.isArray(messages) &&
                messages.map((msg, idx) =>
                  typeof msg === "string" ? (
                    <p key={`${field}-${idx}`}>{msg}</p>
                  ) : null
                )
            )}
          </div>
        )}

      {error && (
        <p className="text-red-600">
          {"status" in error
            ? typeof error.data === "string"
              ? error.data
              : "An error occurred"
            : error.message || "An error occurred"}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
