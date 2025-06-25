export const TOP_PLAYERS = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  username: "Ramu",
  points: 200,
  rank: i + 1,
}));
