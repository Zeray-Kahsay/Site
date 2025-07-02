"use client";

import { useRegister } from "@/hooks/auth/useAuth";
import { RegisterDto } from "@/types/auth/RegisterDto";
import { useState } from "react";

const RegisterForm = () => {
  //const dispatch = useDispatch<AppDispatch>();
  const { mutate: register, isPending, error, isError } = useRegister();
  const [form, setForm] = useState<RegisterDto>({
    phoneNumber: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      register(form);
      alert("Registered successfully!"); // to be replaced with sth
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        name="phoneNumber"
        placeholder="Phone"
        onChange={handleChange}
        required
        className="input"
      />
      <input
        name="userName"
        placeholder="Username"
        onChange={handleChange}
        required
        className="input"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="input"
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
        className="input"
      />

      {isPending && <p className="text-blue-500"> Registering user... </p>}

      {isError && (
        <p className="text-red-500">
          {error?.message || "Something went wrong. Try again"}
        </p>
      )}

      <button type="submit" className="btn">
        {isPending ? "Processing..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
