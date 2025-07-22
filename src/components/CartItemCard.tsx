import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@/styles/colors';
import { CartItemCardProps } from '@/types';

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onIncrement, onDecrement, onRemove, onPress }) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.85} onPress={onPress}>
    <Image source={{ uri: item.thumbnail }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price} ₺</Text>
      <View style={styles.qtyRow}>
        <TouchableOpacity onPress={onDecrement} style={styles.qtyBtn}>
          <Icon name="minus" size={18} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.qtyBtn}>
          <Icon name="plus" size={18} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
          <Icon name="trash-can" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: 64, height: 64, borderRadius: 12, marginRight: 14, backgroundColor: colors.background },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  price: { fontSize: 15, color: colors.primary, fontWeight: '600', marginBottom: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { backgroundColor: colors.background, borderRadius: 8, padding: 4, marginHorizontal: 4 },
  qty: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginHorizontal: 8 },
  removeBtn: { marginLeft: 8, backgroundColor: colors.background, borderRadius: 8, padding: 4 },
});

export default CartItemCard; 