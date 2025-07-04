"use client";


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";



import { useLoginUserMutation } from "@/features/auth/authApi";
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { setAuthUser } from '@/features/auth/authSlice';

const loginSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number is required')
    .max(15, 'Phone number is too long'),
  password: z.string().min(6, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;


const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await loginUser(data).unwrap();
      dispatch(setAuthUser(user));
      router.push('/')
      alert("Logged in!");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold tracking-widest">Login Form</h2>

      <div>
        <label className="block mb-1 tracking-widest">Phone Number</label>
        <input
          {...register('phoneNumber')}
          className="w-full p-2 border rounded"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="block mb-1 tracking-widest">Password</label>
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
