import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/common";

interface UserState {
  currentUser: User | null;
  isRegisterPopupOpen: boolean;
  isLoginPopupOpen: boolean;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
  isLoading: false,
  error: null,
  isLoggedIn: false,
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
      state.isLoggedIn = true;
      sessionStorage.setItem("funzernUseremail", action.payload.email);
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
      state.isLoggedIn = false;
      sessionStorage.clear();
    },
    checkLoginStatus: (state) => {
      const userEmail = sessionStorage.getItem("funzernUseremail");
      state.isLoggedIn = !!userEmail;
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
  checkLoginStatus,
} = userSlice.actions;

export default userSlice.reducer;
