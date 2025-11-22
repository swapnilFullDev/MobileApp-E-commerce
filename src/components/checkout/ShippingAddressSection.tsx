import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context";
import { SavedAddress } from "../../services/storage/addressStorage";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import AddressCard from "./AddressCard";
import EmptyAddressCard from "./EmptyAddressCard";

type ShippingAddressSectionProps = {
  selectedAddress: SavedAddress | null;
  onChangePress: () => void;
  onAddPress: () => void;
};

export default function ShippingAddressSection({
  selectedAddress,
  onChangePress,
  onAddPress,
}: ShippingAddressSectionProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Shipping Address
        </Text>
        <TouchableOpacity onPress={onChangePress} activeOpacity={0.7}>
          <Text style={[styles.changeButton, { color: theme.primary }]}>
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {selectedAddress ? (
        <AddressCard address={selectedAddress} />
      ) : (
        <EmptyAddressCard onAddPress={onAddPress} />
      )}
    </View>
  );
}
