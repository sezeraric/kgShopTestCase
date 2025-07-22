import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import colors from '@/styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '@/components/Header';

const addresses = [
  { id: 'home', label: 'Home', detail: '675) 878-785\nSadia Villa, Habiganj' },
  { id: 'office', label: 'Office', detail: '277) 555-0113\n639 Elgin st, Habiganj' },
];

const paymentMethods = [
  { id: 'credit', label: 'Credit card', icon: 'credit-card' },
  { id: 'paypal', label: 'Paypal', icon: 'paypal' },
  { id: 'google', label: 'Google pay', icon: 'google' },
  { id: 'apple', label: 'Apple', icon: 'apple' },
];

const CheckoutScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const total = 62.00;

  return (
    <View style={styles.container}>
      <Header title="Checkout" onBack={() => {  }} />
      <Text style={styles.title}>Shipping to</Text>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.addressBox, selectedAddress === item.id && styles.selectedBox]}
            onPress={() => setSelectedAddress(item.id)}
            activeOpacity={0.8}
          >
            <Icon name={item.id === 'home' ? 'home' : 'office-building'} size={22} color={colors.primary} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.addressLabel}>{item.label}</Text>
              <Text style={styles.addressDetail}>{item.detail}</Text>
            </View>
            {selectedAddress === item.id && <Icon name="check-circle" size={22} color={colors.primary} style={{ marginLeft: 'auto' }} />}
          </TouchableOpacity>
        )}
        style={{ marginBottom: 18 }}
      />
      <Text style={styles.title}>Payment Method</Text>
      <View style={styles.paymentRow}>
        {paymentMethods.map(pm => (
          <TouchableOpacity
            key={pm.id}
            style={[styles.paymentBox, selectedPayment === pm.id && styles.selectedBox]}
            onPress={() => setSelectedPayment(pm.id)}
            activeOpacity={0.8}
          >
            <Icon name={pm.icon} size={22} color={colors.primary} />
            <Text style={styles.paymentLabel}>{pm.label}</Text>
            {selectedPayment === pm.id && <Icon name="check-circle" size={18} color={colors.primary} style={{ marginLeft: 6 }} />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.totalBar}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.orderBtn} onPress={() => {/* Siparişi tamamla işlemi */}}>
          <Text style={styles.orderBtnText}>Place to Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  addressLabel: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  addressDetail: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  paymentBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  paymentLabel: { fontSize: 14, color: colors.text, marginLeft: 8 },
  totalBar: { backgroundColor: colors.card, borderRadius: 18, padding: 18, marginTop: 24, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  totalLabel: { fontSize: 16, color: colors.textSecondary },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  orderBtn: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, marginTop: 10, alignItems: 'center' },
  orderBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default CheckoutScreen; 