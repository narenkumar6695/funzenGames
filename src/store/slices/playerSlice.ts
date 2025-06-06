import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../types";

interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
    addPlayer(state, action: PayloadAction<Player>) {
      state.players.push(action.payload);
    },
    clearPlayers(state) {
      state.players = [];
    },
  },
});

export const { setPlayers, addPlayer, clearPlayers } = playerSlice.actions;
export default playerSlice.reducer;
