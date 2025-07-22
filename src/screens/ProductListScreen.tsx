import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import colors from '../styles/colors';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCarouselBanner from '../components/ProductCarouselBanner';
import CustomHeader from '../components/CustomHeader';
import {
  fetchProductsRequest,
  setCategory,
  setSearch,
  setSort,
  setPage,
  clearProducts,
} from '../redux/productSlice';

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  header: { padding: 16, backgroundColor: colors.background },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  resultText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 24,
    marginTop: 8,
    marginBottom: 4,
  },
  list: { paddingBottom: 32 },
  categoryBar: { flexGrow: 0, marginTop: 8, marginBottom: 2 },
  categoryBtn: {
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: '#fff',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    marginBottom: 4,
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'space-between',
    zIndex: 1000,
    paddingEnd:10
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: hexToRgba(colors.primary, 0.22),
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 0,
    marginLeft: 4,
    justifyContent:'space-between',
    height: 30,
  },
  filterChipText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  filterChipClose: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 10,
  },
});

const ITEM_HEIGHT = 260;

const ProductListScreen = forwardRef(({ navigation, scrollToTopSignal, tabBarAnimatedOpacity }: any, ref) => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    search,
    categories,
    selectedCategory,
    page,
    hasMore,
    total,
    sort,
  } = useSelector((state: any) => state.product);


  const [gridView, setGridView] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const searchTranslateY = useRef(new Animated.Value(80)).current;
  const currentScrollY = useRef(0);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  }));

  useEffect(() => {
    if (typeof scrollToTopSignal === 'number') {
      if (currentScrollY.current > 0 && flatListRef.current) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            if (tabBarAnimatedOpacity) {
              Animated.sequence([
                Animated.timing(tabBarAnimatedOpacity, { toValue: 0.3, duration: 180, useNativeDriver: true }),
                Animated.timing(tabBarAnimatedOpacity, { toValue: 1, duration: 320, useNativeDriver: true })
              ]).start();
            }
          }, 60);
        });
      }
    }
  }, [scrollToTopSignal, tabBarAnimatedOpacity]);

  const bannerColors = ['#5ed6d6', '#a3c76d', '#6c63ff', '#f4a261'];
  const bannerProducts = products.slice(0, 4).map((p: any, i: number) => ({
    id: p.id,
    title: p.title,
    discounts: p.discountPercentage ? [`-%${Math.round(p.discountPercentage)}`] : [],
    image: { uri: p.thumbnail },
    bg: bannerColors[i % bannerColors.length],
  }));

  useEffect(() => {
    dispatch({ type: 'product/fetchCategoriesRequest' });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch, search, selectedCategory, sort, page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(setPage(page + 1));
    }
  };

  const handleCategorySelect = (cat: string) => {
    dispatch(setCategory(cat));
    dispatch(clearProducts());
    dispatch(setPage(0));
  };

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + (sort !== 'default' ? 1 : 0);

  const productData = gridView ? ['search', null, ...products] : ['search', ...products];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        ref={flatListRef}
        data={productData}
        keyExtractor={item => {
          if (item === 'search') return 'search';
          if (item === null) return 'empty';
          return item.id.toString();
        }}
        renderItem={({ item }) => (
          item === 'search' ? (
            <View style={{ zIndex: 99,marginBottom: 16 }}>
              <SearchBarWithFilter
                value={search}
                onChange={text => dispatch(setSearch(text))}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                sort={sort}
                onSortChange={val => dispatch(setSort(val))}
                activeFilterCount={activeFilterCount}
              />
            </View>
          ) : item === null ? (
            <View style={{ flex: 1 }} />
          ) : (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
              grid={gridView}
              single={products.length === 1}
            />
          )
        )}
        contentContainerStyle={[
          styles.list,
          products.length === 1 && { alignItems: 'center' }
        ]}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <View style={{ padding: 16 }}><ActivityIndicator size="small" color={colors.primary} /></View> : null}
        numColumns={gridView ? 2 : 1}
        key={gridView ? 'grid' : 'list'}
        columnWrapperStyle={gridView ? { justifyContent: 'center' } : undefined}
        ListHeaderComponent={
          <View>
            <Animated.View style={{ transform: [{ translateY: headerTranslateY }], zIndex: 100 }}>
              <CustomHeader />
            </Animated.View>
            <View style={{flex: 1}}>
              <ProductCarouselBanner banners={bannerProducts} />
              <View style={styles.resultRow}>
                <Text style={styles.resultText}>Toplam {total} sonuç</Text>
                <TouchableOpacity onPress={() => setGridView(!gridView)}>
                <MaterialCommunityIcons
                  name={gridView ? 'view-agenda-outline' : 'view-grid-outline'}
                  size={24}
                  color={colors.primary}
                  style={{ marginLeft: 'auto', marginRight: 12 }}
                />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        stickyHeaderIndices={[1]}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews={true}
        onScroll={e => {
          const y = e.nativeEvent.contentOffset.y;
          currentScrollY.current = y;
          if (tabBarAnimatedOpacity) {
            if (y <= 0) {
              headerTranslateY.setValue(0);
              tabBarAnimatedOpacity.setValue(1);
              lastDirection.current = null;
              searchTranslateY.setValue(80);
            } else if (y > lastScrollY.current) {
              if (lastDirection.current !== 'down') {
                Animated.timing(tabBarAnimatedOpacity, { toValue: 0.1, duration: 250, useNativeDriver: true }).start();
                lastDirection.current = 'down';
              }
              Animated.timing(headerTranslateY, { toValue: -80, duration: 250, useNativeDriver: true }).start();
              Animated.timing(searchTranslateY, { toValue: 0, duration: 250, useNativeDriver: true }).start();
            } else if (y < lastScrollY.current) {
              if (lastDirection.current !== 'up') {
                Animated.timing(tabBarAnimatedOpacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();
                lastDirection.current = 'up';
              }
              Animated.timing(headerTranslateY, { toValue: 0, duration: 250, useNativeDriver: true }).start();
              Animated.timing(searchTranslateY, { toValue: 80, duration: 250, useNativeDriver: true }).start();
            }
          }
          lastScrollY.current = y;
        }}
        onScrollEndDrag={() => {
          lastScrollY.current = 0;
          lastDirection.current = null;
        }}
        onMomentumScrollEnd={() => {
          lastScrollY.current = 0;
          lastDirection.current = null;
        }}
        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
      />
    </SafeAreaView>
  );
});
ProductListScreen.displayName = 'ProductListScreen';
export default ProductListScreen; 