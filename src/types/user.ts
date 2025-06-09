export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  isRegistered: boolean;
  avatar?: string;
}

export interface Player {
  id: string;
  username: string;
  points: number;
  rank: number;
  avatar?: string;
}

export interface UserProfile extends User {
  gamesPlayed: number;
  totalPoints: number;
  rank: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}
