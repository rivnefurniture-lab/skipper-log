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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../../lib/colors';
import { useStore } from '../../../lib/store';
import RatingStars from '../../../components/RatingStars';
import Button from '../../../components/Button';

export default function RateSessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { sessions, skippers, vessels, closeSession } = useStore();

  const session = sessions.find(s => s.id === id);
  const skipper = session ? skippers.find(s => s.id === session.skipperId) : null;
  const vessel = session ? vessels.find(v => v.id === session.vesselId) : null;

  const [starRating, setStarRating] = useState(5);
  const [penaltyPoints, setPenaltyPoints] = useState(0);
  const [friendliness, setFriendliness] = useState(5);
  const [comment, setComment] = useState('');

  if (!session || !skipper) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Session not found</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    Alert.alert(
      'Confirm & Close Session',
      `Rate ${skipper.firstName} ${skipper.lastName}:\n\nStars: ${starRating}/5\nPenalty: -${penaltyPoints} pts\nFriendliness: ${friendliness}/5\n\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            closeSession(session.id, {
              starRating,
              penaltyPoints,
              friendliness,
              comment: comment.trim() || undefined,
            });
            Alert.alert('Done', 'Session closed and rating submitted', [
              { text: 'OK', onPress: () => router.dismiss(2) },
            ]);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {/* Session Info */}
      <View style={styles.infoCard}>
        <Text style={styles.skipperName}>{skipper.firstName} {skipper.lastName}</Text>
        {vessel && <Text style={styles.vesselText}>{vessel.name} - {vessel.model}</Text>}
        <Text style={styles.locationText}>{session.location}</Text>
      </View>

      {/* Star Rating */}
      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Overall Rating</Text>
        <Text style={styles.sectionDesc}>
          How was the skipper overall? Professionalism, boat handling, communication.
        </Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setStarRating(star)}>
              <Ionicons
                name={star <= starRating ? 'star' : 'star-outline'}
                size={40}
                color={star <= starRating ? Colors.sunset : Colors.lightGray}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingValue}>{starRating}.0</Text>
      </View>

      {/* Friendliness */}
      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Friendliness</Text>
        <Text style={styles.sectionDesc}>
          Communication, friendliness, problem-solving attitude.
        </Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setFriendliness(star)}>
              <Ionicons
                name={star <= friendliness ? 'happy' : 'happy-outline'}
                size={36}
                color={star <= friendliness ? Colors.oceanBlue : Colors.lightGray}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Penalty Points */}
      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Penalty Points</Text>
        <Text style={styles.sectionDesc}>
          Deduct points for violations or damage. 0 = no issues.
        </Text>
        <View style={styles.penaltyRow}>
          {[0, 1, 2, 3, 4, 5].map(pts => (
            <TouchableOpacity
              key={pts}
              style={[
                styles.penaltyBtn,
                penaltyPoints === pts && styles.penaltyBtnActive,
                pts > 0 && penaltyPoints === pts && { backgroundColor: Colors.danger },
              ]}
              onPress={() => setPenaltyPoints(pts)}
            >
              <Text style={[
                styles.penaltyBtnText,
                penaltyPoints === pts && styles.penaltyBtnTextActive,
              ]}>
                {pts === 0 ? 'None' : `-${pts}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {penaltyPoints > 2 && (
          <View style={styles.warningBox}>
            <Ionicons name="warning" size={16} color={Colors.danger} />
            <Text style={styles.warningText}>
              Heavy penalty ({penaltyPoints} points). Please provide detailed explanation below.
            </Text>
          </View>
        )}
      </View>

      {/* Comment */}
      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Comment {penaltyPoints > 0 && '(Required)'}</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Add notes about this charter session..."
          placeholderTextColor={Colors.mediumGray}
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Ionicons name="lock-closed" size={14} color={Colors.oceanBlue} />
        <Text style={styles.disclaimerText}>
          Ratings cannot be edited after submission. The skipper will be able to view this rating.
        </Text>
      </View>

      <Button
        title="Confirm & Close Session"
        onPress={handleSubmit}
        size="large"
        icon={<Ionicons name="checkmark-done" size={20} color={Colors.white} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40, gap: 16 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  infoCard: {
    backgroundColor: Colors.deepBlue,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  skipperName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
  },
  vesselText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  locationText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  ratingSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    gap: 10,
    ...Shadows.small,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  sectionDesc: {
    fontSize: 13,
    color: Colors.darkGray,
    lineHeight: 18,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  ratingValue: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: Colors.sunset,
  },
  penaltyRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  penaltyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.offWhite,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
  },
  penaltyBtnActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  penaltyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.darkGray,
  },
  penaltyBtnTextActive: {
    color: Colors.white,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.dangerLight,
    borderRadius: 10,
    padding: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: Colors.danger,
    lineHeight: 16,
  },
  commentInput: {
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: Colors.charcoal,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  disclaimer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.skyBlue,
    borderRadius: 10,
    padding: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: Colors.darkGray,
    lineHeight: 16,
  },
});
