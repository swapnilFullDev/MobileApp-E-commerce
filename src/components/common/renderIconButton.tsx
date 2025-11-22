import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Icons } from "../../constants/images";
import { scale, widthPercent } from "../../theme/metrics";

type RenderIconButtonProps = {
  icon: keyof typeof Icons;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  tintColor?: string;
  hitSlop?: TouchableOpacityProps["hitSlop"];
  activeOpacity?: number;
  keyProp?: string;
};

export const renderIconButton = ({
  icon,
  onPress,
  containerStyle,
  iconStyle,
  tintColor = "#2F4157",
  hitSlop,
  activeOpacity = 0.85,
  keyProp,
}: RenderIconButtonProps) => (
  <TouchableOpacity
    key={keyProp ?? icon}
    onPress={onPress}
    activeOpacity={activeOpacity}
    hitSlop={hitSlop}
    style={[styles.iconButton, containerStyle]}
  >
    <Image
      source={Icons[icon]}
      style={[
        icon == "leftArrow" ? styles.leftArrowIcon : styles.icon,
        iconStyle,
        tintColor ? { tintColor } : undefined,
      ]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconButton: {
    width: widthPercent(0.07),
    height: widthPercent(0.07),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: widthPercent(0.06),
    height: widthPercent(0.06),
    resizeMode: "contain",
  },
  leftArrowIcon: {
    width: widthPercent(0.045),
    height: widthPercent(0.045),
    resizeMode: "contain",
  },
});
