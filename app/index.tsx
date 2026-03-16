import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../lib/store';
import { Colors } from '../lib/colors';

export default function IndexScreen() {
  const router = useRouter();
  const { currentUser, isLoading } = useStore();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (currentUser) {
        if (currentUser.role === 'charter') {
          router.replace('/(charter)/dashboard');
        } else {
          router.replace('/(skipper)/my-rating');
        }
      } else {
        router.replace('/(auth)/login');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentUser, isLoading]);

  return (
    <LinearGradient
      colors={[Colors.navy, Colors.deepBlue, Colors.oceanBlue]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="boat" size={48} color={Colors.white} />
        </View>
        <Text style={styles.title}>SkipperLog</Text>
        <Text style={styles.subtitle}>Independent Skipper Rating Platform</Text>
      </View>

      <ActivityIndicator size="large" color={Colors.white} style={styles.loader} />

      <Text style={styles.footer}>Know Your Skipper</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
  },
  loader: {
    marginTop: 48,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
