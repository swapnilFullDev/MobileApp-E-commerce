import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import HomeCategoryCard from '../components/home/HomeCategoryCard';
import HomeProductCard from '../components/home/HomeProductCard';
import HomeHeroSection from '../components/home/HomeHeroSection';
import HomePromotionsCarousel from '../components/home/HomePromotionsCarousel';
import HomePromoBanner from '../components/home/HomePromoBanner';
import HomeSearchBar from '../components/home/HomeSearchBar';
import HomeSectionHeader from '../components/home/HomeSectionHeader';
import HomeTabs from '../components/home/HomeTabs';
import HomeTopBar from '../components/home/HomeTopBar';
import {
  CATEGORIES,
  FEATURED_COLLECTIONS,
  HOME_TABS,
  NEW_ARRIVALS,
  PROMO_BANNERS,
  CategoryItem,
  HomeTab,
  ProductItem,
} from '../constants/home';
import { useAuth, useTheme } from '../context';
import { spacing } from '../theme/spacing';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<HomeTab>('All');
  const [showSearch, setShowSearch] = useState(false);

  const renderProduct = ({ item }: { item: ProductItem }) => (
    <HomeProductCard product={item} />
  );

  const renderCategory = ({ item }: { item: CategoryItem }) => (
    <HomeCategoryCard category={item} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === 'light' ? 'dark-content' : 'light-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HomeTopBar
          onProfilePress={signOut}
          onSearchPress={() => setShowSearch(prev => !prev)}
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
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        />

        <HomeSectionHeader title="Shop by Categories" actionLabel="" />
        <FlatList
          data={CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        />

        <HomeHeroSection
          title="Discover Our Online Exclusive Collections"
          subtitle="Elevate Your Style: Shop the Freshest Styles from our Online Exclusive Collections"
          ctaLabel="Explore More"
        />

        {PROMO_BANNERS.map(banner => (
          <HomePromoBanner key={banner.id} banner={banner} />
        ))}
        <FlatList
          data={FEATURED_COLLECTIONS}
          keyExtractor={item => item.id}
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
});
