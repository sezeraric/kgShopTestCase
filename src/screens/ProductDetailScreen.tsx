import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import colors from '@/styles/colors';
import { addToCart } from '@/redux/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { toggleFavorite } from '@/redux/favoritesSlice';

const { width } = Dimensions.get('window');

type ParamList = { ProductDetail: { id: number } };

const DOT_SIZE = 8;

const ProductDetailScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'ProductDetail'>>();
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const favoriteIds = useSelector((state: any) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(product?.id);
  const heartScale = useRef(new Animated.Value(1)).current;


  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Ürün detayı yüklenemedi.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <View style={styles.safeArea}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  if (error || !product)
    return (
      <View style={styles.safeArea}>
        <Text style={{ color: colors.danger }}>
          {error || 'Ürün bulunamadı.'}
        </Text>
      </View>
    );

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Animated.View style={[styles.heartWrapper, { transform: [{ scale: heartScale }] }] }>
          <TouchableOpacity
            onPress={() => {
              Animated.sequence([
                Animated.timing(heartScale, { toValue: 1.2, duration: 120, useNativeDriver: true }),
                Animated.timing(heartScale, { toValue: 1, duration: 120, useNativeDriver: true })
              ]).start();
              dispatch(toggleFavorite(product.id));
            }}
            activeOpacity={0.7}
            style={{ padding: 6 }}
          >
            <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? colors.primary : colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <FlatList
        data={images}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.gallery}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: (e: any) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(idx);
          }}
        )}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />
      <View style={styles.dotsRow}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.dotActive]} />
        ))}
      </View>
    
      <View style={styles.bottomBarCard}>
          <View style={styles.titlePriceRow}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price} ₺</Text>
      </View>
        <Text style={styles.desc}>{product.description}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}><Icon name="percent" size={15} color={colors.primary} /><Text style={styles.badgeText}> %{product.discountPercentage}</Text></View>
          <View style={styles.badge}><Icon name="star" size={15} color={colors.primary} /><Text style={styles.badgeText}> {product.rating}</Text></View>
          <View style={styles.badge}><Icon name="cube-outline" size={15} color={colors.primary} /><Text style={styles.badgeText}> Stok: {product.stock}</Text></View>
        </View>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            dispatch(addToCart(product));
            Toast.show({
              type: 'custom',
              text1: 'Sepete eklendi',
              text2: product.title,
              position: 'top',
              visibilityTime: 1200,
            });
          }}
        >
          <Icon name="cart-plus" size={22} color="#fff" />
          <Text style={styles.addToCartText}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  gallery: {
    flexGrow: 0,
    marginTop: 8,
    maxHeight: width * 0.7,
  },
  imageWrapper: {
    width: width,
    height: width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginBottom: 0,
  },
  image: {
    width: width * 0.9,
    height: width * 0.8
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: DOT_SIZE * 2,
  },
  contentCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    margin: 16,
    marginTop: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 14,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 50,
    alignSelf: 'flex-start',
  
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f6f9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  badgeText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 2,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    padding: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
    alignItems: 'center',
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 36,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  heartWrapper: {
    marginLeft: 'auto',
    marginRight: 8,
    backgroundColor: colors.card,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bottomBarCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
    alignItems: 'center',
    minHeight: 420,
  },
  titlePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
    gap: 12,
  },
  infoRowCompact: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 2,
    gap: 16,
  },
});

export default ProductDetailScreen;
