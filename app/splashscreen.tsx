import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();
  const logoAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce, // Effet de rebond léger
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Animation pulsatoire pour le bouton (exemple)
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonAnimation, {
          toValue: 1.05,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnimation, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();

  }, [logoAnim, textAnim, buttonAnimation]);

  const handleNavigate = () => {
    Animated.timing(buttonAnimation, {
      toValue: 0.95, // Scale down
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      router.replace('/MainScreen');
    });
  };

  const handleSkip = () => {
    router.replace('/MainScreen');
  };

  return (
    <LinearGradient
      colors={['#9333ea', '#9333ea']}
      style={styles.container}
      className="flex-1 items-center pt-12 pb-6"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text 
            className='text-white text-base font-semibold'
        >Passer</Text>
      </TouchableOpacity>

      <View className='flex-1 justify-center items-center w-full space-y-10'>
        <Animated.View>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.logo}
          />
        </Animated.View>
        <Animated.View className='items-center'>
          <Text className='text-5xl text-white font-bold text-center'>Nuptia</Text>
        </Animated.View>
      </View>

      <Animated.View className="px-8 pb-10 items-center justify-center w-full">
        <TouchableOpacity onPress={handleNavigate}>
          <View className='bg-secondary px-12 py-6 rounded-full flex-row w-full items-center justify-between'>
            <Text style={styles.buttonText}>EXPLORER</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
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
    width: 120,
    height: 120,
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