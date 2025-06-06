import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, GamesState } from "../../types";

const initialState: GamesState = {
  games: [],
  featuredGame: null,
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
      state.error = null;
    },
    setFeaturedGame: (state, action: PayloadAction<Game>) => {
      state.featuredGame = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addGame: (state, action: PayloadAction<Game>) => {
      state.games.push(action.payload);
    },
    updateGame: (state, action: PayloadAction<Game>) => {
      const index = state.games.findIndex(
        (game) => game.id === action.payload.id
      );
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    removeGame: (state, action: PayloadAction<string>) => {
      state.games = state.games.filter((game) => game.id !== action.payload);
    },
  },
});

export const {
  setGames,
  setFeaturedGame,
  setLoading,
  setError,
  addGame,
  updateGame,
  removeGame,
} = gamesSlice.actions;

export default gamesSlice.reducer;
