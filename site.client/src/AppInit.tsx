"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { setAuthUser } from "@/features/auth/authSlice";
import { loadUserFromLocalStorage } from "./utils/storage";

export default function AppInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = loadUserFromLocalStorage();
    if (user) {
      dispatch(setAuthUser(user));
    }
  }, [dispatch]);

  return null;
}
