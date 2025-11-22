import React from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context";
import { SavedAddress } from "../../services/storage/addressStorage";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import { spacing } from "../../theme/spacing";
import { scale } from "../../theme/metrics";
import { Icons } from "../../constants/images";

type SavedAddressModalProps = {
  visible: boolean;
  addresses: SavedAddress[];
  selectedAddress: SavedAddress | null;
  onClose: () => void;
  onSelectAddress: (address: SavedAddress) => void;
  onAddNew: () => void;
};

export default function SavedAddressModal({
  visible,
  addresses,
  selectedAddress,
  onClose,
  onSelectAddress,
  onAddNew,
}: SavedAddressModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalContent, { backgroundColor: theme.surface }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Saved Address
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, { color: theme.text }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalScrollView}
            showsVerticalScrollIndicator={false}
          >
            {addresses.map((address) => (
              <TouchableOpacity
                key={address.id}
                style={[
                  styles.savedAddressCard,
                  {
                    borderColor:
                      selectedAddress?.id === address.id
                        ? "#DC2626"
                        : theme.border,
                    backgroundColor: theme.background,
                  },
                ]}
                onPress={() => onSelectAddress(address)}
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
                  <View
                    style={[
                      styles.addressTagBadge,
                      { backgroundColor: theme.text },
                    ]}
                  >
                    <Text
                      style={[styles.addressTagText, { color: theme.surface }]}
                    >
                      {address.tag}
                    </Text>
                  </View>
                </View>
                <View style={styles.addressCardRight}>
                  <Text style={[styles.addressName, { color: theme.text }]}>
                    {address.name}
                  </Text>
                  <Text
                    style={[
                      styles.addressPhone,
                      { color: theme.secondaryText },
                    ]}
                  >
                    {address.phone}
                  </Text>
                  <Text
                    style={[styles.addressLine, { color: theme.secondaryText }]}
                  >
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
                    <Text
                      style={[styles.defaultBadge, { color: theme.primary }]}
                    >
                      Default Address
                    </Text>
                  )}
                </View>
                {selectedAddress?.id === address.id && (
                  <View
                    style={[
                      styles.radioButton,
                      {
                        borderColor: theme.primary,
                        position: "absolute",
                        right: spacing.md,
                        top: "50%",
                        transform: [{ translateY: -scale(10) }],
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.radioButtonInner,
                        { backgroundColor: theme.primary },
                      ]}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.newAddressButton, { borderColor: "#DC2626" }]}
            onPress={onAddNew}
          >
            <Text style={[styles.newAddressButtonText, { color: "#DC2626" }]}>
              + New Address
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
