import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { GuestData, Guest } from '../types';

interface RSVPFormState {
  step: 'selection' | 'details' | 'confirmation';
  primaryGuestRSVP: 'confirmed' | 'declined' | null;
  secondaryGuestRSVP: 'confirmed' | 'declined' | null;
  primaryGuestRestrictions: string[];
  secondaryGuestRestrictions: string[];
  specialRequests: string;
  isLoading: boolean;
}

const DIETARY_OPTIONS = [
  'Végétarien',
  'Vegan',
  'Sans gluten',
  'Sans lactose',
  'Sans fruits de mer',
  'Sans noix',
  'Halal',
  'Kasher',
  'Autre'
];

const RSVPScreen = () => {
  const router = useRouter();
  const { guest } = useAuth();
  const [form, setForm] = useState<RSVPFormState>({
    step: 'selection',
    primaryGuestRSVP: null,
    secondaryGuestRSVP: null,
    primaryGuestRestrictions: [],
    secondaryGuestRestrictions: [],
    specialRequests: '',
    isLoading: false
  });

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      })
    ]).start();

    // Pré-remplir les données si disponibles
    if (guest && guest.hasCompletedRSVP) {
      setForm(prev => ({
        ...prev,
        primaryGuestRSVP: guest.primaryGuest.rsvpStatus === 'confirmed' ? 'confirmed' : 'declined',
        secondaryGuestRSVP: guest.secondaryGuest ? 
          (guest.secondaryGuest.rsvpStatus === 'confirmed' ? 'confirmed' : 'declined') : null,
        primaryGuestRestrictions: guest.primaryGuest.dietaryRestrictions || [],
        secondaryGuestRestrictions: guest.secondaryGuest?.dietaryRestrictions || []
      }));
    }
  }, [guest]);

  const handleNext = () => {
    if (form.step === 'selection') {
      if (form.primaryGuestRSVP === null) {
        Alert.alert('Attention', 'Veuillez confirmer votre présence');
        return;
      }
      if (guest?.invitationType === 'couple' && form.secondaryGuestRSVP === null) {
        Alert.alert('Attention', 'Veuillez confirmer la présence de votre accompagnant(e)');
        return;
      }
      setForm(prev => ({ ...prev, step: 'details' }));
    } else if (form.step === 'details') {
      setForm(prev => ({ ...prev, step: 'confirmation' }));
    }
  };

  const handleBack = () => {
    if (form.step === 'details') {
      setForm(prev => ({ ...prev, step: 'selection' }));
    } else if (form.step === 'confirmation') {
      setForm(prev => ({ ...prev, step: 'details' }));
    }
  };

  const handleSubmitRSVP = async () => {
    setForm(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'RSVP Confirmé!',
        'Merci pour votre réponse. Nous avons hâte de célébrer avec vous!',
        [
          {
            text: 'Retour à l\'accueil',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setForm(prev => ({ ...prev, isLoading: false }));
    }
  };

  const toggleDietaryRestriction = (restriction: string, isSecondary: boolean = false) => {
    const key = isSecondary ? 'secondaryGuestRestrictions' : 'primaryGuestRestrictions';
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(restriction)
        ? prev[key].filter(r => r !== restriction)
        : [...prev[key], restriction]
    }));
  };

  const renderSelectionStep = () => (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-primary mb-2">
          Confirmez votre présence
        </Text>
        <Text className="text-gray-600 text-base">
          Merci de nous indiquer si vous serez présent(e) pour notre mariage
        </Text>
      </View>

      {/* Primary Guest RSVP */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          {guest?.primaryGuest?.name || guest?.name}
        </Text>
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => setForm(prev => ({ ...prev, primaryGuestRSVP: 'confirmed' }))}
            className={`flex-1 p-4 rounded-xl border-2 ${
              form.primaryGuestRSVP === 'confirmed' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <View className="items-center">
              <Ionicons 
                name="checkmark-circle" 
                size={24} 
                color={form.primaryGuestRSVP === 'confirmed' ? '#10b981' : '#9ca3af'} 
              />
              <Text className={`mt-2 font-medium ${
                form.primaryGuestRSVP === 'confirmed' ? 'text-green-600' : 'text-gray-500'
              }`}>
                Je serai présent(e)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setForm(prev => ({ ...prev, primaryGuestRSVP: 'declined' }))}
            className={`flex-1 p-4 rounded-xl border-2 ${
              form.primaryGuestRSVP === 'declined' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <View className="items-center">
              <Ionicons 
                name="close-circle" 
                size={24} 
                color={form.primaryGuestRSVP === 'declined' ? '#ef4444' : '#9ca3af'} 
              />
              <Text className={`mt-2 font-medium ${
                form.primaryGuestRSVP === 'declined' ? 'text-red-600' : 'text-gray-500'
              }`}>
                Je ne pourrai pas
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Secondary Guest RSVP (if couple) */}
      {guest?.invitationType === 'couple' && guest.secondaryGuest && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {guest.secondaryGuest.name}
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setForm(prev => ({ ...prev, secondaryGuestRSVP: 'confirmed' }))}
              className={`flex-1 p-4 rounded-xl border-2 ${
                form.secondaryGuestRSVP === 'confirmed' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name="checkmark-circle" 
                  size={24} 
                  color={form.secondaryGuestRSVP === 'confirmed' ? '#10b981' : '#9ca3af'} 
                />
                <Text className={`mt-2 font-medium ${
                  form.secondaryGuestRSVP === 'confirmed' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  Sera présent(e)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setForm(prev => ({ ...prev, secondaryGuestRSVP: 'declined' }))}
              className={`flex-1 p-4 rounded-xl border-2 ${
                form.secondaryGuestRSVP === 'declined' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name="close-circle" 
                  size={24} 
                  color={form.secondaryGuestRSVP === 'declined' ? '#ef4444' : '#9ca3af'} 
                />
                <Text className={`mt-2 font-medium ${
                  form.secondaryGuestRSVP === 'declined' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  Ne pourra pas
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  const renderDetailsStep = () => (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-primary mb-2">
          Préférences alimentaires
        </Text>
        <Text className="text-gray-600 text-base">
          Aidez-nous à préparer un repas adapté à vos besoins
        </Text>
      </View>

      {/* Primary Guest Restrictions */}
      {form.primaryGuestRSVP === 'confirmed' && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {guest?.primaryGuest?.name || guest?.name}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => toggleDietaryRestriction(option, false)}
                className={`px-4 py-2 rounded-full border ${
                  form.primaryGuestRestrictions.includes(option)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Text className={`text-sm font-medium ${
                  form.primaryGuestRestrictions.includes(option)
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Secondary Guest Restrictions */}
      {guest?.invitationType === 'couple' && form.secondaryGuestRSVP === 'confirmed' && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {guest.secondaryGuest?.name}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={`secondary-${option}`}
                onPress={() => toggleDietaryRestriction(option, true)}
                className={`px-4 py-2 rounded-full border ${
                  form.secondaryGuestRestrictions.includes(option)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Text className={`text-sm font-medium ${
                  form.secondaryGuestRestrictions.includes(option)
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Special Requests */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Demandes spéciales (optionnel)
        </Text>
        <TextInput
          value={form.specialRequests}
          onChangeText={(text) => setForm(prev => ({ ...prev, specialRequests: text }))}
          multiline
          numberOfLines={4}
          placeholder="Allergies spécifiques, besoins d'accessibilité, etc."
          className="border border-gray-300 rounded-xl p-4 text-base text-gray-800 bg-white"
          style={{ textAlignVertical: 'top' }}
        />
      </View>
    </View>
  );

  const renderConfirmationStep = () => (
    <View className="flex-1">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-primary mb-2">
          Confirmation RSVP
        </Text>
        <Text className="text-gray-600 text-base">
          Vérifiez vos informations avant de confirmer
        </Text>
      </View>

      {/* Summary */}
      <View className="bg-gray-50 rounded-xl p-6 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Récapitulatif</Text>
        
        {/* Primary Guest Summary */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-medium text-gray-800">{guest?.primaryGuest?.name || guest?.name}</Text>
            <View className={`px-3 py-1 rounded-full ${
              form.primaryGuestRSVP === 'confirmed' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Text className={`text-sm font-medium ${
                form.primaryGuestRSVP === 'confirmed' ? 'text-green-600' : 'text-red-600'
              }`}>
                {form.primaryGuestRSVP === 'confirmed' ? 'Présent(e)' : 'Absent(e)'}
              </Text>
            </View>
          </View>
          {form.primaryGuestRSVP === 'confirmed' && form.primaryGuestRestrictions.length > 0 && (
            <Text className="text-sm text-gray-600">
              Restrictions: {form.primaryGuestRestrictions.join(', ')}
            </Text>
          )}
        </View>

        {/* Secondary Guest Summary */}
        {guest?.invitationType === 'couple' && guest.secondaryGuest && (
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-medium text-gray-800">{guest.secondaryGuest.name}</Text>
              <View className={`px-3 py-1 rounded-full ${
                form.secondaryGuestRSVP === 'confirmed' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Text className={`text-sm font-medium ${
                  form.secondaryGuestRSVP === 'confirmed' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {form.secondaryGuestRSVP === 'confirmed' ? 'Présent(e)' : 'Absent(e)'}
                </Text>
              </View>
            </View>
            {form.secondaryGuestRSVP === 'confirmed' && form.secondaryGuestRestrictions.length > 0 && (
              <Text className="text-sm text-gray-600">
                Restrictions: {form.secondaryGuestRestrictions.join(', ')}
              </Text>
            )}
          </View>
        )}

        {/* Special Requests */}
        {form.specialRequests.trim() && (
          <View>
            <Text className="font-medium text-gray-800 mb-2">Demandes spéciales:</Text>
            <Text className="text-sm text-gray-600">{form.specialRequests}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#fefce8', '#fef3c7', '#fed7aa']}
      className="flex-1"
    >
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header avec navigation */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity
              onPress={form.step === 'selection' ? () => router.back() : handleBack}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="#92400e" />
            </TouchableOpacity>
            
            <View className="flex-1 mx-4">
              <View className="flex-row">
                {['selection', 'details', 'confirmation'].map((step, index) => (
                  <View key={step} className="flex-1 flex-row items-center">
                    <View className={`h-2 flex-1 rounded-full ${
                      form.step === step || 
                      (['details', 'confirmation'].includes(form.step) && index < ['selection', 'details', 'confirmation'].indexOf(form.step))
                        ? 'bg-primary' 
                        : 'bg-white/30'
                    }`} />
                    {index < 2 && <View className="w-2" />}
                  </View>
                ))}
              </View>
            </View>
            
            <View className="w-10" />
          </View>

          <Animated.View 
            style={{ 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
            className="flex-1"
          >
            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
              {form.step === 'selection' && renderSelectionStep()}
              {form.step === 'details' && renderDetailsStep()}
              {form.step === 'confirmation' && renderConfirmationStep()}
            </ScrollView>

            {/* Bottom Actions */}
            <View className="px-6 pb-6 pt-4">
              <BlurView intensity={80} tint="light" className="rounded-xl overflow-hidden">
                <View className="p-4">
                  <TouchableOpacity
                    onPress={form.step === 'confirmation' ? handleSubmitRSVP : handleNext}
                    disabled={form.isLoading}
                    className={`py-4 rounded-xl items-center ${
                      form.isLoading ? 'bg-gray-300' : 'bg-primary'
                    }`}
                  >
                    {form.isLoading ? (
                      <Text className="text-white font-semibold text-lg">
                        Envoi en cours...
                      </Text>
                    ) : (
                      <Text className="text-white font-semibold text-lg">
                        {form.step === 'confirmation' ? 'Confirmer RSVP' : 'Suivant'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RSVPScreen;