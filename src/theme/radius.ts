import { Dimensions } from "react-native";
import { fonts } from "./fonts";

const { width } = Dimensions.get("window");

const px = (ratio: number) => Number((width * ratio).toFixed(2));

export const radius = {
  // xs: scale(2),
  // sm: scale(4),
  // md: scale(8),
  // lg: scale(12),
  // xl: scale(10),
  // xxl: scale(12),
  // xxxl: scale(14),
  // full: scale(999),

  sm: px(0.01),
  md: px(0.02),
  lg: px(0.03),
  xl: px(0.04),
  xxl: px(0.05),
  round: 9999,
};
