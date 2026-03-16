import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import Button from '../../components/Button';

export default function CreateSessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ skipperId?: string }>();
  const { skippers, vessels, getCurrentCharterCompany, createSession } = useStore();
  const company = getCurrentCharterCompany();
  const myVessels = vessels.filter(v => v.charterCompanyId === company?.id);

  const [selectedSkipperId, setSelectedSkipperId] = useState(params.skipperId || '');
  const [selectedVesselId, setSelectedVesselId] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [skipperSearch, setSkipperSearch] = useState('');

  const selectedSkipper = skippers.find(s => s.id === selectedSkipperId);
  const filteredSkippers = skipperSearch.length >= 2
    ? skippers.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(skipperSearch.toLowerCase())
      )
    : [];

  const handleCreate = () => {
    if (!selectedSkipperId || !selectedVesselId || !location || !startDate || !endDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!company) return;

    createSession({
      skipperId: selectedSkipperId,
      charterCompanyId: company.id,
      vesselId: selectedVesselId,
      startDate,
      endDate,
      location,
    });

    Alert.alert('Success', 'Charter session created', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {/* Skipper Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skipper</Text>
        {selectedSkipper ? (
          <View style={styles.selectedCard}>
            <View style={styles.avatar}>
              <Text style={styles.initials}>
                {selectedSkipper.firstName[0]}{selectedSkipper.lastName[0]}
              </Text>
            </View>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedName}>
                {selectedSkipper.firstName} {selectedSkipper.lastName}
              </Text>
              <Text style={styles.selectedMeta}>{selectedSkipper.qrCode}</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedSkipperId(''); setSkipperSearch(''); }}>
              <Ionicons name="close-circle" size={24} color={Colors.mediumGray} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Search skipper by name..."
              placeholderTextColor={Colors.mediumGray}
              value={skipperSearch}
              onChangeText={setSkipperSearch}
              autoCorrect={false}
            />
            {filteredSkippers.length > 0 && (
              <View style={styles.dropdown}>
                {filteredSkippers.slice(0, 5).map(s => (
                  <TouchableOpacity
                    key={s.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedSkipperId(s.id);
                      setSkipperSearch('');
                    }}
                  >
                    <Text style={styles.dropdownText}>
                      {s.firstName} {s.lastName}
                    </Text>
                    <Text style={styles.dropdownCode}>{s.qrCode}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Vessel Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vessel</Text>
        {myVessels.length === 0 ? (
          <Text style={styles.hint}>Add vessels in Fleet tab first</Text>
        ) : (
          <View style={styles.vesselGrid}>
            {myVessels.map(v => (
              <TouchableOpacity
                key={v.id}
                style={[
                  styles.vesselCard,
                  selectedVesselId === v.id && styles.vesselCardActive,
                ]}
                onPress={() => setSelectedVesselId(v.id)}
              >
                <Ionicons
                  name="boat"
                  size={18}
                  color={selectedVesselId === v.id ? Colors.white : Colors.deepBlue}
                />
                <Text style={[
                  styles.vesselName,
                  selectedVesselId === v.id && styles.vesselNameActive,
                ]}>
                  {v.name}
                </Text>
                <Text style={[
                  styles.vesselModel,
                  selectedVesselId === v.id && styles.vesselModelActive,
                ]}>
                  {v.model}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Split, Croatia"
          placeholderTextColor={Colors.mediumGray}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Dates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dates</Text>
        <View style={styles.dateRow}>
          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>Start (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="2026-04-01"
              placeholderTextColor={Colors.mediumGray}
              value={startDate}
              onChangeText={setStartDate}
            />
          </View>
          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>End (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="2026-04-08"
              placeholderTextColor={Colors.mediumGray}
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
        </View>
      </View>

      <Button
        title="Create Session"
        onPress={handleCreate}
        size="large"
        icon={<Ionicons name="checkmark-circle" size={20} color={Colors.white} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40, gap: 8 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 2,
    borderColor: Colors.oceanBlue,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  selectedInfo: { flex: 1 },
  selectedName: { fontSize: 15, fontWeight: '700', color: Colors.charcoal },
  selectedMeta: { fontSize: 12, color: Colors.mediumGray },
  dropdown: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginTop: 4,
    ...Shadows.medium,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  dropdownText: { fontSize: 15, color: Colors.charcoal },
  dropdownCode: { fontSize: 12, color: Colors.mediumGray },
  vesselGrid: { gap: 8 },
  vesselCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
  },
  vesselCardActive: {
    backgroundColor: Colors.deepBlue,
    borderColor: Colors.deepBlue,
  },
  vesselName: { fontSize: 14, fontWeight: '700', color: Colors.charcoal },
  vesselNameActive: { color: Colors.white },
  vesselModel: { fontSize: 12, color: Colors.darkGray, marginLeft: 'auto' },
  vesselModelActive: { color: 'rgba(255,255,255,0.7)' },
  dateRow: { flexDirection: 'row', gap: 12 },
  dateInput: { flex: 1, gap: 4 },
  dateLabel: { fontSize: 12, color: Colors.darkGray },
  hint: { fontSize: 13, color: Colors.mediumGray, fontStyle: 'italic' },
});
