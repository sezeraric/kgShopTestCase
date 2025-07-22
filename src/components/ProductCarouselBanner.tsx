import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import colors from '@/styles/colors';

const { width } = Dimensions.get('window');

interface BannerData {
  id: number;
  title: string;
  discounts: string[];
  image: any; 
  bg: string;
}

interface Props {
  banners: BannerData[];
}

const DOT_SIZE = 8;
const AUTO_SCROLL_INTERVAL = 3500;
const BANNER_WIDTH = width * 0.6;

const ProductCarouselBanner: React.FC<Props> = ({ banners }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: nextIndex * (BANNER_WIDTH + 16), animated: true });
      setActiveIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [activeIndex, banners.length]);

  const onScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_WIDTH + 16));
    setActiveIndex(index);
  };

  if (!banners || banners.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={styles.scroll}
        snapToInterval={BANNER_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={[styles.banner, { backgroundColor: banner.bg, width: BANNER_WIDTH, marginRight: 16 }]}> 
            <Text style={styles.title}>{banner.title}</Text>
            <View style={styles.discountRow}>
              {banner.discounts.map((d, i) => (
                <View key={i} style={styles.discountBadge}><Text style={styles.discountText}>{d}</Text></View>
              ))}
            </View>
            <Image source={banner.image} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsRow}>
        {banners.map((_, i) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  scroll: {
    width: '100%',
  },
  banner: {
    borderRadius: 22,
    marginTop: 8,
    marginBottom: 8,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: 120,
    overflow: 'hidden',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  discountRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  discountText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  image: {
    position: 'absolute',
    right: -100,
    bottom:-40,
    width: 250,
    height: 250,
    zIndex: -1000,
    opacity: 0.5,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#fff',
    opacity: 0.4,
    marginHorizontal: 4,
  },
  dotActive: {
    opacity: 1,
    backgroundColor: colors.primary,
  },
});

export default ProductCarouselBanner; 