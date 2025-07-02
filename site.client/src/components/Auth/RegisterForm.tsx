"use client";

import { registerUser } from "@/features/auth/authApi";
import { setAuthUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { RegisterDto } from "@/types/auth/RegisterDto";
import { useState } from "react";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      const authData = await registerUser(form);
      dispatch(setAuthUser(authData));
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
      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
