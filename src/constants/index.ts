/**
 * Application constants
 */
export const APP_NAME = "Funzen Games";

/**
 * Game related constants
 */
export const GAME_CATEGORIES = {
  PUZZLE: "puzzle",
  ACTION: "action",
  STRATEGY: "strategy",
  ADVENTURE: "adventure",
} as const;

export const GAME_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

/**
 * API related constants
 */
export const API_ENDPOINTS = {
  BASE_URL: "https://api.funzengames.com",
  GAMES: "/games",
  USERS: "/users",
  AUTH: "/auth",
} as const;

/**
 * Storage related constants
 */
export const STORAGE_KEYS = {
  USER_TOKEN: "@funzen_games:user_token",
  USER_DATA: "@funzen_games:user_data",
} as const;

/**
 * Navigation related constants
 */
export const SCREEN_NAMES = {
  HOME: "Home",
  GAMES: "Games",
  PROFILE: "Profile",
  GAME_DETAILS: "GameDetails",
  SETTINGS: "Settings",
} as const;

/**
 * Form validation constants
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 32,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
} as const;
