"use client";

//import { loginUser } from "@/features/auth/authApi";
//import { setAuthUser } from "@/features/auth/authSlice";
import { useLogin } from "@/hooks/auth/useAuth";
//import { AppDispatch } from "@/store/store";
import { LoginDto } from "@/types/auth/LoginDto";
import { useState } from "react";
//import { useDispatch } from "react-redux";

const LoginForm = () => {
  //const dispatch = useDispatch<AppDispatch>();
  const { mutate: login, isPending, error, isError } = useLogin();
  const [form, setForm] = useState<LoginDto>({ phoneNumber: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const authData = await loginUser(form);
      // dispatch(setAuthUser(authData));
      login(form);
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

      {isPending && <p className="text-blue-500"> Logging in... </p>}

      {isError && (
        <p className="text-red-500">
          {error?.message || "Something went wrong. Try agian"}
        </p>
      )}

      <button type="submit" className="btn">
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
