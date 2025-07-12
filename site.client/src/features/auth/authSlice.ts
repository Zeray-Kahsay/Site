import { UserDto } from "@/types/auth/UserDto";
import { loadUserFromLocalStorage } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserDto | null;
}

const initialState: AuthState = {
  user: loadUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
