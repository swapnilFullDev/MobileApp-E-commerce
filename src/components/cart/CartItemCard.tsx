import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CartItem } from "../../data/cart";
import { cartStyles as styles } from "../../styles/cart/cartStyles";
import Images, { Icons } from "../../constants/images";
import { useTheme } from "../../context";

type CartItemCardProps = {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartItemCard({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.itemCard,
        {
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.itemBody}>
        <Image source={Images[item.image]} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={[styles.metaRow, { justifyContent: "space-between" }]}>
            <View style={styles.metaPill}>
              <Text style={[styles.metaLabel, { color: theme.secondaryText }]}>
                Size
              </Text>
              <Text style={[styles.metaValue, { color: theme.text }]}>
                {item.size}
              </Text>
            </View>
            <View style={styles.qtyControls}>
              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyButtonMinus]}
                onPress={() => onDecrement(item.id)}
              >
                {/* <Text style={styles.qtyButtonMinusText}>−</Text>\ */}
                <Image source={Icons.minus} style={styles.qtyButtonMinusIcon} />
              </TouchableOpacity>
              <Text style={[styles.qtyValue, { color: theme.text }]}>
                {item.qty}
              </Text>
              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyButtonPlus]}
                onPress={() => onIncrement(item.id)}
              >
                {/* <Text style={styles.qtyButtonPlusText}>＋</Text> */}
                <Image source={Icons.plus} style={styles.qtyButtonPlusIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.text }]}>
              ₹{item.price.toLocaleString("en-IN")}
            </Text>
            <Text style={styles.originalPrice}>
              ₹{item.originalPrice.toLocaleString("en-IN")}
            </Text>
            <Text style={[styles.discount, { color: "#E11D48" }]}>
              {item.discountPercent}% OFF
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={[styles.returnText, { color: theme.secondaryText }]}>
              {item.discountPercent}% savings applied
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
