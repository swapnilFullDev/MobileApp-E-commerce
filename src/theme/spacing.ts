import { Dimensions } from "react-native";
import { fonts } from "./fonts";

const { width } = Dimensions.get("window");

const px = (ratio: number) => Number((width * ratio).toFixed(2));

export const spacing = {
  // xs: scale(4),
  // sm: scale(8),
  // md: scale(16),
  // lg: scale(24),
  // xl: scale(32),
  // xxl: scale(40),
  // xxxl: scale(48),

  xs: px(0.01),
  sm: px(0.02),
  md: px(0.03),
  lg: px(0.04),
  xl: px(0.05),
  xxl: px(0.06),
  xxxl: px(0.07),
};
