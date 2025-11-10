import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../components/common/Button";
import { PRODUCT_DETAILS } from "../data/products";
import { AuthStackNavigationProp, AuthStackParamList } from "../navigation";
import { useTheme, useToast } from "../context";
import { productDetailStyles as styles } from "../styles/product/productDetailStyles";
import FulfillmentToggle from "../components/product/FulfillmentToggle";
import ProductPricingSection from "../components/product/ProductPricingSection";
import RentalDetailsCard from "../components/product/RentalDetailsCard";
import PurchaseDetailsCard from "../components/product/PurchaseDetailsCard";
import ProductHero from "../components/product/ProductHero";
import ProductSummary from "../components/product/ProductSummary";
import SimilarProductCard, {
  mapProductDetailToCardData,
} from "../components/product/SimilarProductCard";

type ProductDetailScreenRouteProp = RouteProp<
  AuthStackParamList,
  "ProductDetail"
>;

export default function ProductDetailScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { theme } = useTheme();
  const { showSuccess, showInfo } = useToast();

  const product = useMemo(() => {
    if (!route.params?.productId) {
      return PRODUCT_DETAILS.product1;
    }

    return PRODUCT_DETAILS[route.params.productId] ?? PRODUCT_DETAILS.product1;
  }, [route.params?.productId]);

  const [selectedImage, setSelectedImage] = useState(
    product.gallery[0] ?? product.image
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [selectedDuration, setSelectedDuration] = useState(
    product.rentalDurationOptions[0] ?? 3
  );
  const buyAvailable = product.buyAvailable !== false;
  const rentAvailable =
    product.rentalAvailable !== false &&
    (product.rentalDurationOptions?.length ?? 0) > 0 &&
    product.rentalPricePerDay > 0;
  const canPurchase = buyAvailable && Boolean(product.price);
  const [fulfillmentMode, setFulfillmentMode] = useState<"rent" | "buy">(
    rentAvailable ? "rent" : "buy"
  );

  const [isActionBarVisible, setIsActionBarVisible] = useState(true);
  const [actionBarHeight, setActionBarHeight] = useState(0);
  const actionBarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollOffset = useRef(0);

  useEffect(() => {
    setSelectedImage(product.gallery[0] ?? product.image);
    setSelectedSize(product.sizes[0] ?? "");
    setSelectedColor(product.colors[0] ?? "");
    setSelectedDuration(product.rentalDurationOptions[0] ?? 3);
    setFulfillmentMode(rentAvailable ? "rent" : "buy");
  }, [product, rentAvailable]);

  useEffect(() => {
    const hiddenTranslate = actionBarHeight || 120;

    Animated.timing(actionBarTranslateY, {
      toValue: isActionBarVisible ? 0 : hiddenTranslate,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [actionBarHeight, actionBarTranslateY, isActionBarVisible]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const diff = currentOffset - lastScrollOffset.current;

      if (Math.abs(diff) < 5) {
        return;
      }

      const direction = diff > 0 ? "down" : "up";
      lastScrollOffset.current = currentOffset;

      if (currentOffset <= 0) {
        setIsActionBarVisible(true);
        return;
      }

      if (direction === "down" && !isActionBarVisible) {
        setIsActionBarVisible(true);
      } else if (direction === "up" && isActionBarVisible) {
        setIsActionBarVisible(false);
      }
    },
    [isActionBarVisible]
  );

  const rentalTotalCost = selectedDuration * product.rentalPricePerDay;
  const isRenting = rentAvailable && fulfillmentMode === "rent";
  const primaryActionLabel = isRenting ? "Reserve Now" : "Buy Now";
  const secondaryActionLabel = isRenting ? "Save for Later" : "Add to Wishlist";
  const summaryTitle = isRenting ? "Rental Summary" : "Purchase Summary";
  const summaryValueText =
    isRenting && rentAvailable
      ? `${selectedDuration}-day rental · ₹${rentalTotalCost.toLocaleString(
          "en-IN"
        )}`
      : `Purchase price · ${product.price}`;
  const summaryMetaText =
    isRenting && rentAvailable
      ? `Deposit ₹${product.securityDeposit.toLocaleString("en-IN")} · Size ${
          selectedSize || "Free"
        } · ${selectedColor || "Standard"}`
      : `Size ${selectedSize || "Free"} · ${selectedColor || "Standard"}${
          product.discountLabel ? ` · ${product.discountLabel}` : ""
        }`;

  const similarProducts = useMemo(
    () =>
      Object.values(PRODUCT_DETAILS)
        .filter((item) => item.id !== product.id)
        .slice(0, 6),
    [product.id]
  );

  const handlePrimaryAction = () => {
    if (isRenting) {
      showSuccess(
        `We saved a ${selectedDuration}-day rental for ${product.title}.`,
        "Rental Reserved"
      );
      return;
    }

    showSuccess(`${product.title} is ready to checkout.`, "Added to Cart");
  };

  const handleSecondaryAction = () => {
    const actionMessage = isRenting ? "Saved for later" : "Added to wishlist";

    showInfo(`${product.title} will be waiting for you.`, actionMessage, 2600);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <ProductHero
          imageKey={selectedImage}
          gallery={product.gallery}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
          onBack={() => navigation.goBack()}
          theme={theme}
        />
        {rentAvailable && canPurchase ? (
          <FulfillmentToggle
            mode={fulfillmentMode}
            canPurchase={canPurchase}
            onSelect={setFulfillmentMode}
            theme={theme}
          />
        ) : null}
        <ProductSummary product={product} theme={theme} />
        <ProductPricingSection
          product={product}
          isRenting={isRenting}
          buyAvailable={buyAvailable}
          theme={theme}
        />

        {isRenting ? (
          <RentalDetailsCard
            product={product}
            selectedDuration={selectedDuration}
            onSelectDuration={setSelectedDuration}
            theme={theme}
            totalCost={rentalTotalCost}
          />
        ) : canPurchase ? (
          <PurchaseDetailsCard product={product} theme={theme} />
        ) : null}

        <View style={styles.section}>
          <Text style={[styles.description, { color: theme.secondaryText }]}>
            {product.description}
          </Text>
        </View>

        {product.sizes.length ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Select Size
            </Text>
            <View style={styles.optionRow}>
              {product.sizes.map((size) => (
                <Pressable
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.optionBadge,
                    {
                      borderColor:
                        selectedSize === size ? theme.primary : theme.border,
                      backgroundColor:
                        selectedSize === size
                          ? theme.primary + "20"
                          : theme.surface,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      {
                        color:
                          selectedSize === size ? theme.primary : theme.text,
                      },
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {product.colors.length ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Available Colors
            </Text>
            <View style={styles.optionRow}>
              {product.colors.map((colorName) => (
                <Pressable
                  key={colorName}
                  onPress={() => setSelectedColor(colorName)}
                  style={[
                    styles.optionBadge,
                    {
                      borderColor:
                        selectedColor === colorName
                          ? theme.primary
                          : theme.border,
                      backgroundColor:
                        selectedColor === colorName
                          ? theme.primary + "20"
                          : theme.surface,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      {
                        color:
                          selectedColor === colorName
                            ? theme.primary
                            : theme.text,
                      },
                    ]}
                  >
                    {colorName}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Highlights
          </Text>
          <View style={styles.highlightsList}>
            <View style={styles.highlightRow}>
              <View
                style={[styles.bullet, { backgroundColor: theme.primary }]}
              />
              <Text
                style={[styles.highlightText, { color: theme.secondaryText }]}
              >
                {product.rentalInfo}
              </Text>
            </View>
            {product.highlights.map((highlight) => (
              <View style={styles.highlightRow} key={highlight}>
                <View
                  style={[styles.bullet, { backgroundColor: theme.primary }]}
                />
                <Text
                  style={[styles.highlightText, { color: theme.secondaryText }]}
                >
                  {highlight}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Delivery
          </Text>
          <Text style={[styles.deliveryText, { color: theme.secondaryText }]}>
            {product.deliveryInfo}
          </Text>
        </View>

        {similarProducts.length ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Similar Products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarList}
            >
              {similarProducts.map((item) => (
                <SimilarProductCard
                  key={item.id}
                  item={mapProductDetailToCardData(item)}
                  theme={theme}
                  onPress={() =>
                    navigation.push("ProductDetail", { productId: item.id })
                  }
                />
              ))}
            </ScrollView>
          </View>
        ) : null}
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.actionBar,
          {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
            transform: [{ translateY: actionBarTranslateY }],
          },
        ]}
        onLayout={({ nativeEvent: { layout } }) => {
          if (layout.height !== actionBarHeight) {
            setActionBarHeight(layout.height);
          }
        }}
      >
        <View style={styles.actionInfo}>
          <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>
            {summaryTitle}
          </Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>
            {summaryValueText}
          </Text>
          <Text style={[styles.summaryMeta, { color: theme.secondaryText }]}>
            {summaryMetaText}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <Button
            title={primaryActionLabel}
            onPress={handlePrimaryAction}
            fullWidth
            style={styles.primaryButton}
          />
          <Button
            title={secondaryActionLabel}
            onPress={handleSecondaryAction}
            fullWidth
            style={styles.secondaryButton}
            backgroundColor={"#2F2D2D"}
          />
        </View>
      </Animated.View>
    </View>
  );
}
