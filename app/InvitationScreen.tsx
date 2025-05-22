import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const InvitationScreen = () => {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation des éléments - style Apple
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Animation d'entrée élégante de la carte - style Apple
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1)
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1)
      })
    ]).start();
  }, []);

  const handleVerifyCode = () => {
    if (invitationCode.trim() === '') {
      Alert.alert(
        'Code Manquant', 
        'Veuillez entrer un code d\'invitation.',
        [{ text: 'OK', style: 'default' }],
        { cancelable: true }
      );
      return;
    }
    
    // Simulation d'une vérification
    setIsLoading(true);
    
    // Animation du bouton - effet de pression style Apple
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.83, 0.67)
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.83, 0.67)
      })
    ]).start();
    
    // Simuler un temps de chargement
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleScanCode = () => {
    router.push('/ScanQRScreen');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['#b45309', '#92400e', '#78350f']}
        start={{ x: 0.1, y: 0.2 }}
        end={{ x: 0.9, y: 0.8 }}
        style={StyleSheet.absoluteFill}
      />
      
      <View className="absolute top-14 left-0 right-0 items-center">
        <View className="border-2 border-amber-200/30 rounded-full p-6">
          <Ionicons name="heart" size={40} color="#fef3c7" />
        </View>
      </View>
      
      <View className="flex-1 justify-center items-center px-6">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Carte d'invitation avec effet de flou et animation */}
        <Animated.View 
          style={{
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslateY }],
            width: '100%',
          }}
        >
          <BlurView 
            intensity={40} 
            tint="light" 
            className="rounded-3xl overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <View className="p-8">
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 28,
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}
                className="text-white text-center mb-4"
              >
                Invitation
              </Text>
              
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 17,
                  fontWeight: '400',
                  letterSpacing: 0.25,
                  lineHeight: 24,
                }}
                className="text-white/90 text-center mb-8"
              >
                Entrez votre code d'invitation pour accéder aux détails du mariage de Sophie & Thomas.
              </Text>
              
              {/* Champ de saisie style iOS */}
              <View 
                className="mb-6 rounded-xl overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.18)',
                }}
              >
                <TextInput
                  style={{
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                    fontSize: 18,
                    fontWeight: '500',
                    textAlign: 'center',
                    height: 60,
                    padding: 16,
                    color: 'white',
                    letterSpacing: 1.2,
                  }}
                  placeholder="ABCD1234"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={invitationCode}
                  onChangeText={setInvitationCode}
                  autoCapitalize="characters"
                  selectionColor="rgba(255,255,255,0.5)"
                  maxLength={8}
                />
              </View>
              
              {/* Bouton de vérification avec animation - style iOS */}
              <Animated.View style={{
                transform: [{ scale: buttonScale }]
              }}>
                <TouchableOpacity
                  className="bg-white/90 py-4 rounded-xl mb-5 overflow-hidden"
                  activeOpacity={0.9}
                  onPress={handleVerifyCode}
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    <Text 
                      style={{
                        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                        fontSize: 17,
                        fontWeight: '600'
                      }}
                      className="text-primary text-center"
                    >
                      Vérifier
                    </Text>
                  ) : (
                    <View className="flex-row items-center justify-center">
                      <View className="h-5 w-5 mr-2 rounded-full border-2 border-t-transparent border-primary animate-spin" />
                      <Text 
                        style={{
                          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                          fontSize: 17,
                          fontWeight: '600'
                        }}
                        className="text-primary text-center"
                      >
                        Vérification...
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
              
              {/* Option de scan - style iOS */}
              <TouchableOpacity
                className="flex-row items-center justify-center mt-1"
                onPress={handleScanCode}
              >
                <Ionicons name="qr-code-outline" size={18} color="#fef3c7" className="mr-2" />
                <Text 
                  style={{
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                    fontSize: 15,
                    fontWeight: '400'
                  }}
                  className="text-amber-100 text-center ml-1"
                >
                  Scanner un code QR
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
        
        {/* Footer Information */}
        <View className="absolute bottom-12 left-0 right-0 items-center">
          <Text 
            style={{
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
              fontSize: 14,
              fontWeight: '400',
              letterSpacing: 0.2,
            }}
            className="text-amber-100/80 text-center"
          >
            15 Juin 2025 • Château des Fleurs
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InvitationScreen;
