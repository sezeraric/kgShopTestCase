import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProductCard from '@/components/ProductCard';
import colors from '@/styles/colors';
import Header from '@/components/Header';
import EmptyCartShowcase from '@/components/EmptyCartShowcase';

type RootStackParamList = {
  ProductDetail: { id: number };
  Cart: undefined;
};

const FavoritesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const favoriteIds = useSelector((state: any) => state.favorites.ids);
  const products = useSelector((state: any) => state.product.products);
  const favoriteProducts = products.filter((p: any) =>
    favoriteIds.includes(p.id),
  );

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Header
          title="Favorilerim"
          rightIcon="cart"
          onRightPress={() => navigation.navigate('Cart')}
        />
        <EmptyCartShowcase
          products={products.slice(0, 8)}
          onBrowse={() => navigation.navigate('Home')}
          title="Favori ürününüz yok"
          description="Beğendiğiniz ürünleri burada bulabilirsiniz"
          iconName="heart-off"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Favorilerim"
        rightIcon="cart"
        onRightPress={() => navigation.navigate('Cart')}
      />
      <FlatList
        data={favoriteProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', { id: item.id })
            }
            activeOpacity={0.85}
          >
            <ProductCard
              product={item}
              grid={false}
              single={false}
              onPress={() =>
                navigation.navigate('ProductDetail', { id: item.id })
              }
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyText: { fontSize: 18, color: colors.textSecondary, marginTop: 24 },
  list: { paddingBottom: 32 },
});

export default FavoritesScreen;
