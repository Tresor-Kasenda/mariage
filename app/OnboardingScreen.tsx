import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenue à notre mariage',
    subtitle: 'Sophie & Thomas',
    description: 'Découvrez toutes les informations et fonctionnalités pour vivre pleinement cette journée exceptionnelle avec nous.',
    icon: 'heart',
    color: '#f59e0b',
    image: 'celebration'
  },
  {
    id: 'rsvp',
    title: 'Confirmez votre présence',
    subtitle: 'RSVP simple et rapide',
    description: 'Indiquez-nous si vous serez présent(e) et partagez vos préférences alimentaires pour un repas parfait.',
    icon: 'checkmark-circle',
    color: '#10b981',
    image: 'rsvp'
  },
  {
    id: 'schedule',
    title: 'Programme de la journée',
    subtitle: 'Ne ratez aucun moment',
    description: 'Consultez le planning détaillé de la cérémonie, du cocktail et de la soirée pour être au bon endroit au bon moment.',
    icon: 'calendar',
    color: '#6366f1',
    image: 'schedule'
  },
  {
    id: 'share',
    title: 'Partagez vos souvenirs',
    subtitle: 'Galerie collaborative',
    description: 'Capturez et partagez instantanément vos plus beaux moments pour créer ensemble nos souvenirs de mariage.',
    icon: 'camera',
    color: '#ec4899',
    image: 'gallery'
  },
  {
    id: 'ready',
    title: 'Tout est prêt !',
    subtitle: 'Commençons l\'aventure',
    description: 'Vous êtes maintenant prêt(e) à profiter pleinement de notre application de mariage. Amusez-vous bien !',
    icon: 'rocket',
    color: '#f97316',
    image: 'ready'
  }
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée initiale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      })
    ]).start();

    // Animation de la barre de progression
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / ONBOARDING_STEPS.length,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
    }).start();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      // Animation de sortie
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -screenWidth,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        })
      ]).start(() => {
        setCurrentStep(currentStep + 1);
        slideAnim.setValue(screenWidth);
        // Animation d'entrée
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
          })
        ]).start();
      });
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenWidth,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        })
      ]).start(() => {
        setCurrentStep(currentStep - 1);
        slideAnim.setValue(-screenWidth);
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
          })
        ]).start();
      });
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    
    // Animation de fin
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      })
    ]).start(() => {
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    });
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <LinearGradient
      colors={['#fefce8', '#fef3c7', '#fed7aa']}
      className="flex-1"
    >
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView className="flex-1">
        {/* Header avec progression */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              onPress={currentStep > 0 ? handleBack : undefined}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                currentStep > 0 ? 'bg-white/20' : ''
              }`}
              disabled={currentStep === 0}
            >
              {currentStep > 0 && (
                <Ionicons name="arrow-back" size={20} color="#92400e" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleSkip}
              className="px-4 py-2 bg-white/20 rounded-full"
            >
              <Text className="text-primary font-medium">Passer</Text>
            </TouchableOpacity>
          </View>
          
          {/* Barre de progression */}
          <View className="h-2 bg-white/30 rounded-full overflow-hidden">
            <Animated.View 
              className="h-full bg-primary rounded-full"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }}
            />
          </View>
          
          <View className="flex-row justify-between mt-2">
            <Text className="text-primary/60 text-sm font-medium">
              {currentStep + 1} / {ONBOARDING_STEPS.length}
            </Text>
            <Text className="text-primary/60 text-sm font-medium">
              {Math.round(((currentStep + 1) / ONBOARDING_STEPS.length) * 100)}%
            </Text>
          </View>
        </View>

        {/* Contenu principal */}
        <Animated.View 
          style={{ 
            opacity: fadeAnim,
            transform: [
              { translateX: slideAnim },
              { scale: scaleAnim }
            ]
          }}
          className="flex-1 px-6"
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            {/* Icône principale */}
            <View className="items-center mb-8">
              <View 
                className="w-24 h-24 rounded-full items-center justify-center mb-6"
                style={{ backgroundColor: `${step.color}20` }}
              >
                <Ionicons 
                  name={step.icon as any} 
                  size={40} 
                  color={step.color} 
                />
              </View>
              
              {/* Titre */}
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 28,
                  fontWeight: '700',
                  textAlign: 'center',
                  lineHeight: 34,
                }}
                className="text-primary mb-2"
              >
                {step.title}
              </Text>
              
              {/* Sous-titre */}
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 18,
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: 24,
                }}
                className="text-primary/70 mb-6"
              >
                {step.subtitle}
              </Text>
              
              {/* Description */}
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                  lineHeight: 24,
                }}
                className="text-gray-600 px-4"
              >
                {step.description}
              </Text>
            </View>

            {/* Points clés pour chaque étape */}
            {currentStep === 1 && (
              <View className="bg-white/50 rounded-xl p-6 mx-4 mb-8">
                <Text className="text-primary font-semibold mb-4 text-center">
                  Fonctionnalités RSVP :
                </Text>
                <View className="space-y-3">
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <Text className="text-gray-700 flex-1">Confirmation pour couples ou célibataires</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <Text className="text-gray-700 flex-1">Préférences alimentaires détaillées</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <Text className="text-gray-700 flex-1">Demandes spéciales et accessibilité</Text>
                  </View>
                </View>
              </View>
            )}

            {currentStep === 2 && (
              <View className="bg-white/50 rounded-xl p-6 mx-4 mb-8">
                <Text className="text-primary font-semibold mb-4 text-center">
                  Dans le programme :
                </Text>
                <View className="space-y-3">
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 flex-1">Horaires détaillés de chaque événement</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 flex-1">Lieux et indications pratiques</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 flex-1">Menus et informations spéciales</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </Animated.View>

        {/* Boutons d'action */}
        <View className="px-6 pb-6">
          <BlurView intensity={80} tint="light" className="rounded-xl overflow-hidden">
            <View className="p-4">
              <TouchableOpacity
                onPress={handleNext}
                className="py-4 rounded-xl items-center"
                style={{ backgroundColor: step.color }}
              >
                <Text className="text-white font-semibold text-lg">
                  {currentStep === ONBOARDING_STEPS.length - 1 ? 'Commencer' : 'Suivant'}
                </Text>
              </TouchableOpacity>
              
              {/* Indicateurs de pagination */}
              <View className="flex-row justify-center mt-4 space-x-2">
                {ONBOARDING_STEPS.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-primary' : 'bg-primary/30'
                    }`}
                  />
                ))}
              </View>
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;
