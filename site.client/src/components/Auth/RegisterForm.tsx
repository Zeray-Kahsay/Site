"use client";


import React from "react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";


const registerSchema = z.object({
  userName: z.string().min(2, 'Username is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [registerUser, { isLoading, error, isSuccess }] = useRegisterUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();
      router.push('/login')
      alert('registration succeeded!'); // temporary
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold tracking-widest">Registration Form</h2>
      <div>
        <input
          {...register('userName')}
          placeholder="User name"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
      </div>

      <div>
        <input
          {...register('phoneNumber')}
          placeholder="Phone Number"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          placeholder="Email Address"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      {error && "data" in error && typeof error.data === "object" && error.data !== null && "errors" in error.data && (
        <div className="text-red-600 text-sm space-y-1 mt-2">
          {Object.entries((error.data as { errors: Record<string, unknown> }).errors).map(
            ([field, messages]) =>
              Array.isArray(messages) &&
              messages.map((msg, idx) =>
                typeof msg === "string" ? <p key={`${field}-${idx}`}>{msg}</p> : null
              )
          )}
        </div>
      )}



      {/* {error && (
        <p className="text-red-600">
          {"status" in error
            ? typeof error.data === "string"
              ? error.data
              : "An error occurred"
            : error.message || "An error occurred"}
        </p>
      )} */}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLoading
          ? 'Registering...' : 'Register'}
      </button>
    </form>
  );



























  // const { mutate: register, isPending, error, isError } = useRegister();
  // const [form, setForm] = useState<RegisterDto>({
  //   phoneNumber: "",
  //   userName: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     register(form);
  //     alert("Registered successfully!"); // to be replaced with sth
  //   } catch (err) {
  //     console.error(err);
  //     alert("Registration failed");
  //   }
  // };

  // return (
  //   <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow space-y-4">
  //     <h2 className="text-2xl font-bold tracking-widest">Registration Form</h2>

  //     <input
  //       name="phoneNumber"
  //       placeholder="Phone Number"
  //       onChange={handleChange}
  //       required
  //       className="w-full p-2 border rounded tracking-widest"
  //     />
  //     <input
  //       name="userName"
  //       placeholder="Username"
  //       onChange={handleChange}
  //       required
  //       className="w-full p-2 border rounded tracking-widest"
  //     />
  //     <input
  //       name="password"
  //       type="password"
  //       placeholder="Password"
  //       onChange={handleChange}
  //       required
  //       className="w-full p-2 border rounded tracking-widest"
  //     />
  //     <input
  //       name="confirmPassword"
  //       type="password"
  //       placeholder="Confirm Password"
  //       onChange={handleChange}
  //       required
  //       className="w-full p-2 border rounded tracking-widest"
  //     />

  //     {isPending && <p className="text-blue-500"> Registering user... </p>}

  //     {isError && (
  //       <p className="text-red-500">
  //         {error?.message || "Something went wrong. Try again"}
  //       </p>
  //     )}

  //     <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 
  //       font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded tracking-widest">
  //       {isPending ? "Processing..." : "Register"}
  //     </button>
  //   </form>
  // );
};

export default RegisterForm;
