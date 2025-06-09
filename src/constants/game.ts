export const GAME_CATEGORIES = {
  PUZZLE: "Puzzle",
  ACTION: "Action",
  STRATEGY: "Strategy",
  ARCADE: "Arcade",
} as const;

export const GAME_RATINGS = {
  MIN: 1,
  MAX: 5,
} as const;

export const GAME_IMAGES = {
  GEOMETRY_ARROW: require("../../assets/images/game1.png"),
  TETRIS: require("../../assets/images/game2.png"),
  CHESS: require("../../assets/images/game3.png"),
  SNAKE: require("../../assets/images/game4.png"),
} as const;
