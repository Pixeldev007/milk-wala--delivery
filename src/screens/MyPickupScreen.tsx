import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { HeaderBar } from '../components/HeaderBar';
import { DayTabs, Day } from '../components/DayTabs';
import { Colors } from '../theme/colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { PICKUP_PLAN, sumDeliveredByProduct } from '../data/mock';

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

const TableRow: React.FC<{ name: string; picked: string; delivered: string; remaining: string; head?: boolean }> = ({ name, picked, delivered, remaining, head }) => (
  <View style={[styles.tableRow, head && styles.tableHead]}>
    <Text style={[styles.cell, head && styles.cellHead]}>{name}</Text>
    <Text style={[styles.cell, head && styles.cellHead]}>{picked}</Text>
    <Text style={[styles.cell, head && styles.cellHead]}>{delivered}</Text>
    <Text style={[styles.cell, head && styles.cellHead]}>{remaining}</Text>
  </View>
);

export const MyPickupScreen: React.FC = () => {
  const nav = useNavigation();
  const [selected, setSelected] = React.useState(3);
  const [notes, setNotes] = React.useState('');
  const [marked, setMarked] = React.useState(false);

  const morning = React.useMemo(() => {
    const delivered = sumDeliveredByProduct('morning');
    return {
      buffalo: { picked: PICKUP_PLAN.morning['Buffalo Milk'], delivered: delivered['Buffalo Milk'], remaining: PICKUP_PLAN.morning['Buffalo Milk'] - delivered['Buffalo Milk'] },
      cow: { picked: PICKUP_PLAN.morning['Cow Milk'], delivered: delivered['Cow Milk'], remaining: PICKUP_PLAN.morning['Cow Milk'] - delivered['Cow Milk'] },
    };
  }, []);

  const evening = React.useMemo(() => {
    const delivered = sumDeliveredByProduct('evening');
    return {
      buffalo: { picked: PICKUP_PLAN.evening['Buffalo Milk'], delivered: delivered['Buffalo Milk'], remaining: PICKUP_PLAN.evening['Buffalo Milk'] - delivered['Buffalo Milk'] },
      cow: { picked: PICKUP_PLAN.evening['Cow Milk'], delivered: delivered['Cow Milk'], remaining: PICKUP_PLAN.evening['Cow Milk'] - delivered['Cow Milk'] },
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <HeaderBar title="My Pickup" onPressMenu={() => nav.dispatch(DrawerActions.openDrawer())} />
      <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: Colors.border }}>
        <DayTabs days={buildDays()} selectedIndex={selected} onChange={setSelected} />
        <Text style={styles.dateText}>{new Date().toLocaleDateString(undefined,{ day:'2-digit', month:'long', year:'numeric'})}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <Text style={styles.sectionTitle}>Morning</Text>
        <View style={styles.table}>
          <TableRow name="PRODUCT NAME" picked="PICKED UP" delivered="DELIVERED" remaining="REMAINING" head />
          <TableRow name="BUFFALO MILK" picked={`${morning.buffalo.picked}`} delivered={`${morning.buffalo.delivered}`} remaining={`${morning.buffalo.remaining}`} />
          <TableRow name="COW MILK" picked={`${morning.cow.picked}`} delivered={`${morning.cow.delivered}`} remaining={`${morning.cow.remaining}`} />
        </View>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput value={notes} onChangeText={setNotes} style={styles.notes} multiline placeholder="Notes" placeholderTextColor={Colors.muted} />
        <TouchableOpacity style={[styles.cta, marked && { opacity: 0.7 }]} onPress={() => setMarked(true)} disabled={marked}>
          <Text style={styles.ctaText}>{marked ? 'Completed' : 'Mark Complete'}</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Evening</Text>
        <View style={styles.table}>
          <TableRow name="PRODUCT NAME" picked="PICKED UP" delivered="DELIVERED" remaining="REMAINING" head />
          <TableRow name="BUFFALO MILK" picked={`${evening.buffalo.picked}`} delivered={`${evening.buffalo.delivered}`} remaining={`${evening.buffalo.remaining}`} />
          <TableRow name="COW MILK" picked={`${evening.cow.picked}`} delivered={`${evening.cow.delivered}`} remaining={`${evening.cow.remaining}`} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: { textAlign: 'center', paddingBottom: 12, color: Colors.text, fontWeight: '600' },
  sectionTitle: { color: Colors.text, fontWeight: '700', marginBottom: 8 },
  table: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden', marginBottom: 12 },
  tableRow: { flexDirection: 'row' },
  tableHead: { backgroundColor: '#f3f4f6' },
  cell: { flex: 1, padding: 10, borderRightWidth: 1, borderColor: Colors.border, color: Colors.text },
  cellHead: { fontWeight: '700' },
  notes: { backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: 10, minHeight: 100, textAlignVertical: 'top', color: Colors.text },
  cta: { marginTop: 12, backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700' },
});
