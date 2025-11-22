import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import { Icons } from "../../constants/images";

type PaymentMethod = "card" | "upi" | "cod" | "wallet";

type PaymentMethodSectionProps = {
  selectedPayment: PaymentMethod;
  onSelectPayment: (method: PaymentMethod) => void;
};

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  icon?: keyof typeof Icons;
}[] = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "upi", label: "UPI" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "wallet", label: "Wallet" },
];

export default function PaymentMethodSection({
  selectedPayment,
  onSelectPayment,
}: PaymentMethodSectionProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Payment Method
      </Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentOption,
            {
              backgroundColor:
                selectedPayment === method.id
                  ? `${theme.primary}15`
                  : theme.background,
              borderColor:
                selectedPayment === method.id ? theme.primary : theme.border,
            },
          ]}
          onPress={() => onSelectPayment(method.id)}
          activeOpacity={0.7}
        >
          <View style={styles.paymentOptionLeft}>
            <View
              style={[
                styles.radioButton,
                {
                  borderColor:
                    selectedPayment === method.id
                      ? theme.primary
                      : theme.border,
                },
              ]}
            >
              {selectedPayment === method.id && (
                <View
                  style={[
                    styles.radioButtonInner,
                    { backgroundColor: theme.primary },
                  ]}
                />
              )}
            </View>
            <Text style={[styles.paymentLabel, { color: theme.text }]}>
              {method.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
