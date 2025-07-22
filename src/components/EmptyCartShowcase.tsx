import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

interface Props {
  products: Product[];
  onBrowse: () => void;
  title?: string;
  description?: string;
  iconName?: string;
}

const ITEM_HEIGHT = 110;
const LOOP_COUNT = 3;

const EmptyCartShowcase: React.FC<Props> = ({ products, onBrowse, title, description, iconName }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList<any>>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const loopedProducts = Array(LOOP_COUNT).fill(products).flat();
  const middleIndex = products.length;

  useEffect(() => {
    let index = middleIndex;
    if (products.length > 0) {
      listRef.current?.scrollToOffset({ offset: index * ITEM_HEIGHT, animated: false });
      intervalRef.current = setInterval(() => {
        index++;
        listRef.current?.scrollToOffset({ offset: index * ITEM_HEIGHT, animated: true });
        if (index >= products.length * (LOOP_COUNT - 1)) {
          index = middleIndex;
          setTimeout(() => {
            listRef.current?.scrollToOffset({ offset: index * ITEM_HEIGHT, animated: false });
          }, 400);
        }
      }, 1800);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [products, middleIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name={iconName || 'cart-off'} size={64} color={colors.primary} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title || 'Sepetiniz boş'}</Text>
      <Text style={styles.description}>{description || 'İndirimli ürünler ve kampanyaları keşfet'}</Text>
      <Animated.FlatList
        ref={listRef}
        data={loopedProducts}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        bounces={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
          ];
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [20, 0, -20],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View style={[styles.productCard, { opacity, transform: [{ translateY }] }]}> 
              <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price} ₺</Text>
              </View>
            </Animated.View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, i) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * i, index: i })}
        initialNumToRender={5}
        maxToRenderPerBatch={7}
        windowSize={7}
      />
      <TouchableOpacity style={styles.button} onPress={onBrowse} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Ürünlere Göz At</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    backgroundColor: colors.background,
  },
  iconWrapper: {
    marginBottom: 18,
    backgroundColor: colors.card,
    borderRadius: 40,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  icon: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    opacity: 0.5,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginBottom: 28,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    zIndex: 1000,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: 54,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  list: {
    width: width * 0.92,
    maxHeight: ITEM_HEIGHT * 4.2,
    marginTop: 10,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    height: ITEM_HEIGHT - 10,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: colors.background,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default EmptyCartShowcase; 