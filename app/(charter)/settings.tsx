import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';

export default function CharterSettings() {
  const router = useRouter();
  const { currentUser, logout, getCurrentCharterCompany } = useStore();
  const company = getCurrentCharterCompany();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="business" size={32} color={Colors.white} />
        </View>
        <Text style={styles.companyName}>{company?.companyName || 'Charter Company'}</Text>
        <Text style={styles.email}>{currentUser?.email}</Text>
        {company?.country && (
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={Colors.oceanBlue} />
            <Text style={styles.location}>
              {company.region ? `${company.region}, ` : ''}{company.country}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuCard}>
          <MenuItem icon="person-outline" label="Edit Profile" />
          <MenuItem icon="notifications-outline" label="Notifications" />
          <MenuItem icon="document-text-outline" label="Terms & Privacy" />
          <MenuItem icon="help-circle-outline" label="Help & Support" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About SkipperLog</Text>
          <Text style={styles.infoText}>
            Independent skipper rating platform. Charter companies use this platform
            to verify skipper ratings and maintain session logs.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ icon, label }: { icon: string; label: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={icon as any} size={20} color={Colors.deepBlue} />
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.mediumGray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    ...Shadows.medium,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  email: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  location: {
    fontSize: 13,
    color: Colors.oceanBlue,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.mediumGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    overflow: 'hidden',
    ...Shadows.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.charcoal,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    ...Shadows.small,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 20,
  },
  version: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginTop: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: Colors.dangerLight,
    borderRadius: 14,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.danger,
  },
});
