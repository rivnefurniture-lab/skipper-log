import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/colors';
import { useStore } from '../../lib/store';
import Button from '../../components/Button';

export default function LoginScreen() {
  const router = useRouter();
  const login = useStore(s => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const success = await login(email.trim(), password);
      if (success) {
        const { currentUser } = useStore.getState();
        if (currentUser?.role === 'charter') {
          router.replace('/(charter)/dashboard');
        } else {
          router.replace('/(skipper)/my-rating');
        }
      }
    } catch {
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoCharter = async () => {
    setLoading(true);
    await login('demo@adriaticsailing.hr', 'demo');
    router.replace('/(charter)/dashboard');
    setLoading(false);
  };

  const handleDemoSkipper = async () => {
    setLoading(true);
    await login('oleksandr@example.com', 'demo');
    router.replace('/(skipper)/my-rating');
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={[Colors.navy, Colors.deepBlue]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name="boat" size={36} color={Colors.white} />
            </View>
            <Text style={styles.title}>SkipperLog</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={18} color={Colors.mediumGray} />
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.mediumGray}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={18} color={Colors.mediumGray} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor={Colors.mediumGray}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <Button title="Sign In" onPress={handleLogin} loading={loading} size="large" />

            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>
                Don't have an account? <Text style={styles.registerBold}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>Quick Demo</Text>
            <View style={styles.demoButtons}>
              <TouchableOpacity style={styles.demoBtn} onPress={handleDemoCharter}>
                <Ionicons name="business" size={22} color={Colors.deepBlue} />
                <Text style={styles.demoBtnTitle}>Charter Company</Text>
                <Text style={styles.demoBtnSub}>Adriatic Sailing Co.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.demoBtn} onPress={handleDemoSkipper}>
                <Ionicons name="person" size={22} color={Colors.deepBlue} />
                <Text style={styles.demoBtnTitle}>Skipper</Text>
                <Text style={styles.demoBtnSub}>Oleksandr K.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  form: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    gap: 18,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.charcoal,
  },
  registerLink: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.darkGray,
  },
  registerBold: {
    fontWeight: '700',
    color: Colors.deepBlue,
  },
  demoSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  demoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  demoBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  demoBtnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  demoBtnSub: {
    fontSize: 11,
    color: Colors.darkGray,
  },
});
