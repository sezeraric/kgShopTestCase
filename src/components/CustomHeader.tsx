import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CartIconWithBadge from './CartIconWithBadge';
import colors from '@/styles/colors';

const CustomHeader = () => (
  <View style={styles.container}>
    <Image
      source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
      style={styles.avatar}
    />
    <Text style={styles.welcome}><Text style={{fontWeight: '700',opacity: 0.7}}>Hoş Geldin</Text> John</Text>
    <CartIconWithBadge name="cart-outline" size={25} color={colors.textSecondary} style={{position: 'absolute', right: 30, top: 20}}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    position: 'relative',
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: '#191919',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    zIndex: 1,
  },
});

export default CustomHeader; 