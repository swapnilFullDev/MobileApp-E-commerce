import { forwardRef, ReactNode } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context";
import { Icons } from "../../constants/images";
import { scale } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { colors } from "../../theme/colors";

type Props = TextInputProps & {
  label?: string;
  rightIcon?: ReactNode | boolean;
  onRightIconPress?: () => void;
  error?: string;
};

const TextInput = forwardRef<RNTextInput, Props>(
  ({ label, style, rightIcon, onRightIconPress, error, ...rest }, ref) => {
    const { theme } = useTheme();

    return (
      <View style={styles.container}>
        {label ? (
          <Text
            style={[
              styles.label,
              {
                color: theme.muted,
              },
            ]}
          >
            {label}
          </Text>
        ) : null}
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: error ? colors.error : theme.border,
              backgroundColor: theme.surface,
            },
          ]}
        >
          <RNTextInput
            ref={ref}
            placeholderTextColor={theme.muted}
            style={[
              styles.input,
              {
                color: theme.text,
                fontFamily: typeScale.fontFamily.medium,
                fontSize: typeScale.fontSize.md,
              },
              style,
            ]}
            {...rest}
          />
          {rightIcon ? (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconContainer}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {typeof rightIcon === "boolean" ? (
                <Image
                  source={Icons.eyeShow}
                  style={[
                    styles.icon,
                    {
                      tintColor: theme.primary,
                      opacity: rest.secureTextEntry ? 1 : 0.5,
                    },
                  ]}
                />
              ) : (
                rightIcon
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  iconContainer: {
    marginLeft: scale(12),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
  },
  errorText: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
    color: colors.error,
  },
});

export default TextInput;
