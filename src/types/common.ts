/**
 * Game related types
 */
export interface Game {
  id: string;
  title: string;
  image: any; // TODO: Replace with proper image type
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

/**
 * Reward related types
 */
export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  image?: any; // TODO: Replace with proper image type
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
