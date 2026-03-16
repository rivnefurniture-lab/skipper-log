import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import Button from '../../components/Button';

export default function VesselsScreen() {
  const { getCurrentCharterCompany, vessels, addVessel } = useStore();
  const company = getCurrentCharterCompany();
  const myVessels = vessels.filter(v => v.charterCompanyId === company?.id);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [regNum, setRegNum] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !model.trim()) {
      Alert.alert('Error', 'Name and model are required');
      return;
    }
    if (!company) return;
    addVessel({
      charterCompanyId: company.id,
      name: name.trim(),
      model: model.trim(),
      registrationNumber: regNum.trim() || undefined,
    });
    setName('');
    setModel('');
    setRegNum('');
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myVessels}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.count}>{myVessels.length} vessels</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setShowForm(!showForm)}
            >
              <Ionicons name={showForm ? 'close' : 'add'} size={20} color={Colors.white} />
              <Text style={styles.addBtnText}>{showForm ? 'Cancel' : 'Add Vessel'}</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="boat" size={24} color={Colors.deepBlue} />
              <View style={styles.cardInfo}>
                <Text style={styles.vesselName}>{item.name}</Text>
                <Text style={styles.vesselModel}>{item.model}</Text>
              </View>
            </View>
            {(item.registrationNumber || item.lengthMeters) && (
              <View style={styles.detailsRow}>
                {item.registrationNumber && (
                  <Text style={styles.detail}>Reg: {item.registrationNumber}</Text>
                )}
                {item.lengthMeters && (
                  <Text style={styles.detail}>{item.lengthMeters}m</Text>
                )}
                {item.year && (
                  <Text style={styles.detail}>{item.year}</Text>
                )}
              </View>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="boat-outline" size={48} color={Colors.mediumGray} />
            <Text style={styles.emptyText}>No vessels yet</Text>
          </View>
        }
      />

      {showForm && (
        <View style={styles.formOverlay}>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Add New Vessel</Text>
            <TextInput
              style={styles.input}
              placeholder="Vessel Name"
              placeholderTextColor={Colors.mediumGray}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Model (e.g., Bavaria 46)"
              placeholderTextColor={Colors.mediumGray}
              value={model}
              onChangeText={setModel}
            />
            <TextInput
              style={styles.input}
              placeholder="Registration Number (optional)"
              placeholderTextColor={Colors.mediumGray}
              value={regNum}
              onChangeText={setRegNum}
            />
            <Button title="Add Vessel" onPress={handleAdd} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  list: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  count: {
    fontSize: 15,
    color: Colors.darkGray,
    fontWeight: '600',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.deepBlue,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    ...Shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardInfo: { flex: 1 },
  vesselName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  vesselModel: {
    fontSize: 13,
    color: Colors.darkGray,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  detail: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.mediumGray,
  },
  formOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Shadows.large,
  },
  form: {
    padding: 24,
    gap: 14,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
});
