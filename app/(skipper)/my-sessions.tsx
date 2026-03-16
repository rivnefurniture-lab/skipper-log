import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/colors';
import { useStore } from '../../lib/store';
import SessionCard from '../../components/SessionCard';

export default function MySessionsScreen() {
  const { getSkipperForCurrentUser, getSkipperSessions } = useStore();
  const skipper = getSkipperForCurrentUser();
  const sessions = skipper ? getSkipperSessions(skipper.id) : [];

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={sessions}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <SessionCard session={item} showSkipper={false} showCompany />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={
        sessions.length > 0 ? (
          <Text style={styles.count}>{sessions.length} charter sessions</Text>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="calendar-outline" size={48} color={Colors.mediumGray} />
          <Text style={styles.emptyText}>No sessions yet</Text>
          <Text style={styles.emptySubtext}>
            Your charter sessions will appear here once a charter company creates one
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  list: { padding: 16, paddingBottom: 40 },
  count: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '600',
    marginBottom: 12,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
    paddingHorizontal: 40,
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
});
