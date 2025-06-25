import { ImageSourcePropType } from "react-native";

/**
 * Game related types
 */
export interface Game {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description?: string;
  category?: string;
  rating?: number;
}

/**
 * User related types
 */
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

/**
 * Reward related types
 */
export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  image?: ImageSourcePropType;
}

/**
 * UI related types
 */
export interface ScreenSize {
  isMediumScreen: boolean;
  isLargeScreen: boolean;
}

export interface PopupProps {
  visible: boolean;
  onClose: () => void;
}

export interface CardProps {
  onPress?: () => void;
  className?: string;
}

/**
 * Form related types
 */
export interface FormData {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
}

export interface FormMessage {
  type: "success" | "error";
  message: string;
}

export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface LoginFormErrors {
  identifier?: string;
  password?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
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

export interface PlayerDetailsProps {
  onBack: () => void;
  isFromJoinEarn?: boolean;
}

export interface JoinEarnCardProps {
  onPress: () => void;
  showUserDetails?: boolean;
}

export interface ViewAllRewardsCardProps {
  onPress?: () => void;
}

export interface HeaderProps {
  onShowAllRewards?: () => void;
  onLogoClick?: () => void;
  onShowPlayerDetails?: () => void;
}

export interface UserState {
  currentUser: User | null;
  isRegisterPopupOpen: boolean;
  isLoginPopupOpen: boolean;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}
