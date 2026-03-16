import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../lib/colors';
import { Session, Skipper, Vessel, CharterCompany } from '../lib/types';
import { formatDateRange, getSessionStatusColor } from '../lib/helpers';
import RatingStars from './RatingStars';

interface SessionCardProps {
  session: Session & { skipper?: Skipper; vessel?: Vessel; charterCompany?: CharterCompany };
  showSkipper?: boolean;
  showCompany?: boolean;
}

export default function SessionCard({ session, showSkipper = true, showCompany = false }: SessionCardProps) {
  const router = useRouter();
  const statusColor = getSessionStatusColor(session.status);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => router.push(`/session/${session.id}`)}
    >
      <View style={styles.header}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.status, { color: statusColor }]}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </Text>
        <Text style={styles.dates}>{formatDateRange(session.startDate, session.endDate)}</Text>
      </View>

      {showSkipper && session.skipper && (
        <View style={styles.infoRow}>
          <Ionicons name="person" size={14} color={Colors.deepBlue} />
          <Text style={styles.infoText}>
            {session.skipper.firstName} {session.skipper.lastName}
          </Text>
        </View>
      )}

      {showCompany && session.charterCompany && (
        <View style={styles.infoRow}>
          <Ionicons name="business" size={14} color={Colors.deepBlue} />
          <Text style={styles.infoText}>{session.charterCompany.companyName}</Text>
        </View>
      )}

      <View style={styles.infoRow}>
        <Ionicons name="boat" size={14} color={Colors.oceanBlue} />
        <Text style={styles.infoText}>
          {session.vessel ? `${session.vessel.name} (${session.vessel.model})` : 'Vessel'}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location" size={14} color={Colors.coral} />
        <Text style={styles.infoText}>{session.location}</Text>
      </View>

      {session.status === 'closed' && session.starRating !== undefined && (
        <View style={styles.ratingRow}>
          <RatingStars rating={session.starRating} size={14} />
          {session.penaltyPoints !== undefined && session.penaltyPoints > 0 && (
            <View style={styles.penaltyChip}>
              <Text style={styles.penaltyText}>-{session.penaltyPoints} pts</Text>
            </View>
          )}
        </View>
      )}

      {session.status === 'active' && (
        <View style={styles.activeBar}>
          <Ionicons name="radio-button-on" size={12} color={Colors.success} />
          <Text style={styles.activeText}>Session in progress</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    gap: 6,
    ...Shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dates: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 'auto',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.charcoal,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  penaltyChip: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  penaltyText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.danger,
  },
  activeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
  },
});
