import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import RatingStars from '../../components/RatingStars';
import PenaltyBadge from '../../components/PenaltyBadge';
import Button from '../../components/Button';
import { formatDate, formatDateRange, getSessionStatusColor } from '../../lib/helpers';

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { sessions, skippers, vessels, charterCompanies, currentUser } = useStore();

  const session = sessions.find(s => s.id === id);
  if (!session) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="receipt-outline" size={64} color={Colors.mediumGray} />
        <Text style={styles.emptyText}>Session not found</Text>
      </View>
    );
  }

  const skipper = skippers.find(s => s.id === session.skipperId);
  const vessel = vessels.find(v => v.id === session.vesselId);
  const company = charterCompanies.find(c => c.id === session.charterCompanyId);
  const statusColor = getSessionStatusColor(session.status);
  const isCharter = currentUser?.role === 'charter';
  const canRate = isCharter && (session.status === 'active' || session.status === 'scheduled');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Status */}
      <View style={[styles.statusBar, { backgroundColor: statusColor + '15' }]}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {session.status === 'active' ? 'Session In Progress' :
           session.status === 'scheduled' ? 'Scheduled' : 'Closed'}
        </Text>
      </View>

      {/* Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Charter Details</Text>

        <DetailRow icon="calendar" label="Period" value={formatDateRange(session.startDate, session.endDate)} />
        <DetailRow icon="location" label="Location" value={session.location} />

        {skipper && (
          <DetailRow
            icon="person"
            label="Skipper"
            value={`${skipper.firstName} ${skipper.lastName}`}
            onPress={() => router.push(`/skipper/${skipper.id}`)}
          />
        )}

        {vessel && (
          <>
            <DetailRow icon="boat" label="Vessel" value={vessel.name} />
            <DetailRow icon="construct" label="Model" value={vessel.model} />
            {vessel.registrationNumber && (
              <DetailRow icon="document" label="Registration" value={vessel.registrationNumber} />
            )}
          </>
        )}

        {company && (
          <DetailRow icon="business" label="Charter Company" value={company.companyName} />
        )}
      </View>

      {/* Rating (if closed) */}
      {session.status === 'closed' && session.starRating !== undefined && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rating</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Overall</Text>
            <RatingStars rating={session.starRating} size={20} />
          </View>

          {session.friendliness !== undefined && (
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>Friendliness</Text>
              <RatingStars rating={session.friendliness} size={16} />
            </View>
          )}

          {session.penaltyPoints !== undefined && session.penaltyPoints > 0 && (
            <View style={styles.penaltyRow}>
              <Text style={styles.ratingLabel}>Penalty Points</Text>
              <View style={styles.penaltyChip}>
                <Text style={styles.penaltyText}>-{session.penaltyPoints}</Text>
              </View>
            </View>
          )}

          {session.comment && (
            <View style={styles.commentBox}>
              <Text style={styles.commentLabel}>Comment</Text>
              <Text style={styles.commentText}>{session.comment}</Text>
            </View>
          )}

          {session.closedAt && (
            <Text style={styles.closedDate}>
              Closed on {formatDate(session.closedAt)}
            </Text>
          )}
        </View>
      )}

      {/* Actions */}
      {canRate && (
        <Button
          title="Rate & Close Session"
          onPress={() => router.push(`/session/rate/${session.id}`)}
          size="large"
          icon={<Ionicons name="star" size={20} color={Colors.white} />}
        />
      )}
    </ScrollView>
  );
}

function DetailRow({ icon, label, value, onPress }: { icon: string; label: string; value: string; onPress?: () => void }) {
  const Wrapper = onPress ? require('react-native').TouchableOpacity : View;
  return (
    <Wrapper style={detailStyles.row} onPress={onPress}>
      <Ionicons name={icon as any} size={18} color={Colors.oceanBlue} />
      <View style={detailStyles.info}>
        <Text style={detailStyles.label}>{label}</Text>
        <Text style={[detailStyles.value, onPress && { color: Colors.deepBlue }]}>{value}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color={Colors.mediumGray} />}
    </Wrapper>
  );
}

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  info: { flex: 1, gap: 2 },
  label: { fontSize: 11, color: Colors.mediumGray, textTransform: 'uppercase', fontWeight: '600' },
  value: { fontSize: 15, color: Colors.charcoal, fontWeight: '500' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40, gap: 16 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 14,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    ...Shadows.small,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  penaltyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  penaltyChip: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  penaltyText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.danger,
  },
  commentBox: {
    marginTop: 12,
    backgroundColor: Colors.offWhite,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  commentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.mediumGray,
    textTransform: 'uppercase',
  },
  commentText: {
    fontSize: 14,
    color: Colors.charcoal,
    lineHeight: 20,
  },
  closedDate: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginTop: 10,
    textAlign: 'right',
  },
});
