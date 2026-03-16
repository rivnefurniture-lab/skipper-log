import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../lib/colors';
import { getPointsColor } from '../lib/helpers';

interface PenaltyBadgeProps {
  points: number;
  maxPoints?: number;
  size?: 'small' | 'medium' | 'large';
}

export default function PenaltyBadge({ points, maxPoints = 12, size = 'medium' }: PenaltyBadgeProps) {
  const color = getPointsColor(points);
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <View style={[styles.container, { backgroundColor: color + '15' }]}>
      <Ionicons
        name="shield-checkmark"
        size={isSmall ? 14 : isLarge ? 24 : 18}
        color={color}
      />
      <Text style={[
        styles.text,
        { color },
        isSmall && styles.textSmall,
        isLarge && styles.textLarge,
      ]}>
        {points}/{maxPoints}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
  textSmall: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 18,
  },
});
