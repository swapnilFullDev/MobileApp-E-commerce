import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
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
import Images, { Icons } from "../../constants/images";
import STRINGS from "../../constants/strings";
import { ROUTES } from "../../constants";
import { signUpScreenStyles } from "../../styles/auth/signUpStyles";
import { useTheme } from "../../context";
import { AuthStackNavigationProp } from "../../navigation/types";
import { signUpValidationSchema } from "../../validation/authSchema";
import { useAppDispatch } from "../../redux/hooks";
import { registerThunk } from "../../redux/thunks/authThunks";

type SignUpFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(
          registerThunk({
            FullName: values.fullName,
            Email: values.email,
            Password: values.password,
            ConfirmPassword: values.confirmPassword,
            Phone: values.phone,
            Address: "Not provided",
            Gender: "Not specified",
            ProfileImage: "",
            Role: "User",
          })
        ).unwrap();
        Alert.alert("Success", STRINGS.auth.signup.success, [
          {
            text: "OK",
            onPress: () => navigation.navigate(ROUTES.LOGIN),
          },
        ]);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : STRINGS.auth.signup.error;
        Alert.alert("Registration failed", message);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <View
      style={[
        signUpScreenStyles.wrapper,
        { backgroundColor: theme.background },
      ]}
    >
      <ImageBackground
        source={Images.backgroundPattern}
        style={signUpScreenStyles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          style={signUpScreenStyles.scrollView}
          contentContainerStyle={signUpScreenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={signUpScreenStyles.container}>
            <AuthHeader
              title={STRINGS.auth.signup.title}
              subtitle={STRINGS.auth.signup.subtitle}
              containerStyle={signUpScreenStyles.header}
            />

            <View style={signUpScreenStyles.formContainer}>
              <TextInput
                label={STRINGS.auth.signup.nameLabel}
                placeholder={STRINGS.auth.signup.namePlaceholder}
                value={formik.values.fullName}
                onChangeText={formik.handleChange("fullName")}
                onBlur={formik.handleBlur("fullName")}
                autoCapitalize="words"
                error={
                  formik.touched.fullName && formik.errors.fullName
                    ? formik.errors.fullName
                    : undefined
                }
              />

              <TextInput
                label={STRINGS.auth.signup.emailLabel}
                placeholder={STRINGS.auth.signup.emailPlaceholder}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                autoCapitalize="none"
                keyboardType="email-address"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              />

              <TextInput
                label={STRINGS.auth.signup.phoneLabel}
                placeholder={STRINGS.auth.signup.phonePlaceholder}
                value={formik.values.phone}
                onChangeText={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                keyboardType="phone-pad"
                error={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : undefined
                }
              />

              <TextInput
                label={STRINGS.auth.signup.passwordLabel}
                placeholder={STRINGS.auth.signup.passwordPlaceholder}
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

              <TextInput
                label={STRINGS.auth.signup.confirmPasswordLabel}
                placeholder={STRINGS.auth.signup.confirmPasswordPlaceholder}
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange("confirmPassword")}
                onBlur={formik.handleBlur("confirmPassword")}
                secureTextEntry={!showConfirmPassword}
                rightIcon
                onRightIconPress={() => setShowConfirmPassword((prev) => !prev)}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
              />

              <TouchableOpacity
                style={signUpScreenStyles.termsRow}
                onPress={() => setAcceptedTerms((prev) => !prev)}
                activeOpacity={0.8}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: acceptedTerms }}
              >
                <View
                  style={[
                    signUpScreenStyles.checkbox,
                    {
                      borderColor: theme.border,
                      backgroundColor: theme.background,
                    },
                  ]}
                >
                  {acceptedTerms ? (
                    // <View
                    //   style={[
                    //     signUpScreenStyles.checkboxChecked,
                    //     { backgroundColor: theme.primary },
                    //   ]}
                    // />
                    <Text>✓</Text>
                  ) : null}
                </View>
                <Text
                  style={[signUpScreenStyles.termsText, { color: theme.muted }]}
                >
                  {STRINGS.auth.signup.terms}
                </Text>
              </TouchableOpacity>

              <Button
                title={STRINGS.auth.signup.signUpButton}
                onPress={() => formik.handleSubmit()}
                loading={formik.isSubmitting}
                fullWidth
              />
            </View>

            <View style={signUpScreenStyles.footer}>
              <Text
                style={[signUpScreenStyles.footerText, { color: theme.muted }]}
              >
                {STRINGS.auth.signup.loginText}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
              >
                <Text
                  style={[signUpScreenStyles.footerLink, { color: theme.text }]}
                >
                  {STRINGS.auth.signup.loginLink}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
