import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { guestService } from '../api/apiService';
import { GuestData } from '../types';

interface RegistrationFormState {
  name: string;
  email: string;
  phone: string;
  isLoading: boolean;
  step: 'form' | 'verification' | 'result';
  guestFound: GuestData | null;
}

const GuestRegistrationScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegistrationFormState>({
    name: '',
    email: '',
    phone: '',
    isLoading: false,
    step: 'form',
    guestFound: null
  });
  
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

  const handleFormSubmit = async () => {
    // Validation basique
    if (form.name.trim() === '' || form.email.trim() === '' || form.phone.trim() === '') {
      Alert.alert(
        'Informations manquantes', 
        'Veuillez remplir tous les champs obligatoires.',
        [{ text: 'OK', style: 'default' }],
        { cancelable: true }
      );
      return;
    }
    
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
    
    // Recherche de l'invité
    setForm(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simuler la vérification dans la liste des invités
      const guestInfo = await guestService.getGuestInfo(form.email);
      
      // Passer à l'étape suivante après une courte attente
      setTimeout(() => {
        setForm(prev => ({ 
          ...prev, 
          isLoading: false,
          step: 'verification',
          guestFound: guestInfo
        }));
      }, 1500);
      
    } catch (error) {
      setForm(prev => ({ ...prev, isLoading: false }));
      Alert.alert(
        'Erreur', 
        'Une erreur est survenue lors de la vérification de vos informations.',
        [{ text: 'Réessayer', style: 'default' }],
        { cancelable: true }
      );
    }
  };

  const handleScanInvitation = () => {
    router.push('/ScanQRScreen');
  };

  const handleRetry = () => {
    setForm(prev => ({ ...prev, step: 'form' }));
  };

  const handleStartOver = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      isLoading: false,
      step: 'form',
      guestFound: null
    });
  };

  const renderForm = () => (
    <ScrollView 
      className="w-full px-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text 
        style={{
          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
          fontSize: 28,
          fontWeight: '700',
          letterSpacing: 0.5,
        }}
        className="text-white text-center mb-4"
      >
        Information Invité
      </Text>
      
      {/* Formulaire avec style iOS */}
      <View className="space-y-4">
        {/* Nom */}
        <View className="mb-2">
          <Text className="text-white/90 text-sm mb-2 ml-1">Nom complet *</Text>
          <View 
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.18)',
            }}
          >
            <TextInput
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 17,
                fontWeight: '400',
                height: 52,
                padding: 16,
                color: 'white',
              }}
              placeholder="Votre nom et prénom"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={form.name}
              onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
              selectionColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>
        
        {/* Email */}
        <View className="mb-2">
          <Text className="text-white/90 text-sm mb-2 ml-1">Email *</Text>
          <View 
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.18)',
            }}
          >
            <TextInput
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 17,
                fontWeight: '400',
                height: 52,
                padding: 16,
                color: 'white',
              }}
              placeholder="votre@email.com"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={form.email}
              onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
              selectionColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>
        
        {/* Téléphone */}
        <View className="mb-2">
          <Text className="text-white/90 text-sm mb-2 ml-1">Téléphone *</Text>
          <View 
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.18)',
            }}
          >
            <TextInput
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 17,
                fontWeight: '400',
                height: 52,
                padding: 16,
                color: 'white',
              }}
              placeholder="+33 6 XX XX XX XX"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={form.phone}
              onChangeText={(text) => setForm(prev => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
              selectionColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>
      </View>
      
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          className="bg-white/90 py-4 rounded-xl mt-4 overflow-hidden"
          activeOpacity={0.9}
          onPress={handleFormSubmit}
          disabled={form.isLoading}
        >
          {!form.isLoading ? (
            <Text 
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 17,
                fontWeight: '600'
              }}
              className="text-amber-800 text-center"
            >
              Vérifier mon invitation
            </Text>
          ) : (
            <View className="flex-row items-center justify-center">
              <View className="h-5 w-5 mr-2 rounded-full border-2 border-t-transparent border-amber-800 animate-spin" />
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 17,
                  fontWeight: '600'
                }}
                className="text-amber-800 text-center"
              >
                Vérification...
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );

  const renderVerificationResult = () => (
    <View className="w-full px-6">
      <View className="items-center mb-8">
        {form.guestFound ? (
          <View className="items-center">
            <View className="bg-green-200/30 rounded-full p-5 mb-4">
              <Ionicons name="checkmark" size={40} color="#dcfce7" />
            </View>
            <Text 
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 24,
                fontWeight: '700',
              }}
              className="text-white text-center mb-2"
            >
              Invitation trouvée !
            </Text>
            <Text 
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 17,
                fontWeight: '400',
                lineHeight: 24,
              }}
              className="text-white/90 text-center mb-8"
            >
              Bienvenue {form.guestFound.name} ! Veuillez scanner votre code QR pour accéder à la salle de mariage.
            </Text>
            
            {/* Informations sur la table */}
            <View className="bg-white/20 rounded-xl p-4 w-full mb-6">
              <Text className="text-white text-center font-medium mb-2">
                Votre table : N°{form.guestFound.tableNumber}
              </Text>
              <Text className="text-white/90 text-center text-sm">
                Cette information vous sera rappelée après le scan de votre invitation
              </Text>
            </View>
          </View>
        ) : (
          <View className="items-center">
            <View className="bg-red-200/30 rounded-full p-5 mb-4">
              <Ionicons name="close" size={40} color="#fee2e2" />
            </View>
            <Text 
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 24,
                fontWeight: '700',
              }}
              className="text-white text-center mb-2"
            >
              Invitation non trouvée
            </Text>
            <Text 
              style={{
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                fontSize: 17,
                fontWeight: '400',
                lineHeight: 24,
              }}
              className="text-white/90 text-center mb-6"
            >
              Nous n'avons pas trouvé votre invitation dans notre liste. Veuillez vérifier vos informations ou contacter les mariés.
            </Text>
          </View>
        )}
      </View>
      
      {/* Boutons d'action */}
      {form.guestFound ? (
        <TouchableOpacity
          className="bg-white/90 py-4 rounded-xl mb-4 overflow-hidden"
          activeOpacity={0.9}
          onPress={handleScanInvitation}
        >
          <Text 
            style={{
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
              fontSize: 17,
              fontWeight: '600'
            }}
            className="text-amber-800 text-center"
          >
            Scanner mon code QR
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="bg-white/90 py-4 rounded-xl mb-4 overflow-hidden"
          activeOpacity={0.9}
          onPress={handleRetry}
        >
          <Text 
            style={{
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
              fontSize: 17,
              fontWeight: '600'
            }}
            className="text-amber-800 text-center"
          >
            Réessayer
          </Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        className="py-4 rounded-xl overflow-hidden"
        activeOpacity={0.7}
        onPress={handleStartOver}
      >
        <Text 
          style={{
            fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
            fontSize: 16,
            fontWeight: '400'
          }}
          className="text-white/80 text-center"
        >
          Recommencer
        </Text>
      </TouchableOpacity>
    </View>
  );

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
      
      <View className="flex-1 justify-center items-center px-4 pt-24 pb-12">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Carte avec animation */}
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
            <View className="p-5">
              {form.step === 'form' ? renderForm() : renderVerificationResult()}
            </View>
          </BlurView>
        </Animated.View>
      </View>
      
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
    </KeyboardAvoidingView>
  );
};

export default GuestRegistrationScreen;