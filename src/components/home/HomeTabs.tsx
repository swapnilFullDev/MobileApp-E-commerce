import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context";
import { spacing } from "../../theme/spacing";
import { scale, widthPercent } from "../../theme/metrics";
import { typeScale } from "../../theme/scales";
import { colors } from "../../theme/colors";

type HomeTabsProps<T extends readonly string[]> = {
  tabs: T;
  activeTab: T[number];
  onTabPress: (tab: T[number]) => void;
};

export default function HomeTabs<T extends readonly string[]>({
  tabs,
  activeTab,
  onTabPress,
}: HomeTabsProps<T>) {
  const { theme } = useTheme();
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});

  return (
    <View style={[styles.container, { borderColor: theme.border }]}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        const indicatorWidth = tabWidths[tab] ? tabWidths[tab] + scale(24) : 0;

        const handleLayout = (width: number) => {
          setTabWidths((prev) => {
            if (prev[tab] === width) {
              return prev;
            }
            return {
              ...prev,
              [tab]: width,
            };
          });
        };

        return (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => onTabPress(tab)}
            activeOpacity={0.85}
          >
            <View style={styles.labelWrapper}>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? theme.primary : theme.muted },
                ]}
                onLayout={({ nativeEvent }) =>
                  handleLayout(nativeEvent.layout.width)
                }
              >
                {tab}
              </Text>
              <View
                style={[
                  styles.indicator,
                  {
                    backgroundColor: isActive ? theme.primary : "transparent",
                    width: indicatorWidth,
                    opacity: indicatorWidth ? 1 : 0,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: spacing.md,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  tab: {
    // paddingVertical: spacing.sm,
    // paddingHorizontal: scale(12),
  },
  labelWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.md,
    color: colors.textSecondary,
  },
  indicator: {
    height: scale(2),
    marginTop: widthPercent(0.014),
    borderRadius: scale(1),
  },
});
