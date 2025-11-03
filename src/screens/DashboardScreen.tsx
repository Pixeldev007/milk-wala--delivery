import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBar } from '../components/HeaderBar';
import { Colors } from '../theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];
const Card: React.FC<{ icon: IconName; title: string; subtitle: string; onPress?: () => void }>
  = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardIconWrap}>
      <Ionicons name={icon} size={24} color={Colors.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={Colors.muted} />
  </TouchableOpacity>
);

export const DashboardScreen: React.FC = () => {
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <HeaderBar title="Dashboard" onPressMenu={() => nav.dispatch(DrawerActions.openDrawer())} />
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <Card icon="car" title="My Pickup" subtitle="Pickup, delivery, analysis" onPress={() => nav.navigate('MyPickup' as never)} />
        <Card icon="cart" title="My Sell" subtitle="View your daily sell" onPress={() => nav.navigate('DailySell' as never)} />
        <Card icon="pricetags" title="Daily Sell" subtitle="Make daily sell" onPress={() => nav.navigate('DailySell' as never)} />
        <Card icon="receipt" title="Create Bill" subtitle="Make customers bill, credit" onPress={() => nav.navigate('Bill' as never)} />
        <Card icon="bus" title="My Delivery" subtitle="View delivery details" onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  cardTitle: { fontWeight: '700', color: Colors.text },
  cardSub: { color: Colors.muted, marginTop: 2 },
});
