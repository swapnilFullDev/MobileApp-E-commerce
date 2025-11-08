import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

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
};
