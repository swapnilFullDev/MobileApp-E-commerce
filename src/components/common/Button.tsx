import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../context';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export default function Button({
  title,
  onPress,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: theme.primary,
          opacity: loading ? 0.6 : pressed ? 0.85 : 1,
          alignSelf: fullWidth ? 'stretch' : 'center',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    borderRadius: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    ...typography.button,
  },
});
