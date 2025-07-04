import { authApi } from "@/features/auth/authApi";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/features/auth/authSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState ? { auth: JSON.parse(serializedState) } : undefined;
  } catch {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state.auth);
    localStorage.setItem("authState", serializedState);
  } catch (e) {
    console.error(e);
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Subscribe to store changes and persist
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
