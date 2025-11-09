import React from "react";
import { Pressable, Text, View } from "react-native";
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

  const makeOptionStyles = (option: "rent" | "buy") => ({
    borderColor: mode === option ? theme.primary : "transparent",
    backgroundColor: mode === option ? `${theme.primary}1A` : "transparent",
    textColor: mode === option ? theme.primary : theme.text,
    subtitleColor: mode === option ? theme.primary : theme.secondaryText,
  });

  const rentOption = makeOptionStyles("rent");
  const buyOption = makeOptionStyles("buy");

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
      <Pressable
        onPress={() => onSelect("rent")}
        style={[
          styles.modeOption,
          {
            borderColor: rentOption.borderColor,
            backgroundColor: rentOption.backgroundColor,
          },
        ]}
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
            backgroundColor: buyOption.backgroundColor,
          },
        ]}
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

