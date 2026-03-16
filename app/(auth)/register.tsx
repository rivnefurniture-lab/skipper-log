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
import { UserRole } from '../../lib/types';
import Button from '../../components/Button';

export default function RegisterScreen() {
  const router = useRouter();
  const register = useStore(s => s.register);
  const [role, setRole] = useState<UserRole>('charter');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [languages, setLanguages] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const extra: Record<string, string> = role === 'charter'
        ? { companyName: companyName.trim(), country: country.trim() }
        : { firstName: firstName.trim(), lastName: lastName.trim(), languages: languages.trim() };

      const success = await register(email.trim(), password, role, extra);
      if (success) {
        if (role === 'charter') {
          router.replace('/(charter)/dashboard');
        } else {
          router.replace('/(skipper)/my-rating');
        }
      }
    } catch {
      Alert.alert('Error', 'Registration failed');
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join the SkipperLog platform</Text>
          </View>

          {/* Role selector */}
          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'charter' && styles.roleBtnActive]}
              onPress={() => setRole('charter')}
            >
              <Ionicons
                name="business"
                size={22}
                color={role === 'charter' ? Colors.white : Colors.mediumGray}
              />
              <Text style={[styles.roleBtnText, role === 'charter' && styles.roleBtnTextActive]}>
                Charter Company
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'skipper' && styles.roleBtnActive]}
              onPress={() => setRole('skipper')}
            >
              <Ionicons
                name="person"
                size={22}
                color={role === 'skipper' ? Colors.white : Colors.mediumGray}
              />
              <Text style={[styles.roleBtnText, role === 'skipper' && styles.roleBtnTextActive]}>
                Skipper
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={Colors.mediumGray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create password"
                placeholderTextColor={Colors.mediumGray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {role === 'charter' ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Charter Company"
                    placeholderTextColor={Colors.mediumGray}
                    value={companyName}
                    onChangeText={setCompanyName}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Country</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Croatia, Greece, etc."
                    placeholderTextColor={Colors.mediumGray}
                    value={country}
                    onChangeText={setCountry}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.flex]}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="First"
                      placeholderTextColor={Colors.mediumGray}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                  <View style={[styles.inputGroup, styles.flex]}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Last"
                      placeholderTextColor={Colors.mediumGray}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Languages</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="English, Croatian, ..."
                    placeholderTextColor={Colors.mediumGray}
                    value={languages}
                    onChangeText={setLanguages}
                  />
                </View>
              </>
            )}

            <View style={styles.disclaimer}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.darkGray} />
              <Text style={styles.disclaimerText}>
                By registering, you agree to the processing and storage of your data. The platform
                is an instrument for collecting subjective user assessments.
              </Text>
            </View>

            <Button title="Create Account" onPress={handleRegister} loading={loading} size="large" />

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backLink}>Already have an account? Sign In</Text>
            </TouchableOpacity>
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
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  roleBtnActive: {
    backgroundColor: Colors.oceanBlue,
    borderColor: Colors.oceanBlue,
  },
  roleBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.mediumGray,
  },
  roleBtnTextActive: {
    color: Colors.white,
  },
  form: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  input: {
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
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
  backLink: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.deepBlue,
    fontWeight: '600',
  },
});
