import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import CartIconWithBadge from './CartIconWithBadge';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: 'cart' | string;
  onRightPress?: () => void;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightIcon,
  onRightPress,
  avatarUrl,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.card }}>
      <View style={styles.container}>
        {onBack ? (
          <TouchableOpacity style={styles.left} onPress={onBack}>
            <Icon name="arrow-left" size={26} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.left} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : rightIcon === 'cart' ? (
          <TouchableOpacity style={styles.right} onPress={onRightPress}>
            <CartIconWithBadge
              name="cart-outline"
              size={25}
              color={colors.textSecondary}
              style={{}}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity style={styles.right} onPress={onRightPress}>
            <Icon name={rightIcon} size={26} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.right} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    paddingBottom: 12,
    borderBottomWidth: 0,
    minHeight: 60,
    zIndex: 100,
  },
  left: { width: 36, alignItems: 'flex-start', justifyContent: 'center' },
  right: { width: 36, alignItems: 'flex-end', justifyContent: 'center' },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.2,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
  },
});

export default Header;
