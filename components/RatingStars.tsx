import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../lib/colors';
import { getStarsColor } from '../lib/helpers';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function RatingStars({
  rating,
  size = 18,
  showValue = true,
  interactive = false,
  onRate,
}: RatingStarsProps) {
  const color = getStarsColor(rating);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <TouchableOpacity
        key={`full-${i}`}
        disabled={!interactive}
        onPress={() => onRate?.(i + 1)}
      >
        <Ionicons name="star" size={size} color={color} />
      </TouchableOpacity>
    );
  }
  if (hasHalf) {
    stars.push(
      <TouchableOpacity
        key="half"
        disabled={!interactive}
        onPress={() => onRate?.(fullStars + 0.5)}
      >
        <Ionicons name="star-half" size={size} color={color} />
      </TouchableOpacity>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <TouchableOpacity
        key={`empty-${i}`}
        disabled={!interactive}
        onPress={() => onRate?.(fullStars + (hasHalf ? 1 : 0) + i + 1)}
      >
        <Ionicons name="star-outline" size={size} color={Colors.mediumGray} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      {showValue && (
        <Text style={[styles.value, { color }]}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
  },
});
