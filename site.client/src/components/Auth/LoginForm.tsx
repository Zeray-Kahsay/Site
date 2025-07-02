"use client";

import { loginUser } from "@/features/auth/authApi";
import { setAuthUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { LoginDto } from "@/types/auth/LoginDto";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<LoginDto>({ phoneNumber: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authData = await loginUser(form);
      dispatch(setAuthUser(authData));
      alert("Logged in!");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
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
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="input"
      />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
