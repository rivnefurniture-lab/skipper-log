import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import RatingStars from '../../components/RatingStars';
import PenaltyBadge from '../../components/PenaltyBadge';
import ActivityBadge from '../../components/ActivityBadge';
import SessionCard from '../../components/SessionCard';
import Button from '../../components/Button';
import { getInitials, calculateAge, formatDate } from '../../lib/helpers';

export default function SkipperProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getSkipperProfile, currentUser } = useStore();
  const profile = getSkipperProfile(id);

  if (!profile.skipper) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="person-outline" size={64} color={Colors.mediumGray} />
        <Text style={styles.emptyText}>Skipper not found</Text>
      </View>
    );
  }

  const { skipper, certificates, rating, sessions } = profile;
  const isCharter = currentUser?.role === 'charter';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.initials}>{getInitials(skipper.firstName, skipper.lastName)}</Text>
        </View>
        <Text style={styles.name}>{skipper.firstName} {skipper.lastName}</Text>
        {skipper.dateOfBirth && (
          <Text style={styles.age}>{calculateAge(skipper.dateOfBirth)} years old</Text>
        )}
        {skipper.languages.length > 0 && (
          <View style={styles.langRow}>
            {skipper.languages.map((lang, i) => (
              <View key={i} style={styles.langChip}>
                <Text style={styles.langText}>{lang}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Rating Card */}
      {rating && (
        <View style={styles.ratingCard}>
          <View style={styles.ratingRow}>
            <View style={styles.ratingCol}>
              <Text style={styles.ratingLabel}>Rating</Text>
              <RatingStars rating={rating.averageStars} size={20} />
            </View>
            <View style={styles.ratingDivider} />
            <View style={styles.ratingCol}>
              <Text style={styles.ratingLabel}>Safety</Text>
              <PenaltyBadge points={rating.totalPoints} size="medium" />
            </View>
          </View>

          <View style={styles.ratingFooter}>
            <ActivityBadge level={rating.activityLevel} totalSessions={rating.totalSessions} />
            {rating.totalPoints <= 3 && (
              <View style={styles.blacklistWarning}>
                <Ionicons name="warning" size={14} color={Colors.danger} />
                <Text style={styles.blacklistText}>High Risk</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certificates.map(cert => (
            <View key={cert.id} style={styles.certCard}>
              <Ionicons name="ribbon" size={24} color={Colors.sunset} />
              <View style={styles.certInfo}>
                <Text style={styles.certLevel}>{cert.level}</Text>
                <Text style={styles.certAssoc}>{cert.association}</Text>
                {cert.certificateNumber && (
                  <Text style={styles.certNum}>#{cert.certificateNumber}</Text>
                )}
                {cert.issuedDate && (
                  <Text style={styles.certDate}>Issued: {formatDate(cert.issuedDate)}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* QR Code */}
      <TouchableOpacity
        style={styles.qrCard}
        onPress={() => router.push(`/qr/${skipper.id}`)}
      >
        <Ionicons name="qr-code" size={24} color={Colors.deepBlue} />
        <View style={styles.qrInfo}>
          <Text style={styles.qrTitle}>Quick Access QR Code</Text>
          <Text style={styles.qrCode}>{skipper.qrCode}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.mediumGray} />
      </TouchableOpacity>

      {/* Actions for Charter Company */}
      {isCharter && (
        <Button
          title="Create New Session"
          onPress={() => router.push(`/session/create?skipperId=${skipper.id}`)}
          size="large"
          icon={<Ionicons name="add-circle" size={20} color={Colors.white} />}
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Session History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Charter History ({sessions.length})
        </Text>
        {sessions.length === 0 ? (
          <Text style={styles.noSessions}>No charter sessions recorded</Text>
        ) : (
          sessions.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              showSkipper={false}
              showCompany
            />
          ))
        )}
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
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  headerCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    ...Shadows.medium,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  initials: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: '800',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  age: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  langChip: {
    backgroundColor: Colors.skyBlue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.deepBlue,
  },
  ratingCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Shadows.small,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCol: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  ratingDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 16,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.mediumGray,
    textTransform: 'uppercase',
  },
  ratingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  blacklistWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  blacklistText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.danger,
  },
  section: {
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    ...Shadows.small,
  },
  certInfo: { flex: 1, gap: 2 },
  certLevel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  certAssoc: {
    fontSize: 13,
    color: Colors.oceanBlue,
    fontWeight: '600',
  },
  certNum: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  certDate: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  qrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    ...Shadows.small,
  },
  qrInfo: { flex: 1, gap: 2 },
  qrTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  qrCode: {
    fontSize: 13,
    color: Colors.deepBlue,
    fontWeight: '700',
    letterSpacing: 1,
  },
  noSessions: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontStyle: 'italic',
  },
});
