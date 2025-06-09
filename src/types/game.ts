import { ImageSourcePropType } from "react-native";

export interface Game {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description?: string;
  category?: string;
  rating?: number;
}

export interface GameCategory {
  id: string;
  name: string;
  description?: string;
}

export interface GameRating {
  value: number;
  count: number;
}
