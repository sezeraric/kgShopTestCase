import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import EmptyCartShowcase from '../components/EmptyCartShowcase';
import Stepper from '../components/Stepper';
import CartItemCard from '../components/CartItemCard';
import StickyButton from '../components/StickyButton';
import colors from '../styles/colors';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cartSlice';

const steps = ['Sepet', 'Adres', 'Ödeme'];

const CartScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.items);
  const products = useSelector((state: any) => state.product.products);
  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <>
        <Header
          title="Sepet"
          rightIcon="cart"
          onRightPress={() => navigation.navigate('Cart')}
        />
        <EmptyCartShowcase
          products={products.slice(0, 8)}
          onBrowse={() => navigation.navigate('Home')}
        />
      </>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Sepet"
        rightIcon="cart"
        onRightPress={() => navigation.navigate('Cart')}
      />
      <Stepper steps={steps} currentStep={0} />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onIncrement={() => dispatch(incrementQuantity(item.id))}
            onDecrement={() => dispatch(decrementQuantity(item.id))}
            onRemove={() => dispatch(removeFromCart(item.id))}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalBar}>
            <Text style={styles.totalText}>Toplam: {total.toFixed(2)} ₺</Text>

      </View>
      <StickyButton label="Alışverişi Tamamla" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: { paddingBottom: 120 },
  totalBar: {height: 140, backgroundColor: colors.card, borderRadius: 16, margin: 16, padding: 16, alignItems: 'flex-start', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  totalText: { fontSize: 20, fontWeight: 'bold', color: colors.text},
});

export default CartScreen; 