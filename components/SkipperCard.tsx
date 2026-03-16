import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../lib/colors';
import { Skipper, SkipperRating, Certificate } from '../lib/types';
import { getInitials, calculateAge } from '../lib/helpers';
import RatingStars from './RatingStars';
import PenaltyBadge from './PenaltyBadge';
import ActivityBadge from './ActivityBadge';

interface SkipperCardProps {
  skipper: Skipper;
  rating?: SkipperRating;
  certificate?: Certificate;
  compact?: boolean;
}

export default function SkipperCard({ skipper, rating, certificate, compact = false }: SkipperCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      activeOpacity={0.7}
      onPress={() => router.push(`/skipper/${skipper.id}`)}
    >
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>
            {getInitials(skipper.firstName, skipper.lastName)}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>
            {skipper.firstName} {skipper.lastName}
          </Text>
          <View style={styles.metaRow}>
            {skipper.dateOfBirth && (
              <Text style={styles.meta}>
                {calculateAge(skipper.dateOfBirth)} y.o.
              </Text>
            )}
            {certificate && (
              <Text style={styles.meta}>
                {certificate.association} - {certificate.level}
              </Text>
            )}
          </View>
          {skipper.languages.length > 0 && (
            <Text style={styles.languages} numberOfLines={1}>
              <Ionicons name="chatbubble-outline" size={11} color={Colors.mediumGray} />
              {' '}{skipper.languages.join(', ')}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color={Colors.mediumGray} />
      </View>

      {rating && !compact && (
        <View style={styles.ratingRow}>
          <RatingStars rating={rating.averageStars} size={14} />
          <PenaltyBadge points={rating.totalPoints} size="small" />
          <ActivityBadge level={rating.activityLevel} totalSessions={rating.totalSessions} />
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
    ...Shadows.small,
  },
  cardCompact: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  languages: {
    fontSize: 11,
    color: Colors.mediumGray,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    flexWrap: 'wrap',
  },
});
