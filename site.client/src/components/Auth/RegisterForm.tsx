"use client";


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "@/features/auth/authApi";


const schema = z.object({
  userName: z.string().min(2, 'Username is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const [registerUser, { isLoading, error, isSuccess }] = useRegisterUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();
      alert('registration succeeded!'); // temporary
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4">
      <div>
        <label className="block mb-1">Username</label>
        <input
          {...register('userName')}
          className="w-full p-2 border rounded"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
      </div>

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

      <div>
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="w-full p-2 border rounded"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
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
