import React, { useMemo } from "react";
import { FlatList, StatusBar, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context";
import CategoryProductCard from "../components/category/CategoryProductCard";
import { FAVORITE_PRODUCTS } from "../data/favorites";
import { favoritesStyles as styles } from "../styles/category/favoritesStyles";
import { renderIconButton } from "../components/common/renderIconButton";
import { AuthStackNavigationProp } from "../navigation";

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const itemCount = FAVORITE_PRODUCTS.length;
  const subtitle = useMemo(
    () => `${itemCount} saved ${itemCount === 1 ? "style" : "styles"}`,
    [itemCount]
  );

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

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
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.border, backgroundColor: theme.surface },
        ]}
      >
        <View style={styles.headerLeft}>
          {renderIconButton({
            icon: "leftArrow",
            onPress: handleBack,
            containerStyle: [
              styles.iconButton,
              {
                borderColor: theme.border,
                backgroundColor: `${theme.surface}CC`,
              },
            ],
            tintColor: theme.text,
            iconStyle: { width: 18, height: 18 },
          })}
          <View style={styles.headerTextWrap}>
            <Text style={[styles.title, { color: theme.text }]}>Favorites</Text>
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
              {subtitle}
            </Text>
          </View>
        </View>
        {renderIconButton({
          icon: "loveFilled",
          tintColor: theme.primary,
        })}
      </View>

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
