import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme, useToast } from "../../context";
import {
  AddressTag,
  SavedAddress,
  saveAddress,
} from "../../services/storage/addressStorage";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { spacing } from "../../theme/spacing";

type NewAddressModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
};

const addressTags: AddressTag[] = ["HOME", "OFFICE", "OTHER"];

export default function NewAddressModal({
  visible,
  onClose,
  onSave,
}: NewAddressModalProps) {
  const { theme } = useTheme();
  const { showSuccess, showInfo } = useToast();
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    area: "",
    flat: "",
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    tag: "HOME" as AddressTag,
    isDefault: false,
  });

  const handleSave = async () => {
    if (
      !newAddress.name.trim() ||
      !newAddress.phone.trim() ||
      !newAddress.addressLine1.trim()
    ) {
      showInfo("Please fill in all required fields", "Incomplete Address");
      return;
    }

    try {
      const address: SavedAddress = {
        id: `addr_${Date.now()}`,
        ...newAddress,
        createdAt: Date.now(),
      };
      await saveAddress(address);
      setNewAddress({
        name: "",
        phone: "",
        area: "",
        flat: "",
        postalCode: "",
        addressLine1: "",
        addressLine2: "",
        tag: "HOME",
        isDefault: false,
      });
      showSuccess("Address saved successfully!", "Address Saved");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
      showInfo("Failed to save address. Please try again.", "Error");
    }
  };

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
              New Address
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
            <TextInput
              label="Name *"
              value={newAddress.name}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, name: text })
              }
              placeholder="Enter name"
              styleContainer={styles.modalInput}
            />
            <TextInput
              label="Phone *"
              value={newAddress.phone}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, phone: text })
              }
              placeholder="Enter phone"
              keyboardType="phone-pad"
              styleContainer={styles.modalInput}
            />
            <TextInput
              label="Area"
              value={newAddress.area}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, area: text })
              }
              placeholder="Enter Area"
              styleContainer={styles.modalInput}
            />
            <TextInput
              label="Flat"
              value={newAddress.flat}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, flat: text })
              }
              placeholder="Enter Flat no"
              styleContainer={styles.modalInput}
            />
            <TextInput
              label="Postal Code"
              value={newAddress.postalCode}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, postalCode: text })
              }
              placeholder="Enter Postal Code"
              keyboardType="number-pad"
              styleContainer={styles.modalInput}
            />
            <TextInput
              label="Address Line 1 *"
              value={newAddress.addressLine1}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, addressLine1: text })
              }
              placeholder="Enter address 1"
              styleContainer={styles.modalInput}
            />
            <TextInput
              label="Address Line 2"
              value={newAddress.addressLine2}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, addressLine2: text })
              }
              placeholder="Enter address 2"
              styleContainer={styles.modalInput}
            />

            <Text
              style={[
                styles.modalSectionLabel,
                { color: theme.text, marginTop: spacing.sm },
              ]}
            >
              Address Tag
            </Text>
            <View style={styles.tagRow}>
              {addressTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagOption,
                    {
                      backgroundColor:
                        newAddress.tag === tag ? "#DC2626" : theme.background,
                      borderColor:
                        newAddress.tag === tag ? "#DC2626" : theme.border,
                    },
                  ]}
                  onPress={() => setNewAddress({ ...newAddress, tag })}
                >
                  <Text
                    style={[
                      styles.tagOptionText,
                      {
                        color:
                          newAddress.tag === tag ? theme.surface : theme.text,
                      },
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() =>
                setNewAddress({
                  ...newAddress,
                  isDefault: !newAddress.isDefault,
                })
              }
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: newAddress.isDefault
                      ? theme.primary
                      : theme.border,
                    backgroundColor: newAddress.isDefault
                      ? theme.primary
                      : "transparent",
                  },
                ]}
              >
                {newAddress.isDefault && (
                  <Text style={{ color: theme.surface, fontSize: 12 }}>✓</Text>
                )}
              </View>
              <Text style={[styles.checkboxLabel, { color: theme.text }]}>
                Make it default address
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Button
            title="Submit"
            onPress={handleSave}
            fullWidth
            style={styles.submitButton}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
