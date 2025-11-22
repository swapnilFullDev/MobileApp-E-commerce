import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context";
import MainTabs from "./MainTabs";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import { ROUTES } from "../constants";
import { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabs} />
            <Stack.Screen
              name={ROUTES.PRODUCT_DETAIL}
              component={ProductDetailScreen}
            />
            <Stack.Screen name={ROUTES.FAVORITES} component={FavoritesScreen} />
            <Stack.Screen
              name={ROUTES.CATEGORIES}
              component={CategoriesScreen}
            />
            <Stack.Screen name={ROUTES.CHECKOUT} component={CheckoutScreen} />
            <Stack.Screen name={ROUTES.MY_ORDERS} component={MyOrdersScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.SIGN_UP} component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
