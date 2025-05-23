import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native'; // Add Image
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function LocationScreen() {
  const venueName = "Château des Fleurs";
  const venueAddress = "123 Rue du Château, 75000 Paris, France (Placeholder)"; // Placeholder address

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDF8F0' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingTop: Platform.OS === 'android' ? 20 : 0 }}>
        <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
          <Text style={styles.headerTitle}>Localisation</Text>

          {/* Add Image here */}
          <Image 
            source={{ uri: 'https://via.placeholder.com/400x200.png?text=Map+to+Château+des+Fleurs' }} 
            style={styles.mapImage} 
          />

          <View style={styles.card}>
            <Ionicons name="location-sharp" size={28} color="#D97706" style={{ marginBottom: 8 }} />
            <Text style={styles.venueName}>{venueName}</Text>
            <Text style={styles.venueAddress}>{venueAddress}</Text>
            <TouchableOpacity 
              style={styles.mapButton}
              activeOpacity={0.8}
              // onPress={() => { /* TODO: Implement opening maps */ }}
            >
              <Text style={styles.mapButtonText}>Ouvrir dans Plans</Text>
              <Ionicons name="arrow-forward-circle" size={20} color="#fff" style={{ marginLeft: 8 }}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#92400E', // text-primary
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  mapImage: {
    width: '100%',
    height: 200, // Adjust as needed
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#E0E0E0', // Placeholder background if image fails to load
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  venueName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#92400E', // text-primary
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  venueAddress: {
    fontSize: 16,
    color: '#A16207', // text-primary/70
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D97706', // amber-600
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
});
