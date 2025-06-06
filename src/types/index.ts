export interface User {
  id: string;
  username: string;
  score: number;
  level: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface RootState {
  user: UserState;
  games: GamesState;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface GamesState {
  games: Game[];
  featuredGame: Game | null;
  loading: boolean;
  error: string | null;
}

export * from "./Player";
