import React, { useMemo } from "react";
import { FlatList, StatusBar, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context";
import CategoryProductCard from "../components/category/CategoryProductCard";
import { FAVORITE_PRODUCTS } from "../data/favorites";
import { favoritesStyles as styles } from "../styles/category/favoritesStyles";
import { ScreenHeader } from "../components/common";
import { AuthStackNavigationProp } from "../navigation";

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const itemCount = FAVORITE_PRODUCTS.length;
  const subtitle = useMemo(
    () => `${itemCount} saved ${itemCount === 1 ? "style" : "styles"}`,
    [itemCount]
  );

  const renderProduct = ({
    item,
  }: {
    item: (typeof FAVORITE_PRODUCTS)[number];
  }) => (
    <View style={styles.cardWrapper}>
      <CategoryProductCard product={item} favorite={true} />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        Nothing saved yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.secondaryText }]}>
        Tap the heart icon on any product to add it to your favorites list.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <ScreenHeader
        title="Favorites"
        subtitle={subtitle}
        rightIcon="loveFilled"
      />

      <FlatList
        data={FAVORITE_PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderProduct}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.listContent,
          !itemCount && { flexGrow: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}
