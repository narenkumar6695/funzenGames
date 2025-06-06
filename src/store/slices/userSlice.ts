import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/common";

interface UserState {
  currentUser: User | null;
  isRegisterPopupOpen: boolean;
  isLoginPopupOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRegisterPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isRegisterPopupOpen = action.payload;
    },
    setLoginPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginPopupOpen = action.payload;
    },
    registerUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isRegisterPopupOpen = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const {
  setRegisterPopupOpen,
  setLoginPopupOpen,
  registerUser,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
