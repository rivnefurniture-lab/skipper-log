import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import RatingStars from '../../components/RatingStars';
import PenaltyBadge from '../../components/PenaltyBadge';
import ActivityBadge from '../../components/ActivityBadge';
import { getActivityLabel } from '../../lib/helpers';

export default function MyRatingScreen() {
  const { getSkipperForCurrentUser, getSkipperProfile } = useStore();
  const skipper = getSkipperForCurrentUser();

  if (!skipper) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="person-outline" size={64} color={Colors.mediumGray} />
        <Text style={styles.emptyText}>Skipper profile not found</Text>
        <Text style={styles.emptySubtext}>Your profile will appear here once linked</Text>
      </View>
    );
  }

  const profile = getSkipperProfile(skipper.id);
  const rating = profile.rating;

  if (!rating) return null;

  const closedSessions = profile.sessions.filter(s => s.status === 'closed');
  const avgFriendliness = closedSessions.length > 0
    ? closedSessions.reduce((sum, s) => sum + (s.friendliness || 0), 0) / closedSessions.filter(s => s.friendliness).length
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>
            {skipper.firstName[0]}{skipper.lastName[0]}
          </Text>
        </View>
        <Text style={styles.name}>{skipper.firstName} {skipper.lastName}</Text>
        {profile.certificates.length > 0 && (
          <Text style={styles.cert}>
            {profile.certificates[0].association} - {profile.certificates[0].level}
          </Text>
        )}
        <ActivityBadge level={rating.activityLevel} totalSessions={rating.totalSessions} />
      </View>

      {/* Rating Overview */}
      <View style={styles.ratingCard}>
        <Text style={styles.sectionTitle}>My Rating</Text>

        <View style={styles.ratingMain}>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Stars</Text>
            <RatingStars rating={rating.averageStars} size={22} />
          </View>

          <View style={styles.divider} />

          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Safety Points</Text>
            <PenaltyBadge points={rating.totalPoints} size="large" />
          </View>
        </View>

        {rating.totalPoints < 12 && (
          <View style={styles.warningBar}>
            <Ionicons name="warning" size={16} color={Colors.warning} />
            <Text style={styles.warningText}>
              {12 - rating.totalPoints} penalty points recorded
            </Text>
          </View>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Ionicons name="boat" size={22} color={Colors.oceanBlue} />
          <Text style={styles.statValue}>{rating.totalSessions}</Text>
          <Text style={styles.statLabel}>Total Charters</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="happy" size={22} color={Colors.sunset} />
          <Text style={styles.statValue}>{avgFriendliness ? avgFriendliness.toFixed(1) : '-'}</Text>
          <Text style={styles.statLabel}>Friendliness</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="trending-up" size={22} color={Colors.success} />
          <Text style={styles.statValue}>{getActivityLabel(rating.activityLevel)}</Text>
          <Text style={styles.statLabel}>Activity</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="chatbubbles" size={22} color={Colors.deepBlue} />
          <Text style={styles.statValue}>{skipper.languages.length}</Text>
          <Text style={styles.statLabel}>Languages</Text>
        </View>
      </View>

      {/* Languages */}
      {skipper.languages.length > 0 && (
        <View style={styles.langCard}>
          <Text style={styles.langTitle}>Languages</Text>
          <View style={styles.langRow}>
            {skipper.languages.map((lang, i) => (
              <View key={i} style={styles.langChip}>
                <Text style={styles.langChipText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Ionicons name="information-circle" size={16} color={Colors.oceanBlue} />
        <Text style={styles.disclaimerText}>
          Ratings are based on assessments from charter companies after each charter session.
          Contact support if you believe there is an error.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    ...Shadows.medium,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  initials: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '800',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  cert: {
    fontSize: 13,
    color: Colors.darkGray,
  },
  ratingCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Shadows.small,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 16,
  },
  ratingMain: {
    gap: 16,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  warningBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.warningLight,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  warningText: {
    fontSize: 13,
    color: Colors.darkGray,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    ...Shadows.small,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.mediumGray,
    fontWeight: '600',
  },
  langCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    ...Shadows.small,
  },
  langTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 10,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langChip: {
    backgroundColor: Colors.skyBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langChipText: {
    fontSize: 13,
    color: Colors.deepBlue,
    fontWeight: '600',
  },
  disclaimer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.skyBlue,
    borderRadius: 12,
    padding: 14,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: Colors.darkGray,
    lineHeight: 18,
  },
});
