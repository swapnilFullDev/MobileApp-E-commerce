import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Images, { Icons } from "../../constants/images";
import { Theme } from "../../context/ThemeContext";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";
import { AnimatedTouchableOpacity } from "../common";

type ProductHeroProps = {
  imageKey: keyof typeof Images;
  gallery: Array<keyof typeof Images>;
  selectedImage: keyof typeof Images;
  onSelectImage: (key: keyof typeof Images) => void;
  onBack: () => void;
  theme: Theme;
};

export default function ProductHero({
  imageKey,
  gallery,
  selectedImage,
  onSelectImage,
  onBack,
  theme,
}: ProductHeroProps) {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(
    Math.max(gallery.indexOf(selectedImage), 0)
  );
  const scrollRef = useRef<ScrollView>(null);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const openViewer = () => {
    setViewerIndex(Math.max(gallery.indexOf(imageKey), 0));
    setViewerVisible(true);
  };

  const closeViewer = () => {
    setViewerVisible(false);
    const nextImage = gallery[viewerIndex];
    if (nextImage && nextImage !== selectedImage) {
      onSelectImage(nextImage);
    }
  };

  useEffect(() => {
    if (viewerVisible) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          x: viewerIndex * SCREEN_WIDTH,
          y: 0,
          animated: false,
        });
      });
    }
  }, [viewerVisible, viewerIndex, SCREEN_WIDTH]);

  useEffect(() => {
    setViewerIndex(Math.max(gallery.indexOf(selectedImage), 0));
  }, [gallery, selectedImage]);

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    if (nextIndex !== viewerIndex) {
      setViewerIndex(nextIndex);
      const nextImage = gallery[nextIndex];
      if (nextImage) {
        onSelectImage(nextImage);
      }
    }
  };

  return (
    <>
      <View
        style={[
          styles.heroWrapper,
          {
            borderColor: theme.border,
            backgroundColor: theme.surface,
          },
        ]}
      >
        <Pressable onPress={openViewer}>
          <Image
            source={Images[imageKey]}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </Pressable>
        <AnimatedTouchableOpacity
          style={[
            styles.heroBackButton,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
          onPress={onBack}
          hitSlop={16}
        >
          <Image source={Icons.leftArrow} style={styles.backLabel} />
        </AnimatedTouchableOpacity>
        <View style={styles.thumbnailRow}>
          {gallery.map((image) => (
            <Pressable
              key={image}
              onPress={() => onSelectImage(image)}
              style={[
                styles.thumbnail,
                {
                  borderColor:
                    selectedImage === image ? theme.primary : theme.border,
                },
              ]}
            >
              <Image
                source={Images[image]}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </View>
      </View>

      <Modal
        visible={viewerVisible}
        transparent
        animationType="fade"
        onRequestClose={closeViewer}
      >
        <View style={styles.viewerOverlay}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumEnd}
            style={styles.viewerScroll}
          >
            {gallery.map((image) => (
              <View key={`viewer-${image}`} style={{ width: SCREEN_WIDTH }}>
                <Image
                  source={Images[image]}
                  style={styles.viewerImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
          <Pressable style={styles.viewerCloseButton} onPress={closeViewer}>
            <Text style={styles.viewerCloseText}>✕</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
