import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTheme, useToast } from "../context";
import { ROUTES } from "../constants";
import { categoriesStyles as styles } from "../styles/category/categoriesStyles";
import { CATEGORIES } from "../data/home";
import {
  CATEGORY_PRODUCTS,
  CATEGORY_SUBCATEGORIES,
  DEFAULT_CATEGORY_SUBCATEGORIES,
  CategoryListingProduct,
  CategorySubcategory,
} from "../data/categories";
import CategoryProductCard from "../components/category/CategoryProductCard";
import Images, { Icons } from "../constants/images";
import {
  AuthStackParamList,
  CategoriesScreenNavigationProp,
} from "../navigation/types";
import { renderIconButton } from "../components/common/renderIconButton";

type CategoriesScreenRouteProp = RouteProp<AuthStackParamList, "Categories">;
type SortKey = "priceLowHigh" | "priceHighLow" | "topRated";

const SORT_LABELS: Record<SortKey, string> = {
  priceLowHigh: "Price: lowest to high",
  priceHighLow: "Price: highest to low",
  topRated: "Ratings: high to low",
};

const SORT_SEQUENCE: SortKey[] = ["priceLowHigh", "priceHighLow", "topRated"];

const SORT_COMPARATORS: Record<
  SortKey,
  (a: CategoryListingProduct, b: CategoryListingProduct) => number
> = {
  priceLowHigh: (a, b) => a.price - b.price,
  priceHighLow: (a, b) => b.price - a.price,
  topRated: (a, b) => b.rating - a.rating,
};

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const { showInfo } = useToast();
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const route = useRoute<CategoriesScreenRouteProp>();

  const selectedCategory = useMemo(() => {
    const categoryId = route.params?.categoryId;
    if (!categoryId) {
      return undefined;
    }
    return CATEGORIES.find((item) => item.id === categoryId);
  }, [route.params?.categoryId]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [sortOption, setSortOption] = useState<SortKey>("priceLowHigh");

  const subcategories = useMemo<CategorySubcategory[]>(() => {
    if (selectedCategory?.id) {
      const custom = CATEGORY_SUBCATEGORIES[selectedCategory.id];
      if (custom?.length) {
        return custom;
      }
    }
    return DEFAULT_CATEGORY_SUBCATEGORIES;
  }, [selectedCategory?.id]);

  useEffect(() => {
    const firstTab = subcategories[0]?.id ?? "all";
    setActiveSubcategory(firstTab);
  }, [subcategories]);

  useEffect(() => {
    setSearchQuery("");
  }, [selectedCategory?.id]);

  const baseProducts = useMemo(() => {
    const selectedId = selectedCategory?.id;

    if (!selectedId) {
      return CATEGORY_PRODUCTS;
    }

    return CATEGORY_PRODUCTS.filter(
      (item) => item.categoryId === selectedId || item.categoryId === "default"
    );
  }, [selectedCategory?.id]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredBySubcategory = baseProducts.filter((item) => {
      if (activeSubcategory === "all") {
        return true;
      }
      return item.subcategoryId === activeSubcategory;
    });

    const filteredByQuery = normalizedQuery
      ? filteredBySubcategory.filter((item) => {
          const haystack = `${item.title} ${item.brand}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : filteredBySubcategory;

    return [...filteredByQuery].sort(SORT_COMPARATORS[sortOption]);
  }, [activeSubcategory, baseProducts, searchQuery, sortOption]);

  const helperMessage = useMemo(() => {
    const trimmed = searchQuery.trim();
    const resultCount = filteredProducts.length;
    if (trimmed.length) {
      return `Showing ${resultCount} result${
        resultCount === 1 ? "" : "s"
      } for “${trimmed}”.`;
    }

    const label = selectedCategory?.label ?? "All categories";
    return `${resultCount} styles handpicked for ${label.toLowerCase()}.`;
  }, [filteredProducts.length, searchQuery, selectedCategory?.label]);

  const formattedItemCount = useMemo(
    () => `${filteredProducts.length.toLocaleString("en-IN")} items`,
    [filteredProducts.length]
  );

  const headerTitle = selectedCategory?.label ?? "All categories";

  const handleSortCycle = () => {
    setSortOption((prev) => {
      const currentIndex = SORT_SEQUENCE.indexOf(prev);
      const next = SORT_SEQUENCE[(currentIndex + 1) % SORT_SEQUENCE.length];
      return next;
    });
  };

  const handleFilterPress = () => {
    showInfo(
      "Filter options will arrive soon to help you narrow down styles.",
      "Filters Coming Soon",
      2400
    );
  };

  const handleViewToggle = () => {
    showInfo(
      "Alternate layout views are on the roadmap. Stay tuned!",
      "Layout",
      2200
    );
  };

  const handleSearchPress = () => {
    showInfo(
      "Search within categories is coming soon.",
      "Search Preview",
      2000
    );
  };

  const handleAddPress = () => {
    showInfo(
      "Quick add shortcuts will be available soon.",
      "Coming Soon",
      2000
    );
  };

  const handleWishlistPress = () => {
    navigation.navigate(ROUTES.FAVORITES);
  };

  const handleCartPress = () => {
    showInfo("Cart actions will land shortly.", "Cart Preview", 2000);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleProductPress = (product: CategoryListingProduct) => {
    showInfo(
      `${product.title} will be available to rent or buy soon.`,
      "Product Preview",
      2400
    );
  };

  const renderProduct = useCallback(
    ({ item }: ListRenderItemInfo<CategoryListingProduct>) => (
      <View style={styles.productCardWrapper}>
        <CategoryProductCard product={item} onPress={handleProductPress} />
      </View>
    ),
    []
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyTitle, { color: theme.text }]}>
          No styles found
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.secondaryText }]}>
          Try updating your search or explore another sub-category.
        </Text>
      </View>
    ),
    [theme.secondaryText, theme.text]
  );

  const renderHeader = useCallback(
    () => (
      <View>
        <View
          style={[
            styles.heroHeader,
            {
              backgroundColor: theme.surface,
              borderBottomColor: theme.border,
            },
          ]}
        >
          <View style={styles.heroLeft}>
            <Pressable
              style={[
                styles.heroIconButton,
                {
                  backgroundColor: `${theme.surface}CC`,
                  borderColor: theme.border,
                },
              ]}
              onPress={handleBackPress}
            >
              <Image
                source={Icons.leftArrow}
                style={[styles.heroIcon, { tintColor: theme.text }]}
              />
            </Pressable>
            <View style={styles.heroLogo}>
              <Image
                source={Images.brandName}
                style={styles.heroLogoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.heroTextWrap}>
              <Text style={[styles.heroTitle, { color: theme.text }]}>
                {headerTitle}
              </Text>
              <Text
                style={[styles.heroSubtitle, { color: theme.secondaryText }]}
              >
                {formattedItemCount}
              </Text>
            </View>
          </View>
          <View style={styles.heroActions}>
            {renderIconButton({
              icon: "search",
              onPress: handleSearchPress,
            })}
            {renderIconButton({
              icon: "love",
              onPress: handleWishlistPress,
            })}
          </View>
        </View>

        <View style={styles.header}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipList}
            style={styles.chipScroll}
          >
            {subcategories.map((subcategory) => {
              const isActive = subcategory.id === activeSubcategory;
              return (
                <Pressable
                  key={subcategory.id}
                  style={[
                    styles.chip,
                    {
                      borderColor: isActive ? theme.primary : theme.border,
                      backgroundColor: isActive
                        ? `${theme.primary}1A`
                        : theme.surface,
                    },
                  ]}
                  onPress={() => setActiveSubcategory(subcategory.id)}
                >
                  <Text
                    style={[
                      styles.chipLabel,
                      { color: isActive ? theme.primary : theme.text },
                    ]}
                  >
                    {subcategory.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    ),
    [
      formattedItemCount,
      headerTitle,
      activeSubcategory,
      handleBackPress,
      handleAddPress,
      handleWishlistPress,
      handleCartPress,
      handleFilterPress,
      handleSearchPress,
      handleSortCycle,
      handleViewToggle,
      helperMessage,
      subcategories,
      theme.border,
      theme.primary,
      theme.secondaryText,
      theme.surface,
      theme.text,
    ]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      {renderHeader()}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderProduct}
        contentContainerStyle={[
          styles.listContent,
          !filteredProducts.length && styles.emptyContent,
        ]}
        columnWrapperStyle={styles.productsRow}
        // ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={<View style={styles.footerSpacing} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
