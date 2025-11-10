import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Theme } from "../../context/ThemeContext";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";

type FulfillmentToggleProps = {
  mode: "rent" | "buy";
  canPurchase: boolean;
  onSelect: (mode: "rent" | "buy") => void;
  theme: Theme;
};

export default function FulfillmentToggle({
  mode,
  canPurchase,
  onSelect,
  theme,
}: FulfillmentToggleProps) {
  if (!canPurchase) {
    return null;
  }

  const [rentLayout, setRentLayout] = useState({ x: 0, width: 0 });
  const [buyLayout, setBuyLayout] = useState({ x: 0, width: 0 });

  const highlightAnim = useRef(
    new Animated.Value(mode === "rent" ? 0 : 1)
  ).current;

  const rentActive = mode === "rent";
  const buyActive = mode === "buy";
  const rentOption = {
    borderColor: rentActive ? theme.primary : "transparent",
    textColor: rentActive ? theme.primary : theme.text,
    subtitleColor: rentActive ? theme.primary : theme.secondaryText,
  };
  const buyOption = {
    borderColor: buyActive ? theme.primary : "transparent",
    textColor: buyActive ? theme.primary : theme.text,
    subtitleColor: buyActive ? theme.primary : theme.secondaryText,
  };

  useEffect(() => {
    Animated.spring(highlightAnim, {
      toValue: mode === "rent" ? 0 : 1,
      useNativeDriver: false,
      mass: 0.6,
      stiffness: 180,
      damping: 18,
    }).start();
  }, [highlightAnim, mode]);

  const highlightStyle = useMemo(() => {
    const positions = [rentLayout, buyLayout];
    const translateX =
      rentLayout.width && buyLayout.width
        ? highlightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [rentLayout.x, buyLayout.x],
          })
        : 0;

    const highlightWidth =
      rentLayout.width && buyLayout.width
        ? highlightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [rentLayout.width, buyLayout.width],
          })
        : 0;

    return [
      styles.modeHighlight,
      {
        backgroundColor:
          theme.name === "light"
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.08)",
        transform: [{ translateX }],
        width: highlightWidth,
        borderColor: theme.primary,
        borderWidth: 1,
      },
    ];
  }, [highlightAnim, rentLayout, buyLayout, theme]);

  return (
    <View
      style={[
        styles.modeSwitch,
        {
          borderColor: theme.border,
          backgroundColor:
            theme.name === "light" ? "#F9FAFB" : "rgba(255,255,255,0.04)",
        },
      ]}
    >
      <Animated.View style={highlightStyle} pointerEvents="none" />
      <Pressable
        onPress={() => onSelect("rent")}
        style={[
          styles.modeOption,
          {
            borderColor: rentOption.borderColor,
          },
        ]}
        onLayout={({ nativeEvent }) =>
          setRentLayout({
            x: nativeEvent.layout.x,
            width: nativeEvent.layout.width,
          })
        }
      >
        <Text
          style={[
            styles.modeOptionText,
            {
              color: rentOption.textColor,
            },
          ]}
        >
          Rent
        </Text>
        <Text
          style={[
            styles.modeOptionSubText,
            {
              color: rentOption.subtitleColor,
            },
          ]}
        >
          Flexible duration
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onSelect("buy")}
        disabled={!canPurchase}
        style={[
          styles.modeOption,
          {
            borderColor: buyOption.borderColor,
          },
        ]}
        onLayout={({ nativeEvent }) =>
          setBuyLayout({
            x: nativeEvent.layout.x,
            width: nativeEvent.layout.width,
          })
        }
      >
        <Text
          style={[
            styles.modeOptionText,
            {
              color: buyOption.textColor,
            },
          ]}
        >
          Buy
        </Text>
        <Text
          style={[
            styles.modeOptionSubText,
            {
              color: buyOption.subtitleColor,
            },
          ]}
        >
          Own it forever
        </Text>
      </Pressable>
    </View>
  );
}
