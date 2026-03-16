import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/colors';
import { useStore } from '../../lib/store';
import SkipperCard from '../../components/SkipperCard';

export default function SearchSkippers() {
  const [query, setQuery] = useState('');
  const searchSkippers = useStore(s => s.searchSkippers);
  const allSkippers = useStore(s => s.skippers);
  const skipperRatings = useStore(s => s.skipperRatings);
  const certificates = useStore(s => s.certificates);

  const results = query.trim().length >= 2
    ? searchSkippers(query)
    : allSkippers.map(s => ({
        ...s,
        rating: skipperRatings.find(r => r.skipperId === s.id),
        certificate: certificates.find(c => c.skipperId === s.id),
      }));

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={Colors.mediumGray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, QR code..."
          placeholderTextColor={Colors.mediumGray}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={Colors.mediumGray}
            onPress={() => setQuery('')}
          />
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkipperCard
            skipper={item}
            rating={item.rating}
            certificate={item.certificate}
          />
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={Colors.mediumGray} />
            <Text style={styles.emptyText}>
              {query.length >= 2 ? 'No skippers found' : 'Enter at least 2 characters'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    margin: 16,
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.charcoal,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.mediumGray,
  },
});
