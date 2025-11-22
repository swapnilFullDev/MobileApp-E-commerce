import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";

type EmptyAddressCardProps = {
  onAddPress: () => void;
};

export default function EmptyAddressCard({
  onAddPress,
}: EmptyAddressCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.emptyAddressCard,
        {
          borderColor: theme.border,
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text style={[styles.emptyAddressText, { color: theme.secondaryText }]}>
        No address selected
      </Text>
      <TouchableOpacity
        onPress={onAddPress}
        style={[styles.addAddressButton, { borderColor: theme.primary }]}
      >
        <Text style={[styles.addAddressText, { color: theme.primary }]}>
          + Add Address
        </Text>
      </TouchableOpacity>
    </View>
  );
}
