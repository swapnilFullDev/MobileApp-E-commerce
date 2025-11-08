import { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

type AppTextInputProps = TextInputProps & {
  label: string;
  errorMessage?: string;
};

export const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  ({ label, errorMessage, style, ...rest }, ref) => (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        style={[styles.input, style, errorMessage && styles.inputError]}
        placeholderTextColor={colors.textSecondary}
        {...rest}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  ),
);

AppTextInput.displayName = 'AppTextInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.input,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundLight,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
