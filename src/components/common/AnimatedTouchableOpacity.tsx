import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  Animated,
  Easing,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type AnimatedTouchableOpacityProps = Omit<PressableProps, "style"> & {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  opacityTo?: number;
  pressInDuration?: number;
  pressOutDuration?: number;
  disabledOpacity?: number;
};

export const AnimatedTouchableOpacity = forwardRef(
  (
    {
      children,
      style,
      scaleTo = 0.96,
      opacityTo = 0.82,
      pressInDuration = 120,
      pressOutDuration = 160,
      disabledOpacity = 0.45,
      onPressIn,
      onPressOut,
      disabled,
      ...rest
    }: AnimatedTouchableOpacityProps,
    ref: ForwardedRef<Pressable>
  ) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      if (disabled) {
        scaleAnim.stopAnimation(() => scaleAnim.setValue(1));
        opacityAnim.stopAnimation(() => opacityAnim.setValue(disabledOpacity));
        return;
      }

      opacityAnim.stopAnimation(() => opacityAnim.setValue(1));
    }, [disabled, disabledOpacity, opacityAnim, scaleAnim]);

    const animateTo = (
      scaleValue: number,
      opacityValue: number,
      duration: number
    ) => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: scaleValue,
          duration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: opacityValue,
          duration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressIn: PressableProps["onPressIn"] = (event) => {
      if (!disabled) {
        animateTo(scaleTo, opacityTo, pressInDuration);
      }
      onPressIn?.(event);
    };

    const handlePressOut: PressableProps["onPressOut"] = (event) => {
      if (!disabled) {
        animateTo(1, 1, pressOutDuration);
      }
      onPressOut?.(event);
    };

    const animatedStyle = useMemo(
      () => [
        style,
        {
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? opacityAnim : opacityAnim,
        },
      ],
      [style, scaleAnim, opacityAnim, disabled]
    );

    return (
      <AnimatedPressable
        ref={ref}
        {...rest}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
      >
        {children}
      </AnimatedPressable>
    );
  }
);

AnimatedTouchableOpacity.displayName = "AnimatedTouchableOpacity";
