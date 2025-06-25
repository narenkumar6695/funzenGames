import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types";

const initialState: UserState = {
  currentUser: null,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

// Initialize state from sessionStorage if available
if (typeof window !== "undefined") {
  const userEmail = sessionStorage.getItem("funzernUseremail");
  if (userEmail) {
    initialState.isLoggedIn = true;
    initialState.currentUser = {
      id: "1",
      username: userEmail.split("@")[0],
      email: userEmail,
      points: 1000,
      isRegistered: true,
    };
  }
}

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
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoginPopupOpen = false;
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
      // If logged in but no currentUser, create a basic user object
      if (userEmail && !state.currentUser) {
        state.currentUser = {
          id: "1",
          username: userEmail.split("@")[0], // Use email prefix as username
          email: userEmail,
          points: 1000,
          isRegistered: true,
        };
      }
    },
  },
});

export const {
  setRegisterPopupOpen,
  setLoginPopupOpen,
  registerUser,
  loginUser,
  setLoading,
  setError,
  logout,
  checkLoginStatus,
} = userSlice.actions;

export default userSlice.reducer;
