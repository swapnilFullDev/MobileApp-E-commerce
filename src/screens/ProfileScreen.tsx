import React, { useMemo } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Switch,
  Alert,
} from "react-native";
import { useTheme, useAuth } from "../context";
import { profileStyles as styles } from "../styles/profile/profileStyles";
import { Icons } from "../constants/images";
import { useToast } from "../context";
import { spacing } from "../theme/spacing";
import { typeScale } from "../theme/scales";
import { widthPercent, scale } from "../theme/metrics";
import { radii } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigation";
import { ROUTES } from "../constants";

type SettingItem = {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  onPress: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
  variant?: "default" | "danger";
};

export default function ProfileScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { showSuccess, showInfo } = useToast();

  // Mock user data - replace with actual user data from auth context
  const userStats = useMemo(
    () => ({
      orders: 12,
      favorites: 8,
      cartItems: 3,
    }),
    []
  );

  const handleEditProfile = () => {
    showInfo("Edit profile feature coming soon!", "Edit Profile");
  };

  const handleAddresses = () => {
    showInfo("Manage addresses feature coming soon!", "Addresses");
  };

  const handlePaymentMethods = () => {
    showInfo("Payment methods feature coming soon!", "Payment Methods");
  };

  const handleOrders = () => {
    navigation.navigate(ROUTES.MY_ORDERS);
  };

  const handleNotifications = () => {
    showInfo("Notification settings coming soon!", "Notifications");
  };

  const handleLanguage = () => {
    showInfo("Language selection coming soon!", "Language");
  };

  const handleHelpCenter = () => {
    showInfo("Help center feature coming soon!", "Help Center");
  };

  const handleContactUs = () => {
    showInfo("Contact us feature coming soon!", "Contact Us");
  };

  const handleAbout = () => {
    showInfo(
      "AttireBandhan v1.0.0\nConnecting you with timeless attire.",
      "About"
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            signOut();
            showSuccess("Logged out successfully!", "Logout");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const accountSettings: SettingItem[] = [
    {
      id: "edit-profile",
      label: "Edit Profile",
      icon: "editProfile",
      onPress: handleEditProfile,
      showArrow: true,
    },
    {
      id: "addresses",
      label: "My Addresses",
      icon: "address", // Using square as placeholder for location/address icon
      onPress: handleAddresses,
      showArrow: true,
    },
    {
      id: "payment",
      label: "Payment Methods",
      icon: "payment", // Using shopping as placeholder for payment icon
      onPress: handlePaymentMethods,
      showArrow: true,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: "myOrders",
      onPress: handleOrders,
      showArrow: true,
    },
  ];

  const appSettings: SettingItem[] = [
    {
      id: "notifications",
      label: "Notifications",
      icon: "notifications",
      onPress: handleNotifications,
      showArrow: true,
    },
    {
      id: "language",
      label: "Language",
      icon: "language",
      onPress: handleLanguage,
      showArrow: true,
    },
    {
      id: "theme",
      label: "Dark Mode",
      icon: "darklightMode",
      onPress: toggleTheme,
      rightComponent: (
        <Switch
          value={theme.name === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={theme.surface}
        />
      ),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: "help",
      label: "Help Center",
      icon: "helpCenter",
      onPress: handleHelpCenter,
      showArrow: true,
    },
    {
      id: "contact",
      label: "Contact Us",
      icon: "contactUs",
      onPress: handleContactUs,
      showArrow: true,
    },
    {
      id: "about",
      label: "About",
      icon: "aboutUs",
      onPress: handleAbout,
      showArrow: true,
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.settingItem,
        {
          backgroundColor: theme.surface,
          borderBottomColor: theme.border,
        },
      ]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View
          style={[
            styles.settingIconContainer,
            {
              backgroundColor:
                item.variant === "danger" ? "#FEE2E2" : `${theme.primary}15`,
            },
          ]}
        >
          <Image
            source={Icons[item.icon]}
            style={[
              styles.settingIcon,
              {
                tintColor:
                  item.variant === "danger" ? "#DC2626" : theme.primary,
              },
            ]}
            resizeMode="contain"
          />
        </View>
        <Text
          style={[
            styles.settingLabel,
            {
              color: item.variant === "danger" ? "#DC2626" : theme.text,
            },
          ]}
        >
          {item.label}
        </Text>
      </View>
      <View style={styles.settingRight}>
        {item.rightComponent || null}
        {item.showArrow && !item.rightComponent && (
          <Image
            source={Icons.leftArrow}
            style={[
              styles.settingArrow,
              { tintColor: theme.muted, transform: [{ rotate: "180deg" }] },
            ]}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title: string, items: SettingItem[]) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        {items.map(renderSettingItem)}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Header */}
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.userInfo}>
            <View
              style={[
                styles.avatarContainer,
                {
                  backgroundColor: `${theme.primary}20`,
                  borderColor: theme.primary,
                },
              ]}
            >
              <Image
                source={Icons.user}
                style={[styles.avatarIcon, { tintColor: theme.primary }]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: theme.text }]}>
                John Doe
              </Text>
              <Text style={[styles.userEmail, { color: theme.secondaryText }]}>
                john.doe@example.com
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={handleEditProfile}
              style={[
                styles.editButton,
                { backgroundColor: `${theme.primary}15` },
              ]}
              activeOpacity={0.7}
            >
              <Image
                source={Icons.square}
                style={[styles.editIcon, { tintColor: theme.primary }]}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={handleOrders}
              activeOpacity={0.7}
            >
              <Text style={[styles.statValue, { color: theme.text }]}>
                {userStats.orders}
              </Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
                Orders
              </Text>
            </TouchableOpacity>
            <View
              style={[styles.statDivider, { backgroundColor: theme.border }]}
            />
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => {
                navigation.navigate("FavoritesScreen");
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.statValue, { color: theme.text }]}>
                {userStats.favorites}
              </Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
                Favorites
              </Text>
            </TouchableOpacity>
            <View
              style={[styles.statDivider, { backgroundColor: theme.border }]}
            />
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => showInfo("View cart", "Cart")}
              activeOpacity={0.7}
            >
              <Text style={[styles.statValue, { color: theme.text }]}>
                {userStats.cartItems}
              </Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
                Cart Items
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        {renderSection("Account", accountSettings)}
        {renderSection("App Settings", appSettings)}
        {renderSection("Support", supportSettings)}

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.settingIconContainer,
              {
                backgroundColor: "#FEE2E2",
              },
            ]}
          >
            <Image
              source={Icons.leftArrow}
              style={[
                styles.settingIcon,
                { tintColor: "#DC2626", transform: [{ rotate: "180deg" }] },
              ]}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.logoutText, { color: "#DC2626" }]}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.muted }]}>
            AttireBandhan v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
