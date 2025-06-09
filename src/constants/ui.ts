export const SCREEN_BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const COLORS = {
  PRIMARY: {
    GREEN: "#A1FF00",
    DARK_GREEN: "#00FF6A",
  },
  SECONDARY: {
    LIGHT_GREEN: "#E5E5E5",
  },
  TEXT: {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    DARK_GRAY: "#191919",
    LIGHT_GRAY: "#828282",
  },
  BACKGROUND: {
    DARK_GRAY: "#191919",
    LIGHT_GRAY: "#E5E5E5",
  },
  STATUS: {
    LIMITED: "#FFA600",
    LOW: "#FF0000",
    AVAILABLE: "#00FF6A",
    UNAVAILABLE: "#828282",
  },
} as const;
