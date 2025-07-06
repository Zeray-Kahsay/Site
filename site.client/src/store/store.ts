import authReducer from "@/features/auth/authSlice";
import { authApi } from "@/features/auth/authApi";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  clearUserFromStorage,
  loadUserFromLocalStorage,
  saveUserToLocalStorage,
} from "@/utils/storage";

const preloadedUser = loadUserFromLocalStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  preloadedState: {
    auth: {
      user: preloadedUser,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.user) {
    saveUserToLocalStorage(state.auth.user);
  } else {
    clearUserFromStorage();
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
