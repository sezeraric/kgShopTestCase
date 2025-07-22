import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabContainer({ scrollToTopSignal, tabBarAnimatedOpacity, setScrollToTopSignal }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderRadius: 2,
          height: 80,      
          margin: 0,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.10,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        },
        tabBarIcon: ({ focused }) => {
          let iconName = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Cart') iconName = 'basket-outline';
          return (
           
              <Icon
                name={iconName}
                size={32}
                color={focused ? '#000' : '#bdbdbd'}
                style={{
                  top: 14,
                }}
              />
            
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={(props: any) => (
          <ProductListScreen
            {...props}
            scrollToTopSignal={scrollToTopSignal}
            tabBarAnimatedOpacity={tabBarAnimatedOpacity}
          />
        )}
        listeners={{
          tabPress: () => {
            setScrollToTopSignal((s: number) => s + 1);
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                size={32}
                color={focused ? '#000' : '#bdbdbd'}
                style={{
                  top: 14,
                }}
              />
          ),
        }}
      />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [scrollToTopSignal, setScrollToTopSignal] = useState(0);
  const tabBarAnimatedOpacity = useRef(new Animated.Value(1)).current;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="TabContainer"
          children={() => (
            <TabContainer
              scrollToTopSignal={scrollToTopSignal}
              tabBarAnimatedOpacity={tabBarAnimatedOpacity}
              setScrollToTopSignal={setScrollToTopSignal}
            />
          )}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}