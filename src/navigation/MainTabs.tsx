import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainTabParamList } from "./types";
import { useTheme } from "../context";
import { spacing } from "../theme/spacing";
import { fonts } from "../theme/fonts";
import { radius } from "../theme/radius";
import Images, { Tabs } from "../constants/images";
import { radii, typeScale } from "../theme";
import { heightPercent, widthPercent } from "../theme/metrics";
import FavoritesScreen from "../screens/FavoritesScreen";
import { useAppSelector } from "../redux/hooks";
import { selectCartItemCount } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { loadCart } from "../redux/thunks/cartThunks";

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  routeName: keyof MainTabParamList;
  color: string;
  focused: boolean;
  badge?: string;
  highlightColor: string;
};

function TabIcon({
  routeName,
  color,
  focused,
  badge,
  highlightColor,
}: TabIconProps) {
  const iconSourceMap: Partial<
    Record<keyof MainTabParamList, keyof typeof Tabs>
  > = {
    Home: "tabHome",
    // Categories: "tabCategory",
    Favorites: "tabFavorites",
    Cart: "tabCart",
    Profile: "tabProfile",
  };

  const sourceKey = iconSourceMap[routeName];

  if (!sourceKey) {
    return null;
  }

  return (
    <View
      style={[
        styles.iconWrapper,
        focused && { backgroundColor: highlightColor },
      ]}
    >
      <View style={styles.iconContainer}>
        <Image
          source={Tabs[sourceKey]}
          style={[styles.iconImage, { tintColor: color }]}
          resizeMode="contain"
        />
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default function MainTabs() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector(selectCartItemCount);

  // Load cart on mount
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: typeScale.fontSize.xs,
          marginBottom: 2,
        },
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
          },
        ],
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            routeName={route.name as keyof MainTabParamList}
            color={color}
            focused={focused}
            badge={
              route.name === "Cart" && cartItemCount > 0
                ? cartItemCount.toString()
                : undefined
            }
            highlightColor={`${theme.primary}1A`}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      {/* <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Categories" }}
      /> */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    height: heightPercent(0.07),
  },
  iconWrapper: {
    padding: spacing.xs * 0.5,
    borderRadius: radii.xxl,
  },
  iconContainer: {
    width: widthPercent(0.08),
    height: widthPercent(0.08),
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: widthPercent(0.05),
    height: widthPercent(0.05),
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#DC2626",
    borderRadius: radii.xxl,
    minWidth: 18,
    minHeight: 18,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: typeScale.fontSize.xs,
    fontFamily: fonts.bold,
  },
});
