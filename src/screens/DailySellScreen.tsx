import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HeaderBar } from '../components/HeaderBar';
import { DayTabs, Day } from '../components/DayTabs';
import { SearchInput } from '../components/SearchInput';
import { OrderRow } from '../components/OrderRow';
import { Colors } from '../theme/colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { CUSTOMERS, DAILY_ENTRIES, litersToAmount, formatINR } from '../data/mock';

const buildDays = (): Day[] => {
  const now = new Date();
  const labels = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const arr: Day[] = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    arr.push({ label: labels[d.getDay()], sub: d.getDate().toString().padStart(2, '0') });
  }
  return arr;
};

export const DailySellScreen: React.FC = () => {
  const nav = useNavigation();
  const [selected, setSelected] = React.useState(3);
  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return CUSTOMERS.filter(c => c.name.toLowerCase().includes(term));
  }, [search]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <HeaderBar title="Daily Sell" onPressMenu={() => nav.dispatch(DrawerActions.openDrawer())} />
      <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: Colors.border }}>
        <DayTabs days={buildDays()} selectedIndex={selected} onChange={setSelected} />
        <Text style={styles.dateText}>{new Date().toLocaleDateString(undefined,{ day:'2-digit', month:'long', year:'numeric'})}</Text>
      </View>
      <View style={{ height: 12 }} />
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search Customer" />
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {filtered.map((c) => {
          const entry = DAILY_ENTRIES.find(e => e.customerId === c.id);
          if (!entry) return null;
          const mLit = entry.morningLiters;
          const eLit = entry.eveningLiters;
          const rate = c.rate;
          return (
            <View key={c.id} style={{ marginBottom: 12 }}>
              <Text style={styles.sectionHeader}>{c.name}</Text>
              <View style={styles.card}>
                {mLit > 0 && (
                  <OrderRow
                    title={entry.product}
                    subtitle="Morning"
                    meta={`${mLit} Liter   •   ${formatINR(rate)}`}
                    price={formatINR(litersToAmount(entry.product, mLit))}
                  />
                )}
                {eLit > 0 && (
                  <OrderRow
                    title={entry.product}
                    subtitle="Evening"
                    meta={`${eLit} Liter   •   ${formatINR(rate)}`}
                    price={formatINR(litersToAmount(entry.product, eLit))}
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: {
    textAlign: 'center',
    paddingBottom: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  sectionHeader: { color: Colors.text, fontWeight: '700', marginHorizontal: 12, marginBottom: 8 },
  sectionHeaderMuted: { color: Colors.muted, fontWeight: '600', marginHorizontal: 12, marginTop: 12, marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 12,
  },
});
