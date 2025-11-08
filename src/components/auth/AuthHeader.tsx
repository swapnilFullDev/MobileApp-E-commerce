import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Images from '../../constants/images';
import { useTheme } from '../../context';
import { scale, verticalScale } from '../../theme/metrics';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type AuthHeaderProps = {
  title: string;
  subtitle: string;
  logoSource?: ImageSourcePropType;
  badgeText?: string;
  badgeColor?: string;
  containerStyle?: ViewStyle;
};

export default function AuthHeader({
  title,
  subtitle,
  logoSource = Images.brandName,
  badgeText,
  badgeColor,
  containerStyle,
}: AuthHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {badgeText ? (
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColor ?? theme.primary },
            ]}
          >
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badgeContainer: {
    alignSelf: 'flex-end',
    width: '100%',
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
  },
  badgeText: {
    ...typography.caption,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: scale(180),
    height: verticalScale(80),
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
});
