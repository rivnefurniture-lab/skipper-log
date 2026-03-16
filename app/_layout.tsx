import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useStore } from '../lib/store';
import { Colors } from '../lib/colors';

export default function RootLayout() {
  const restoreSession = useStore(s => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(charter)" />
        <Stack.Screen name="(skipper)" />
        <Stack.Screen
          name="skipper/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Skipper Profile',
            headerStyle: { backgroundColor: Colors.navy },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="session/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Session Details',
            headerStyle: { backgroundColor: Colors.navy },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="session/create"
          options={{
            headerShown: true,
            headerTitle: 'New Session',
            headerStyle: { backgroundColor: Colors.navy },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700' },
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="session/rate/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Rate & Close Session',
            headerStyle: { backgroundColor: Colors.navy },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700' },
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="qr/[id]"
          options={{
            headerShown: true,
            headerTitle: 'QR Code',
            headerStyle: { backgroundColor: Colors.navy },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700' },
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
