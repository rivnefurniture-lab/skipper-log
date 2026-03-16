import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import SessionCard from '../../components/SessionCard';

export default function CharterDashboard() {
  const router = useRouter();
  const { getCurrentCharterCompany, getCompanySessions } = useStore();
  const company = getCurrentCharterCompany();
  const sessions = company ? getCompanySessions(company.id) : [];

  const activeSessions = sessions.filter(s => s.status === 'active');
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled');
  const recentClosed = sessions.filter(s => s.status === 'closed').slice(0, 5);

  const totalSkippers = new Set(sessions.map(s => s.skipperId)).size;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome */}
      <Text style={styles.welcome}>
        {company?.companyName || 'Charter Company'}
      </Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: Colors.successLight }]}>
          <Ionicons name="radio-button-on" size={20} color={Colors.success} />
          <Text style={[styles.statNumber, { color: Colors.success }]}>{activeSessions.length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: Colors.skyBlue }]}>
          <Ionicons name="calendar" size={20} color={Colors.oceanBlue} />
          <Text style={[styles.statNumber, { color: Colors.oceanBlue }]}>{scheduledSessions.length}</Text>
          <Text style={styles.statLabel}>Scheduled</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: Colors.warningLight }]}>
          <Ionicons name="people" size={20} color={Colors.sunset} />
          <Text style={[styles.statNumber, { color: Colors.sunset }]}>{totalSkippers}</Text>
          <Text style={styles.statLabel}>Skippers</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: Colors.offWhite }]}>
          <Ionicons name="receipt" size={20} color={Colors.darkGray} />
          <Text style={[styles.statNumber, { color: Colors.darkGray }]}>{sessions.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/session/create')}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.deepBlue }]}>
            <Ionicons name="add" size={22} color={Colors.white} />
          </View>
          <Text style={styles.actionText}>New Session</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/(charter)/search')}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.oceanBlue }]}>
            <Ionicons name="search" size={22} color={Colors.white} />
          </View>
          <Text style={styles.actionText}>Find Skipper</Text>
        </TouchableOpacity>
      </View>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Sessions</Text>
          {activeSessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </View>
      )}

      {/* Scheduled */}
      {scheduledSessions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {scheduledSessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </View>
      )}

      {/* Recent */}
      {recentClosed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Charters</Text>
          {recentClosed.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  welcome: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.darkGray,
    textTransform: 'uppercase',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Shadows.small,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  section: {
    marginBottom: 24,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 4,
  },
});
