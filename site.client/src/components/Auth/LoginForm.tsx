"use client";


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";



import { useLoginUserMutation } from "@/features/auth/authApi";

const schema = z.object({
  phoneNumber: z.string().min(10, 'Phone number is required'),
  password: z.string().min(6, 'Password is required')
});

type LoginFormData = z.infer<typeof schema>;


const LoginForm = () => {
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data).unwrap();
      alert("Logged in!");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4">


      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          {...register('phoneNumber')}
          className="w-full p-2 border rounded"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>



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
        {isLoading
          ? 'Logining in ...' : 'Login'}
      </button>
    </form>
  );

};

export default LoginForm;
