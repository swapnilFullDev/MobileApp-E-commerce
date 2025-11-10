import {
  typeScale,
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  LineHeightToken,
} from "./scales";

type TypographyStyle = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
};

type VariantConfig = {
  size: FontSizeToken;
  family?: FontFamilyToken;
  weight?: FontWeightToken;
  lineHeight?: LineHeightToken;
};

const createVariant = ({
  size,
  family = "regular",
  weight = "regular",
  lineHeight,
}: VariantConfig): TypographyStyle => ({
  fontFamily: typeScale.fontFamily[family],
  fontSize: typeScale.fontSize[size],
  lineHeight: typeScale.lineHeight[lineHeight ?? size],
  fontWeight: typeScale.fontWeight[weight],
});

export const typography = {
  heading: createVariant({
    size: "xl",
    family: "semibold",
    weight: "bold",
    // lineHeight: "xl",
  }),
  subheading: createVariant({
    size: "lg",
    family: "medium",
    weight: "semibold",
    // lineHeight: "lg",
  }),
  body: createVariant({
    size: "md",
    family: "regular",
    weight: "regular",
    // lineHeight: "md",
  }),
  caption: createVariant({
    size: "sm",
    family: "regular",
    weight: "regular",
    // lineHeight: "sm",
  }),
  button: createVariant({
    size: "md",
    family: "semibold",
    weight: "semibold",
    // lineHeight: "md",
  }),
  label: createVariant({
    size: "sm",
    family: "semibold",
    weight: "semibold",
    // lineHeight: "sm",
  }),
  input: createVariant({
    size: "md",
    family: "regular",
    weight: "regular",
    // lineHeight: "md",
  }),
  helper: createVariant({
    size: "xs",
    family: "medium",
    weight: "medium",
    // lineHeight: "xs",
  }),
};

export type TypographyVariant = keyof typeof typography;
