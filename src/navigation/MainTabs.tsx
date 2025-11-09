import React from "react";
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
    Categories: "tabCategory",
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

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 12,
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
            badge={route.name === "Cart" ? "9" : undefined}
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
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Categories" }}
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
  },
  iconWrapper: {
    padding: spacing.xs * 0.5,
    borderRadius: radius.full,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#DC2626",
    borderRadius: radius.full,
    minWidth: 18,
    minHeight: 18,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: fonts.bold,
  },
});
