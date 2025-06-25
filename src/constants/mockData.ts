export const TOP_PLAYERS = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  username: "Ramu",
  points: 200,
  rank: i + 1,
}));

export const PLAYER_DETAILS_DUMMY = {
  coins: 1000,
  recentGameActivity: [
    { date: "20 May, 2025", time: "11:44:50 AM", game: "Tetris", coins: 200 },
    { date: "20 May, 2025", time: "11:44:50 AM", game: "Chess", coins: 200 },
    { date: "20 May, 2025", time: "11:44:50 AM", game: "Carrom", coins: 200 },
    { date: "20 May, 2025", time: "11:44:50 AM", game: "Tetris", coins: 200 },
  ],
  recentPurchases: [],
  userInfo: {
    email: "player@example.com",
    name: "Jane Doe",
    phone: "+91 9876543210",
    address: "",
  },
};
