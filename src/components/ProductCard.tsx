import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '@/types';
import { useDispatch } from 'react-redux'; 
import Toast from 'react-native-toast-message';
import colors from '@/styles/colors';
import { addToCart } from '@/redux/cartSlice';

interface Props {
  product: Product;
  onPress: () => void;
  grid?: boolean;
  single?: boolean;
}

const ProductCard = ({ product, onPress, grid = false, single = false }: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    Toast.show({
      type: 'custom',
      text1: 'Sepete eklendi',
      text2: product.title,
      position: 'top',
      visibilityTime: 1200,
    });
  };

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        grid ? styles.cardGrid : styles.cardList,
        single && styles.cardSingle
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={grid ? styles.imageWrapperGrid : styles.imageWrapperList}>
        <Image
          source={{ uri: product.thumbnail }}
          style={grid ? styles.imageGrid : styles.imageList}
          resizeMode="contain"
        />
        {hasDiscount && (
          <View style={grid ? styles.discountBadge : styles.discountBadgeList}>
            <Text style={styles.discountText}>-%{Math.round(product.discountPercentage!)}</Text>
          </View>
        )}
      </View>
      <View style={[styles.info, grid ? styles.infoGrid : styles.infoList]}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>{product.price} ₺</Text>
      </View>
      <TouchableOpacity style={grid ? styles.addBtnGrid : styles.addBtn} onPress={handleAddToCart} activeOpacity={0.8}>
        <Text style={styles.addBtnText}>Sepete Ekle</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
   
    marginBottom: 20,
    overflow: 'visible',
    position: 'relative',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },
  cardGrid: {
    width: '45%',
    minHeight: 220,
    marginHorizontal: '1%',
  },
  cardList: {
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: 150,
  },
  cardSingle: {
    width: '90%',
    alignSelf: 'center',
  },
  imageWrapperGrid: {
    width: '100%',
    height: 110,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    position: 'relative',

  },
  imageWrapperList: {
    width: 90,
    height: 90,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 48,
    position: 'relative',
  },
  imageGrid: {
    width: 160,
    height: 160,
    borderRadius: 16,
  },
  imageList: {
    width: 170,
    height: 170,
    borderRadius: 16,
    bottom: 10,
    left: 20,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  discountBadgeList: {
    position: 'absolute',
    top: -14,
    left:8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 2,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    
  },
  infoGrid: {
    alignItems: 'flex-start',
    marginTop: 2,
    backgroundColor: colors.card,
    width: '100%',
  },
  infoList: {
    alignItems: 'flex-start',
    marginLeft: 0,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'left',
    paddingHorizontal:6,
    paddingVertical:6
  },
  price: {
    fontSize: 17,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'left',
    paddingHorizontal:6,
    paddingVertical:6
  },
  addBtn: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    width:"100%",
    height: 34,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    flex: 1,
  },
  addBtnGrid: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    width:"100%",
    height: 34,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  addBtnText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ProductCard; 