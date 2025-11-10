import { Dimensions, PixelRatio } from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export const width = windowDimensions.width;
export const height = screenDimensions.height;

export const wp = (percentage: number) =>
  (windowDimensions.width * percentage) / 100;
export const hp = (percentage: number) =>
  (windowDimensions.height * percentage) / 100;

export const widthPercent = (decimal: number) =>
  windowDimensions.width * decimal;
export const heightPercent = (decimal: number) =>
  windowDimensions.height * decimal;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (windowDimensions.height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const responsiveFont = (size: number) =>
  PixelRatio.roundToNearestPixel(moderateScale(size));

const responsiveLineHeight = (size: number, multiplier = 1.35) =>
  Math.round(moderateVerticalScale(size * multiplier));

export {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  responsiveFont,
  responsiveLineHeight,
  windowDimensions,
  screenDimensions,
};
