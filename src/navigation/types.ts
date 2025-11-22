import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUpScreen: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  ProductDetail: { productId: string };
  Favorites?: undefined;
  Categories: { categoryId?: string } | undefined;
  Checkout: undefined;
  MyOrders: undefined;
};

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  AuthStackNavigationProp
>;

export type CategoriesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  AuthStackNavigationProp
>;
