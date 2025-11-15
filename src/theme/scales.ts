import { Dimensions } from "react-native";
import { fonts } from "./fonts";

const { width } = Dimensions.get("window");

const px = (ratio: number) => Number((width * ratio).toFixed(2));

export const ICON_SIZES = {
  xs: px(0.03),
  sm: px(0.035),
  md: px(0.04),
  lg: px(0.045),
  xl: px(0.05),
  xxl: px(0.06),
  xxxl: px(0.1),
} as const;

export type IconSizeName = keyof typeof ICON_SIZES;
export type IconSizeValue = (typeof ICON_SIZES)[IconSizeName];

export const layoutSpacing = {
  xs: px(0.01),
  sm: px(0.02),
  md: px(0.03),
  lg: px(0.04),
  xl: px(0.05),
  xxl: px(0.06),
} as const;

export type SpacingToken = keyof typeof layoutSpacing;
export type SpacingValue = (typeof layoutSpacing)[SpacingToken];

export const typeScale = {
  fontFamily: {
    // regular: fonts.regular,
    // medium: fonts.medium,
    // bold: fonts.bold,
    // semibold: fonts.semiBold,

    light: "OpenSans-Light",
    lightItalic: "OpenSans-LightItalic",
    regular: "OpenSans-Regular",
    italic: "OpenSans-Italic",
    medium: "OpenSans-Medium",
    mediumItalic: "OpenSans-MediumItalic",
    semiBold: "OpenSans-SemiBold",
    semiBoldItalic: "OpenSans-SemiBoldItalic",
    bold: "OpenSans-Bold",
    boldItalic: "OpenSans-BoldItalic",
    extraBold: "OpenSans-ExtraBold",
    extraBoldItalic: "OpenSans-ExtraBoldItalic",
  },
  fontSize: {
    xs: px(0.03),
    sm: px(0.035),
    md: px(0.04),
    lg: px(0.045),
    xl: px(0.05),
    xxl: px(0.06),
    xxxl: px(0.1),
    loader: px(0.05),
  },
  lineHeight: {
    xs: px(0.032),
    sm: px(0.04),
    md: px(0.05),
    lg: px(0.06),
    xl: px(0.08),
    xxl: px(0.08),
    xxxl: px(0.09),
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export type FontFamilyToken = keyof typeof typeScale.fontFamily;
export type FontSizeToken = keyof typeof typeScale.fontSize;
export type LineHeightToken = keyof typeof typeScale.lineHeight;
export type FontWeightToken = keyof typeof typeScale.fontWeight;

export const radii = {
  sm: px(0.01),
  md: px(0.02),
  lg: px(0.03),
  xl: px(0.04),
  xxl: px(0.05),
  round: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
