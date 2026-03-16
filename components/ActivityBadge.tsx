import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../lib/colors';
import { ActivityLevel } from '../lib/types';
import { getActivityLabel } from '../lib/helpers';

const activityConfig: Record<ActivityLevel, { color: string; icon: string }> = {
  newcomer: { color: Colors.mediumGray, icon: 'boat-outline' },
  occasional: { color: Colors.oceanBlue, icon: 'boat-outline' },
  regular: { color: Colors.deepBlue, icon: 'boat' },
  active: { color: Colors.success, icon: 'boat' },
  enthusiast: { color: Colors.sunset, icon: 'boat' },
  sea_lover: { color: Colors.coral, icon: 'boat' },
};

interface ActivityBadgeProps {
  level: ActivityLevel;
  totalSessions?: number;
}

export default function ActivityBadge({ level, totalSessions }: ActivityBadgeProps) {
  const config = activityConfig[level];

  return (
    <View style={[styles.container, { backgroundColor: config.color + '15' }]}>
      <Ionicons name={config.icon as any} size={14} color={config.color} />
      <Text style={[styles.text, { color: config.color }]}>
        {getActivityLabel(level)}
        {totalSessions !== undefined ? ` (${totalSessions})` : ''}
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
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
