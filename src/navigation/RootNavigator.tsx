import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DailySellScreen } from '../screens/DailySellScreen';
import { BulkSellScreen } from '../screens/BulkSellScreen';
import { MyPickupScreen } from '../screens/MyPickupScreen';
import { DrawerContent } from '../screens/DrawerContent';
import { Colors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: '#fff',
    text: '#111827',
    border: Colors.border,
    notification: Colors.primary,
  },
};

function DrawerRoot() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(p) => <DrawerContent {...p} /> }>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="DailySell" component={DailySellScreen} />
      <Drawer.Screen name="BulkSell" component={BulkSellScreen} />
      <Drawer.Screen name="MyPickup" component={MyPickupScreen} />
    </Drawer.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerRoot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
