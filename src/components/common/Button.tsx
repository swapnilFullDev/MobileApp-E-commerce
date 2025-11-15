import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context";
import { spacing } from "../../theme/spacing";
import { typeScale } from "../../theme/scales";
import { heightPercent } from "../../theme/metrics";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
};

export default function Button({
  title,
  onPress,
  loading = false,
  fullWidth = false,
  style,
  backgroundColor,
}: ButtonProps) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pressScaleAnim = useRef(new Animated.Value(1)).current;
  const scaleLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const shimmerLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  // useEffect(() => {
  //   if (loading) {
  //     scaleLoopRef.current?.stop();
  //     shimmerLoopRef.current?.stop();

  //     scaleAnim.setValue(1);
  //     shimmerAnim.setValue(0);

  //     scaleLoopRef.current = Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(scaleAnim, {
  //           toValue: 1.04,
  //           duration: 300,
  //           easing: Easing.inOut(Easing.ease),
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(scaleAnim, {
  //           toValue: 1,
  //           duration: 300,
  //           easing: Easing.inOut(Easing.ease),
  //           useNativeDriver: true,
  //         }),
  //       ])
  //     );
  //     shimmerLoopRef.current = Animated.loop(
  //       Animated.timing(shimmerAnim, {
  //         toValue: 1,
  //         duration: 1500,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       })
  //     );

  //     scaleLoopRef.current.start();
  //     shimmerLoopRef.current.start();
  //   } else {
  //     scaleLoopRef.current?.stop();
  //     shimmerLoopRef.current?.stop();
  //     scaleAnim.stopAnimation(() => scaleAnim.setValue(1));
  //     shimmerAnim.stopAnimation(() => shimmerAnim.setValue(0));
  //     scaleLoopRef.current = null;
  //     shimmerLoopRef.current = null;
  //   }

  //   return () => {
  //     scaleLoopRef.current?.stop();
  //     shimmerLoopRef.current?.stop();
  //   };
  // }, [loading, scaleAnim, shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.15, 0],
  });

  const handlePressIn = () =>
    Animated.spring(pressScaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();

  const handlePressOut = () =>
    Animated.spring(pressScaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

  const loaderRotate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const combinedScale = Animated.multiply(scaleAnim, pressScaleAnim);

  return (
    <Animated.View
      style={[
        styles.animatedWrapper,
        {
          transform: [{ scale: combinedScale }],
          alignSelf: fullWidth ? "stretch" : "center",
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: backgroundColor ? backgroundColor : theme.primary,
            opacity: loading ? 0.6 : pressed ? 0.85 : 1,
            height: loading ? heightPercent(0.056) : undefined,
          },
        ]}
      >
        {loading ? (
          <Animated.View
            style={[
              styles.loaderWrapper,
              { transform: [{ rotate: loaderRotate }] },
            ]}
          >
            <ActivityIndicator color="#FFFFFF" />
          </Animated.View>
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.shimmer,
                {
                  opacity: shimmerOpacity,
                },
              ]}
            />
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedWrapper: {
    borderRadius: spacing.md,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
  },
  loaderWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
