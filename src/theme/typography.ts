import { fonts } from './fonts';
import { responsiveFont, responsiveLineHeight } from './metrics';

type TypographyStyle = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
};

const createTextStyle = (
  size: number,
  fontFamily: string,
  lineHeightMultiplier = 1.35,
): TypographyStyle => ({
  fontFamily,
  fontSize: responsiveFont(size),
  lineHeight: responsiveLineHeight(size, lineHeightMultiplier),
});

export const typography = {
  heading: createTextStyle(28, fonts.semiBold, 1.25),
  subheading: createTextStyle(20, fonts.medium, 1.3),
  body: createTextStyle(16, fonts.regular, 1.5),
  caption: createTextStyle(14, fonts.regular, 1.4),
  button: createTextStyle(16, fonts.semiBold, 1.4),
  label: createTextStyle(14, fonts.semiBold, 1.3),
  input: createTextStyle(16, fonts.regular, 1.4),
  helper: createTextStyle(13, fonts.medium, 1.3),
};

export type TypographyVariant = keyof typeof typography;
