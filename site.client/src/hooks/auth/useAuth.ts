import { loginUser, registerUser } from "@/features/auth/authApi";
import { setAuthUser } from "@/features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useRegister = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(setAuthUser(data));
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setAuthUser(data));
    },
  });
};
