import { userAuthState } from "@/types/auth/userAuthState";
import { loadUserFromLocalStorage } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: userAuthState | null } = {
  user: loadUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<userAuthState>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
