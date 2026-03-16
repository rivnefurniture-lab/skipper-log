import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../lib/colors';
import { useStore } from '../../lib/store';
import Button from '../../components/Button';

export default function MyQRScreen() {
  const { getSkipperForCurrentUser } = useStore();
  const skipper = getSkipperForCurrentUser();

  if (!skipper) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="qr-code-outline" size={64} color={Colors.mediumGray} />
        <Text style={styles.emptyText}>No QR code available</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `SkipperLog Profile: ${skipper.firstName} ${skipper.lastName}\nQR Code: ${skipper.qrCode}\n\nScan this QR code in SkipperLog to view the skipper's rating and history.`,
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your SkipperLog QR</Text>
        <Text style={styles.subtitle}>
          Show this to charter companies for quick lookup
        </Text>

        <View style={styles.qrContainer}>
          <QRCode
            value={`skipperlog://${skipper.qrCode}`}
            size={220}
            color={Colors.navy}
            backgroundColor={Colors.white}
          />
        </View>

        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>ID</Text>
          <Text style={styles.code}>{skipper.qrCode}</Text>
        </View>

        <View style={styles.nameRow}>
          <Ionicons name="person" size={18} color={Colors.deepBlue} />
          <Text style={styles.name}>{skipper.firstName} {skipper.lastName}</Text>
        </View>

        <Button
          title="Share QR Code"
          onPress={handleShare}
          variant="outline"
          icon={<Ionicons name="share-outline" size={18} color={Colors.deepBlue} />}
        />
      </View>

      <Text style={styles.hint}>
        This QR code links to your public skipper profile.
        Charter companies can scan it to instantly view your rating and history.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    gap: 16,
    width: '100%',
    ...Shadows.large,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  qrContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.mediumGray,
    textTransform: 'uppercase',
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.deepBlue,
    letterSpacing: 1.5,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  hint: {
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
