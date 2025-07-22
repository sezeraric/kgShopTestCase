import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import colors from '@/styles/colors';

const CartIconWithBadge = ({name, size, color, style}: {name: string, size: number, color: string, style: any}) => {
  const navigation = useNavigation();
  const totalCount = useSelector((state: any) => state.cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0));

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => navigation.navigate('Cart' as never)}>
      <Icon name={name} size={size} color={color} />
      {totalCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: colors.text,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CartIconWithBadge; 