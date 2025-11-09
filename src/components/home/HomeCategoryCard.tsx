import React from "react";
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Images from "../../constants/images";
import { CategoryItem } from "../../data/home";
import { useTheme } from "../../context";
import { moderateScale } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { radius } from "../../theme/radius";
import { fonts } from "../../theme/fonts";

type HomeCategoryCardProps = {
  category: CategoryItem;
  onPress?: (category: CategoryItem) => void;
  style?: StyleProp<ViewStyle>;
};

export default function HomeCategoryCard({
  category,
  onPress,
  style,
}: HomeCategoryCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: theme.border,
        },
        style,
      ]}
      onPress={() => onPress?.(category)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={Images[category.image]}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay} />
        <Text style={styles.label}>{category.label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  imageRadius: {
    borderRadius: radius.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000055",
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: moderateScale(18),
    color: "#FFFFFF",
    textAlign: "center",
  },
});
