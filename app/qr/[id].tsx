import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import Button from '../../components/Button';

export default function QRScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { skippers, skipperRatings } = useStore();
  const skipper = skippers.find(s => s.id === id);
  const rating = skipperRatings.find(r => r.skipperId === id);

  if (!skipper) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Skipper not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `SkipperLog: ${skipper.firstName} ${skipper.lastName}\nRating: ${rating?.averageStars || 'N/A'}/5 | Points: ${rating?.totalPoints || 'N/A'}/12\nQR: ${skipper.qrCode}`,
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.qrWrap}>
          <QRCode
            value={`skipperlog://${skipper.qrCode}`}
            size={240}
            color={Colors.navy}
            backgroundColor={Colors.white}
          />
        </View>

        <Text style={styles.name}>{skipper.firstName} {skipper.lastName}</Text>

        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>ID:</Text>
          <Text style={styles.code}>{skipper.qrCode}</Text>
        </View>

        {rating && (
          <View style={styles.ratingRow}>
            <View style={styles.ratingItem}>
              <Ionicons name="star" size={16} color={Colors.sunset} />
              <Text style={styles.ratingText}>{rating.averageStars}/5</Text>
            </View>
            <View style={styles.ratingItem}>
              <Ionicons name="shield-checkmark" size={16} color={Colors.success} />
              <Text style={styles.ratingText}>{rating.totalPoints}/12</Text>
            </View>
            <View style={styles.ratingItem}>
              <Ionicons name="boat" size={16} color={Colors.oceanBlue} />
              <Text style={styles.ratingText}>{rating.totalSessions} charters</Text>
            </View>
          </View>
        )}

        <Button
          title="Share"
          onPress={handleShare}
          variant="outline"
          icon={<Ionicons name="share-outline" size={18} color={Colors.deepBlue} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: 24,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    gap: 18,
    ...Shadows.large,
  },
  qrWrap: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontWeight: '600',
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.deepBlue,
    letterSpacing: 1.5,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 20,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.charcoal,
  },
});
