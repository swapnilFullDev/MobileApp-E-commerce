import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "../../context";
import { SavedAddress } from "../../services/storage/addressStorage";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import { Icons } from "../../constants/images";

type AddressCardProps = {
  address: SavedAddress;
};

export default function AddressCard({ address }: AddressCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.addressCard,
        {
          borderColor: theme.border,
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.addressCardLeft}>
        <View
          style={[
            styles.addressIconContainer,
            { backgroundColor: theme.surface },
          ]}
        >
          <Image
            source={Icons.locatorMarker}
            style={styles.locationPin}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.addressTagBadge, { backgroundColor: theme.text }]}>
          <Text style={[styles.addressTagText, { color: theme.surface }]}>
            {address.tag}
          </Text>
        </View>
      </View>
      <View style={styles.addressCardRight}>
        <Text style={[styles.addressName, { color: theme.text }]}>
          {address.name}
        </Text>
        <Text style={[styles.addressPhone, { color: theme.secondaryText }]}>
          {address.phone}
        </Text>
        <Text style={[styles.addressLine, { color: theme.secondaryText }]}>
          {[
            address.area,
            address.flat,
            address.addressLine1,
            address.addressLine2,
            address.postalCode,
          ]
            .filter(Boolean)
            .join(", ")}
        </Text>
        {address.isDefault && (
          <Text style={[styles.defaultBadge, { color: theme.primary }]}>
            Default Address
          </Text>
        )}
      </View>
    </View>
  );
}
