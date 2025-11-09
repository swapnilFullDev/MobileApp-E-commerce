import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../components/common/Button";
import Images, { Icons } from "../constants/images";
import { PRODUCT_DETAILS } from "../data/products";
import { AuthStackNavigationProp, AuthStackParamList } from "../navigation";
import { useTheme } from "../context";
import { spacing } from "../theme/spacing";
import { productDetailStyles as styles } from "../styles/product/productDetailStyles";
import FulfillmentToggle from "../components/product/FulfillmentToggle";
import ProductPricingSection from "../components/product/ProductPricingSection";
import RentalDetailsCard from "../components/product/RentalDetailsCard";
import PurchaseDetailsCard from "../components/product/PurchaseDetailsCard";

type ProductDetailScreenRouteProp = RouteProp<
  AuthStackParamList,
  "ProductDetail"
>;

export default function ProductDetailScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { theme } = useTheme();

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

  useEffect(() => {
    setSelectedImage(product.gallery[0] ?? product.image);
    setSelectedSize(product.sizes[0] ?? "");
    setSelectedColor(product.colors[0] ?? "");
    setSelectedDuration(product.rentalDurationOptions[0] ?? 3);
    setFulfillmentMode(rentAvailable ? "rent" : "buy");
  }, [product, rentAvailable]);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <View
        style={[
          styles.header,
          {
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Pressable
          style={[
            styles.backButton,
            {
              borderColor: theme.border,
              backgroundColor: theme.surface,
            },
          ]}
          onPress={() => navigation.goBack()}
          hitSlop={spacing.sm}
        >
          <Image source={Icons.leftArrow} style={styles.backLabel} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Product Details
        </Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {rentAvailable && canPurchase ? (
          <FulfillmentToggle
            mode={fulfillmentMode}
            canPurchase={canPurchase}
            onSelect={setFulfillmentMode}
            theme={theme}
          />
        ) : null}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Image
            source={Images[selectedImage]}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.thumbnailRow}>
            {product.gallery.map((imageKey) => (
              <Pressable
                key={imageKey}
                onPress={() => setSelectedImage(imageKey)}
                style={[
                  styles.thumbnail,
                  {
                    borderColor:
                      selectedImage === imageKey ? theme.primary : theme.border,
                  },
                ]}
              >
                <Image
                  source={Images[imageKey]}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.title, { color: theme.text }]}>
            {product.title}
          </Text>
          <Text style={[styles.rentalTagline, { color: theme.secondaryText }]}>
            Premium outfit rentals tailored for your celebrations
          </Text>
          <View style={styles.ratingRow}>
            <Text style={[styles.ratingValue, { color: theme.primary }]}>
              {product.rating.toFixed(1)}
            </Text>
            <Text style={[styles.ratingStars, { color: theme.primary }]}>
              {generateRatingStars(product.rating)}
            </Text>
            <Text style={[styles.reviewsText, { color: theme.secondaryText }]}>
              ({product.reviewsCount} reviews)
            </Text>
          </View>
          <ProductPricingSection
            product={product}
            isRenting={isRenting}
            buyAvailable={buyAvailable}
            theme={theme}
          />
        </View>

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
                <Pressable
                  key={item.id}
                  style={[
                    styles.similarCard,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() =>
                    navigation.push("ProductDetail", { productId: item.id })
                  }
                >
                  <Image
                    source={Images[item.image]}
                    style={styles.similarImage}
                    resizeMode="cover"
                  />
                  <View style={styles.similarInfo}>
                    <Text
                      style={[styles.similarTitle, { color: theme.text }]}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.similarPriceRow}>
                      {item.originalPrice ? (
                        <Text style={styles.similarOriginalPrice}>
                          {item.originalPrice}
                        </Text>
                      ) : null}
                      <Text
                        style={[styles.similarPrice, { color: theme.text }]}
                      >
                        {item.price}
                      </Text>
                      {item.discountLabel ? (
                        <Text
                          style={[
                            styles.similarDiscount,
                            { color: theme.primary },
                          ]}
                        >
                          {item.discountLabel}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.actionBar,
          {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
          },
        ]}
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
            onPress={() => {}}
            fullWidth
            style={styles.primaryButton}
          />
          <Button
            title={secondaryActionLabel}
            onPress={() => {}}
            fullWidth
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </View>
  );
}

function generateRatingStars(rating: number) {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 })
    .map((_, index) => (index < rounded ? "*" : "-"))
    .join(" ");
}
