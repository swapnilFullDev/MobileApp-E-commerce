import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Images from "../../constants/images";
import { PROMOTIONS, PromotionCard } from "../../data/home";
import { useTheme } from "../../context";
import { scale, verticalScale, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { colors } from "../../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - spacing.xl * 2;
const SNAP_INTERVAL = CARD_WIDTH + spacing.md;

type HomePromotionsCarouselProps = {
  data?: PromotionCard[];
};

export default function HomePromotionsCarousel({
  data = PROMOTIONS,
}: HomePromotionsCarouselProps) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(data.length > 1 ? 1 : 0);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems?.length) {
        const next = viewableItems[0]?.index ?? 0;
        if (typeof next === "number" && next !== activeIndex) {
          setActiveIndex(next);
        }
      }
    }
  ).current;

  const renderItem = ({
    item,
    index,
  }: {
    item: PromotionCard;
    index: number;
  }) => (
    <ImageBackground
      source={Images[item.image]}
      style={styles.card}
      imageStyle={styles.image}
      // resizeMode="contain"
    >
      <TouchableOpacity
        style={[styles.cta, { backgroundColor: theme.primary }]}
        activeOpacity={0.9}
      >
        <Text style={styles.ctaText}>{item.cta}</Text>
      </TouchableOpacity>
      {/* </View> */}
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        snapToAlignment="start"
        initialScrollIndex={data.length > 1 ? 1 : 0}
        getItemLayout={(_, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        })}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.indicators}>
        {data.map((_, index) => (
          <View
            key={`promo-dot-${index}`}
            style={[
              styles.dot,
              {
                opacity: activeIndex === index ? 1 : 0.3,
                backgroundColor: theme.primary,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    // paddingTop: spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    height: verticalScale(160),
    borderRadius: radii.md,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    borderRadius: radii.xl,
  },
  overlay: {
    padding: spacing.lg,
    gap: spacing.sm,
  },

  cta: {
    alignSelf: "flex-start",
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: widthPercent(0.014),
    margin: widthPercent(0.02),
  },
  ctaText: {
    color: colors.white,
    fontFamily: typeScale.fontFamily.semibold,
    fontSize: typeScale.fontSize.sm,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
  },
});
