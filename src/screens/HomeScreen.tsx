import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeCategoryCard from "../components/home/HomeCategoryCard";
import HomeProductCard from "../components/home/HomeProductCard";
import HomeHeroSection from "../components/home/HomeHeroSection";
import HomePromotionsCarousel from "../components/home/HomePromotionsCarousel";
import HomePromoBanner from "../components/home/HomePromoBanner";
import HomeSearchBar from "../components/home/HomeSearchBar";
import HomeSectionHeader from "../components/home/HomeSectionHeader";
import HomeTabs from "../components/home/HomeTabs";
import HomeTopBar from "../components/home/HomeTopBar";
import {
  CATEGORIES,
  FEATURED_COLLECTIONS,
  HOME_TABS,
  NEW_ARRIVALS,
  PROMO_BANNERS,
  HomeTab,
  ProductItem,
} from "../data/home";
import { ROUTES } from "../constants";
import { useAuth, useTheme } from "../context";
import { HomeScreenNavigationProp } from "../navigation";
import { spacing } from "../theme/spacing";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<HomeTab>("All");
  const [showSearch, setShowSearch] = useState(false);

  const handleProductPress = (item: ProductItem) => {
    navigation.navigate(ROUTES.PRODUCT_DETAIL, {
      productId: item.id,
    });
  };

  const renderProduct = ({ item }: { item: ProductItem }) => (
    <HomeProductCard product={item} onPress={handleProductPress} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HomeTopBar
          onProfilePress={signOut}
          onSearchPress={() => setShowSearch((prev) => !prev)}
        />
        {showSearch ? (
          <HomeSearchBar value={searchQuery} onChangeText={setSearchQuery} />
        ) : null}
        <HomeTabs
          tabs={HOME_TABS}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        <HomePromotionsCarousel />

        <HomeSectionHeader title="New Arrivals" actionLabel="Explore Now" />
        <FlatList
          data={NEW_ARRIVALS}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        />

        <HomeSectionHeader title="Shop by Categories" actionLabel="" />
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <HomeCategoryCard category={category} />
            </View>
          ))}
        </View>

        <HomeHeroSection
          title="Discover Our Online Exclusive Collections"
          subtitle="Elevate Your Style: Shop the Freshest Styles from our Online Exclusive Collections"
          ctaLabel="Explore More"
        />

        {PROMO_BANNERS.map((banner) => (
          <HomePromoBanner key={banner.id} banner={banner} />
        ))}
        <FlatList
          data={FEATURED_COLLECTIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  horizontalList: {
    paddingHorizontal: spacing.md,
    // paddingVertical: spacing.sm,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
  },
  categoryItem: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: spacing.md,
  },
});
