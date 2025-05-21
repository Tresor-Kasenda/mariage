import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.replace('/InvitationScreen');
  };

  const handleSkip = () => {
    router.replace('/InvitationScreen');
  };

  return (
    <LinearGradient
      colors={['#9333ea', '#9333ea']}
      style={styles.container}
      className="flex-1 items-center pt-12 pb-6"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text className='text-white text-base font-semibold'>
            Passer
        </Text>
      </TouchableOpacity>

      <View className='flex-1 justify-center items-center w-full space-y-10'>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <View className="px-8 pb-10 items-center justify-center w-full">
        <TouchableOpacity onPress={handleNavigate}>
          <View className='bg-secondary px-12 py-6 rounded-full flex-row w-full items-center justify-between'>
            <Text style={styles.buttonText}>EXPLORER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  tagline: { // Re-added tagline style
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  illustration: { // Style for the new illustration
    width: width * 0.8, // 80% of screen width
    height: 200,        // Adjust as needed
    resizeMode: 'contain',
    marginTop: 10, // Added to ensure spacing, adjust with space-y-10 if needed
  },
  buttonContainer: {
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;