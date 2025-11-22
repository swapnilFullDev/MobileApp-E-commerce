import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../theme/spacing";
import { typeScale } from "../../theme/scales";

const { width } = Dimensions.get("window");

const widthPercent = (fraction: number) => width * fraction;

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition = "top" | "bottom";
export type AnimationType = "slide" | "fade" | "bounce" | "zoom";

export type ToastProps = {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  title?: string;
  position?: ToastPosition;
  animationType?: AnimationType;
  showProgress?: boolean;
  onDismiss: () => void;
  onHide: () => void;
};

const TOAST_ICONS: Record<
  ToastType,
  {
    icon: string;
    background: string;
    border: string;
    iconBackground: string;
    defaultTitle: string;
  }
> = {
  success: {
    icon: "✓",
    background: "#10B981",
    border: "#059669",
    iconBackground: "rgba(255,255,255,0.2)",
    defaultTitle: "Success",
  },
  error: {
    icon: "✕",
    background: "#EF4444",
    border: "#DC2626",
    iconBackground: "rgba(255,255,255,0.2)",
    defaultTitle: "Error",
  },
  warning: {
    icon: "⚠",
    background: "#F59E0B",
    border: "#D97706",
    iconBackground: "rgba(255,255,255,0.25)",
    defaultTitle: "Warning",
  },
  info: {
    icon: "ℹ",
    background: "#3B82F6",
    border: "#2563EB",
    iconBackground: "rgba(255,255,255,0.2)",
    defaultTitle: "Info",
  },
};

export default function Toast({
  visible,
  message,
  type = "info",
  duration = 3000,
  title,
  position = "top",
  animationType = "slide",
  showProgress = true,
  onDismiss,
  onHide,
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);

  const translateY = useRef(
    new Animated.Value(position === "top" ? -80 : 80)
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  const progress = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = useMemo(() => TOAST_ICONS[type], [type]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startProgress = () => {
    progress.stopAnimation();
    progress.setValue(1);
    if (!showProgress || !duration) {
      return;
    }
    Animated.timing(progress, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const runShowAnimation = () => {
    translateY.setValue(position === "top" ? -80 : 80);
    opacity.setValue(0);
    scale.setValue(animationType === "bounce" ? 0.7 : 0.85);

    switch (animationType) {
      case "fade":
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            damping: 16,
            stiffness: 180,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
        ]).start();
        break;
      case "bounce":
        translateY.setValue(0);
        Animated.sequence([
          Animated.parallel([
            Animated.spring(scale, {
              toValue: 1.05,
              damping: 12,
              stiffness: 260,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 180,
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(scale, {
            toValue: 1,
            damping: 12,
            stiffness: 200,
            useNativeDriver: true,
          }),
        ]).start();
        break;
      case "zoom":
        translateY.setValue(0);
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            damping: 14,
            stiffness: 220,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        break;
      case "slide":
      default:
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            damping: 18,
            stiffness: 220,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            damping: 16,
            stiffness: 220,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        break;
    }
  };

  const runHideAnimation = () => {
    const target = position === "top" ? -80 : 80;

    const animations: Animated.CompositeAnimation[] = [
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 0.8,
        damping: 16,
        stiffness: 200,
        useNativeDriver: true,
      }),
    ];

    if (animationType === "slide") {
      animations.push(
        Animated.timing(translateY, {
          toValue: target,
          duration: 220,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start(() => {
      setMounted(false);
      translateY.setValue(position === "top" ? -80 : 80);
      scale.setValue(0.85);
      progress.setValue(1);
      onHide();
    });
  };

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (visible) {
      runShowAnimation();
      startProgress();
      stopTimer();
      if (duration) {
        timerRef.current = setTimeout(() => {
          onDismiss();
        }, duration);
      }
    } else {
      stopTimer();
      runHideAnimation();
    }

    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, visible, position, animationType, duration]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }

  const positionStyle =
    position === "top"
      ? { top: insets.top + spacing.md }
      : { bottom: insets.bottom + spacing.md };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.container,
          positionStyle,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={onDismiss}
          style={[
            styles.toast,
            {
              backgroundColor: config.background,
              borderLeftColor: config.border,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: config.iconBackground },
            ]}
          >
            <Text style={styles.icon}>{config.icon}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{title ?? config.defaultTitle}</Text>
            <Text style={styles.message} numberOfLines={3}>
              {message}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onDismiss}
            style={styles.closeButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {showProgress ? (
            <Animated.View
              style={[
                styles.progressBar,
                {
                  backgroundColor: config.border,
                  width: progressWidth,
                },
              ]}
            />
          ) : null}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
    elevation: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    overflow: "hidden",
    backgroundColor: "#3B82F6",
  },
  iconContainer: {
    width: widthPercent(0.08),
    height: widthPercent(0.08),
    borderRadius: widthPercent(0.04),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  icon: {
    fontSize: widthPercent(0.04),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
    paddingVertical: spacing.xs,
  },
  title: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  message: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
    color: "#FFFFFF",
    lineHeight: typeScale.lineHeight.sm,
    opacity: 0.95,
  },
  closeButton: {
    width: widthPercent(0.08),
    height: widthPercent(0.08),
    borderRadius: widthPercent(0.04),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 3,
  },
});
