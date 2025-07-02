import { AuthState } from "@/types/auth/AuthState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: null,
  userId: null,
  userName: null,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<AuthState>) {
      Object.assign(state, action.payload);
      // state.token = action.payload.token;
      // state.userId = action.payload.userId;
      // state.userName = action.payload.userName;
      // state.phoneNumber = action.payload.phoneNumber;
    },
    logout(state) {
      Object.assign(state, initialState);
      // state.token = null;
      // state.userId = null;
      // state.userName = null;
      // state.phoneNumber = null;
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
