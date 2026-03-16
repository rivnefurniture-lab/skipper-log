import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';

export default function SkipperSettings() {
  const router = useRouter();
  const { currentUser, logout, getSkipperForCurrentUser } = useStore();
  const skipper = getSkipperForCurrentUser();

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
          {skipper ? (
            <Text style={styles.initials}>{skipper.firstName[0]}{skipper.lastName[0]}</Text>
          ) : (
            <Ionicons name="person" size={32} color={Colors.white} />
          )}
        </View>
        <Text style={styles.name}>
          {skipper ? `${skipper.firstName} ${skipper.lastName}` : 'Skipper'}
        </Text>
        <Text style={styles.email}>{currentUser?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuCard}>
          <MenuItem icon="person-outline" label="Edit Profile" />
          <MenuItem icon="document-outline" label="My Certificates" />
          <MenuItem icon="notifications-outline" label="Notifications" />
          <MenuItem icon="chatbox-outline" label="Appeals" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <View style={styles.menuCard}>
          <MenuItem icon="document-text-outline" label="Terms & Conditions" />
          <MenuItem icon="shield-outline" label="Privacy Policy" />
          <MenuItem icon="help-circle-outline" label="Help & Support" />
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
    <TouchableOpacity style={menuStyles.item}>
      <Ionicons name={icon as any} size={20} color={Colors.deepBlue} />
      <Text style={menuStyles.label}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.mediumGray} />
    </TouchableOpacity>
  );
}

const menuStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: Colors.charcoal,
  },
});

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
  initials: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  email: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 4,
  },
  section: { marginBottom: 24 },
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
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: Colors.dangerLight,
    borderRadius: 14,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.danger,
  },
});
