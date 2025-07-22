import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ToastProps } from '@/types';

const { width } = Dimensions.get('window');

const CustomToast: React.FC<ToastProps> = ({ text1, text2 }) => (
  <View style={styles.container}>
    <Icon name="check-circle" size={28} color="#A3C76D" style={styles.icon} />
    <View style={styles.texts}>
      {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
      {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 22,
    minWidth: width * 0.8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  icon: {
    marginRight: 16,
  },
  texts: {
    flex: 1,
  },
  text1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
  },
  text2: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.85,
  },
});

export default CustomToast; 