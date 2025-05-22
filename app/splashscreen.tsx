import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.replace('/ScanQRScreen');
  };

  const handleSkip = () => {
    router.replace('/ScanQRScreen');
  };

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#b45309', '#92400e']}
        style={styles.container}
        className="flex-1 items-center pt-16 pb-6"
      >
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* Bouton Passer avec style Apple */}
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={handleSkip}
          className="bg-black/10 px-6 py-2.5 rounded-full"
        >
          <Text style={{
            fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
            fontSize: 16,
            fontWeight: '500',
          }} className="text-white">
            Passer
          </Text>
        </TouchableOpacity>

        <View className="flex-1 justify-center items-center w-full">
          {/* Logo avec effet d'ombre à la manière Apple */}
          <View className="shadow-2xl" style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
          
          {/* Texte de bienvenue avec typographie Apple */}
          <Text 
            style={{
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
              fontSize: 32,
              fontWeight: '600',
              marginTop: 30,
            }} 
            className="text-white text-center"
          >
            Bienvenue
          </Text>
          
          <Text 
            style={{
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
              fontSize: 17,
              fontWeight: '400',
              marginTop: 8,
              opacity: 0.9,
            }} 
            className="text-white text-center px-12"
          >
            Votre invitation personnelle au mariage de Sophie & Thomas
          </Text>
        </View>

        {/* Bouton explorer avec style Apple (similaire aux boutons iOS) */}
        <View className="w-full px-8 pb-12">
          <BlurView intensity={30} tint="light" className="overflow-hidden rounded-2xl">
            <TouchableOpacity 
              className="px-8 py-4 items-center"
              style={{backgroundColor: 'rgba(255,255,255,0.25)'}}
              onPress={handleNavigate}
              activeOpacity={0.8}
            >
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 18,
                  fontWeight: '600',
                }} 
                className="text-white"
              >
                EXPLORER
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    right: 20,
    zIndex: 1,
  },
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
});

export default SplashScreen;