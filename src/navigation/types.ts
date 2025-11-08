import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  SignUpScreen: undefined;
  Home: undefined;
};

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
