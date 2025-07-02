import axiosApi from "@/lib/api/axiosApi";
import { AuthState } from "@/types/auth/AuthState";
import { LoginDto } from "@/types/auth/LoginDto";
import { RegisterDto } from "@/types/auth/RegisterDto";

export async function registerUser(dto: RegisterDto): Promise<AuthState> {
  const { data } = await axiosApi.post("/api/auth/register-user", dto);

  return {
    token: data.token,
    userId: data.id,
    userName: data.userName,
    phoneNumber: data.phoneNumber,
  };
}

export async function loginUser(dto: LoginDto): Promise<AuthState> {
  const { data } = await axiosApi.post("/api/auth/login-user", dto);

  return {
    token: data.token,
    userId: data.id,
    userName: data.userName,
    phoneNumber: data.phoneNumber,
  };
}
