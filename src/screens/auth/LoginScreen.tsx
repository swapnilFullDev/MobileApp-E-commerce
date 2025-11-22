import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFormik } from "formik";
import AuthHeader from "../../components/auth/AuthHeader";
import { Button, TextInput } from "../../components/common";
import { useTheme, useToast } from "../../context";
import STRINGS from "../../constants/strings";
import { loginScreenStyles } from "../../styles/auth/loginStyles";
import Images, { Icons } from "../../constants/images";
import { isDevelopment, isProduction, isStaging } from "../../config/env";
import { ROUTES } from "../../constants";
import { AuthStackNavigationProp } from "../../navigation/types";
import { loginValidationSchema } from "../../validation/authSchema";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { loginThunk } from "../../redux/thunks/authThunks";
import { typeScale } from "../../theme";
import { spacing } from "../../theme/spacing";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { showSuccess, showError } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "swapnil@example.com",
      password: "Test@123",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(loginThunk(values)).unwrap();
        showSuccess(STRINGS.auth.login.success, "Login Successful");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : auth.error ?? STRINGS.auth.login.error;
        showError(message, "Login Failed");
        console.log(error);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const getEnvironmentColor = () => {
    if (isDevelopment()) {
      return "#4CAF50";
    }

    if (isStaging()) {
      return "#FF9800";
    }

    return "#F44336";
  };

  const getEnvironmentBadgeText = () => {
    if (isDevelopment()) {
      return STRINGS.auth.environment.dev;
    }

    if (isStaging()) {
      return STRINGS.auth.environment.staging;
    }

    return STRINGS.auth.environment.prod;
  };

  return (
    <View
      style={[loginScreenStyles.wrapper, { backgroundColor: theme.background }]}
    >
      <ImageBackground
        source={Images.backgroundPattern}
        style={loginScreenStyles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          style={loginScreenStyles.scrollView}
          contentContainerStyle={loginScreenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginScreenStyles.container}>
            <AuthHeader
              title={STRINGS.auth.login.title}
              subtitle={STRINGS.auth.login.subtitle}
              badgeText={getEnvironmentBadgeText()}
              badgeColor={getEnvironmentColor()}
            />

            <View style={loginScreenStyles.formContainer}>
              <TextInput
                label={STRINGS.auth.login.emailLabel}
                placeholder={STRINGS.auth.login.emailPlaceholder}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              />

              <TextInput
                label={STRINGS.auth.login.passwordLabel}
                placeholder={STRINGS.auth.login.passwordPlaceholder}
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                secureTextEntry={!showPassword}
                rightIcon
                onRightIconPress={() => setShowPassword((prev) => !prev)}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              />

              <View style={loginScreenStyles.rememberRow}>
                <TouchableOpacity
                  style={loginScreenStyles.checkboxContainer}
                  onPress={() => setRememberMe((prev) => !prev)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                >
                  <View
                    style={[
                      loginScreenStyles.checkbox,
                      { borderColor: theme.border },
                    ]}
                  >
                    {rememberMe ? (
                      <View
                        style={[
                          loginScreenStyles.checkboxChecked,
                          { backgroundColor: theme.muted },
                        ]}
                      />
                    ) : null}
                  </View>
                  <Text
                    style={[
                      loginScreenStyles.rememberText,
                      { color: theme.muted },
                    ]}
                  >
                    {STRINGS.auth.login.rememberMe}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={[
                      loginScreenStyles.actionLink,
                      { color: theme.muted },
                    ]}
                  >
                    {STRINGS.auth.login.forgotPassword}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                title={STRINGS.auth.login.loginButton}
                onPress={() => formik.handleSubmit()}
                loading={formik.isSubmitting || auth.status === "loading"}
                fullWidth
                style={{ marginTop: spacing.md }}
              />

              <View style={loginScreenStyles.divider}>
                <View
                  style={[
                    loginScreenStyles.dividerLine,
                    { backgroundColor: theme.border },
                  ]}
                />
                <Text
                  style={[
                    loginScreenStyles.dividerText,
                    { color: theme.muted },
                  ]}
                >
                  {STRINGS.auth.login.orDivider}
                </Text>
                <View
                  style={[
                    loginScreenStyles.dividerLine,
                    { backgroundColor: theme.border },
                  ]}
                />
              </View>

              <Text
                style={[loginScreenStyles.continueText, { color: theme.muted }]}
              >
                {STRINGS.auth.login.continueWith}
              </Text>

              <View style={loginScreenStyles.socialButtonsContainer}>
                <TouchableOpacity style={loginScreenStyles.socialButton}>
                  <Image
                    source={Icons.google}
                    style={loginScreenStyles.socialIcon}
                  />
                </TouchableOpacity>
                <View style={{ width: 24 }} />
                <TouchableOpacity style={loginScreenStyles.socialButton}>
                  <Image
                    source={Icons.facebook}
                    style={loginScreenStyles.socialIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={loginScreenStyles.signupRow}>
                <Text
                  style={[loginScreenStyles.signupText, { color: theme.muted }]}
                >
                  {STRINGS.auth.login.signUpText}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(ROUTES.SIGN_UP)}
                >
                  <Text
                    style={[
                      loginScreenStyles.actionLink,
                      {
                        color: theme.primary,
                        fontFamily: typeScale.fontFamily.bold,
                      },
                    ]}
                  >
                    {STRINGS.auth.login.signUpLink}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
