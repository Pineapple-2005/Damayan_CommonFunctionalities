import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingScreen from './screens/LandingScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <LandingScreen />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
