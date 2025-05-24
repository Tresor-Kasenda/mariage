import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function Index() {
  // Récupérer les informations de l'invité authentifié
  const { guest } = useAuth();
  
  // Fonctions utilitaires pour l'affichage adaptatif
  const renderGuestNames = (guestData: any) => {
    if (!guestData) return '';
    
    if (guestData.invitationType === 'couple') {
      const primaryName = guestData.primaryGuest?.name?.split(' ')[0] || '';
      const secondaryName = guestData.secondaryGuest?.name?.split(' ')[0] || '';
      return `${primaryName} & ${secondaryName}`;
    }
    
    return guestData.primaryGuest?.name?.split(' ')[0] || guestData.name?.split(' ')[0] || '';
  };

  const renderRSVPStatus = (guestData: any) => {
    if (!guestData) return { status: 'unknown', color: 'text-gray-500', icon: 'help-circle' };
    
    if (guestData.invitationType === 'couple') {
      const primaryStatus = guestData.primaryGuest?.rsvpStatus;
      const secondaryStatus = guestData.secondaryGuest?.rsvpStatus;
      
      if (primaryStatus === 'confirmed' && secondaryStatus === 'confirmed') {
        return { status: 'Vous serez tous les deux présents', color: 'text-green-600', icon: 'checkmark-circle' };
      } else if (primaryStatus === 'declined' && secondaryStatus === 'declined') {
        return { status: 'Vous ne pourrez pas venir', color: 'text-red-600', icon: 'close-circle' };
      } else if (primaryStatus === 'confirmed' || secondaryStatus === 'confirmed') {
        return { status: 'Présence partielle confirmée', color: 'text-orange-600', icon: 'warning' };
      } else if (!guestData.hasCompletedRSVP) {
        return { status: 'RSVP en attente', color: 'text-amber-600', icon: 'time' };
      }
    } else {
      const status = guestData.primaryGuest?.rsvpStatus || guestData.confirmationStatus;
      if (status === 'confirmed' || status === 'Confirmé') {
        return { status: 'Présence confirmée', color: 'text-green-600', icon: 'checkmark-circle' };
      } else if (status === 'declined' || status === 'Annulé') {
        return { status: 'Absence confirmée', color: 'text-red-600', icon: 'close-circle' };
      } else if (!guestData.hasCompletedRSVP) {
        return { status: 'RSVP en attente', color: 'text-amber-600', icon: 'time' };
      }
    }
    
    return { status: 'Statut inconnu', color: 'text-gray-500', icon: 'help-circle' };
  };

  // Date du mariage
  const eventDate = new Date(2025, 5, 15); // 15 juin 2025
  const today = new Date();
  const daysLeft = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  // Animations pour les cartes - style Apple avec séquences d'apparition
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const countdownOpacity = useRef(new Animated.Value(0)).current;
  const programOpacity = useRef(new Animated.Value(0)).current;
  const infoOpacity = useRef(new Animated.Value(0)).current;
  const locationOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animation séquencée des éléments - style Apple
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      }),
      Animated.stagger(150, [
        Animated.timing(countdownOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        }),
        Animated.timing(programOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        }),
        Animated.timing(infoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        }),
        Animated.timing(locationOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
        })
      ])
    ]).start();
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête avec image de mariage et effet de flou style Apple */}
        <Animated.View 
          className="w-full h-80 relative mb-4"
          style={{ opacity: headerOpacity }}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2787&auto=format&fit=crop' }}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Overlay gradient pour améliorer la lisibilité du texte */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 1 }}
          />
          
          <BlurView intensity={30} tint="dark" className="absolute inset-x-0 bottom-0 justify-end p-6 h-1/2 bg-black/10">
            <View className="mb-2">
              {guest && (
                <Text 
                  style={{
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 0.5,
                  }}
                  className="text-amber-100 mb-1"
                >
                  Bonjour {renderGuestNames(guest)},
                </Text>
              )}
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 32,
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}
                className="text-white"
              >
                Sophie & Thomas
              </Text>
              <Text 
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                  fontSize: 18,
                  fontWeight: '400',
                  letterSpacing: 0.25,
                }}
                className="text-white/90"
              >
                15 Juin 2025 • Château des Fleurs
              </Text>
              
              {/* Statut RSVP */}
              {guest && (
                <View className="flex-row items-center mt-3 px-3 py-2 bg-white/20 rounded-full">
                  <Ionicons 
                    name={renderRSVPStatus(guest).icon as any} 
                    size={16} 
                    color="white" 
                  />
                  <Text 
                    style={{
                      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                      fontSize: 14,
                      fontWeight: '500',
                    }}
                    className="text-white ml-2"
                  >
                    {renderRSVPStatus(guest).status}
                  </Text>
                </View>
              )}
            </View>
          </BlurView>
        </Animated.View>
        
        {/* Compte à rebours style Apple Cards */}
        <Animated.View style={{
          opacity: countdownOpacity,
          transform: [{ 
            translateY: countdownOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            }) 
          }]
        }}>
          <View className="mx-6 mb-5">
            <BlurView intensity={75} tint="light" className="rounded-2xl overflow-hidden">
              <View className="p-5">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text 
                      style={{
                        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                        fontSize: 15,
                        fontWeight: '500',
                      }}
                      className="text-primary/60 mb-1"
                    >
                      COMPTE À REBOURS
                    </Text>
                    <Text 
                      style={{
                        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                        fontSize: 38,
                        fontWeight: '700',
                      }}
                      className="text-primary"
                    >
                      {daysLeft} jours
                    </Text>
                  </View>
                  <View className="bg-primary/10 p-3 rounded-full">
                    <Ionicons name="time-outline" size={26} color="#92400e" />
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </Animated.View>
        
        {/* Section "Accès rapides" style Apple */}
        <View className="px-6 mb-3">
          <Text 
            style={{
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
              fontSize: 22,
              fontWeight: '600',
            }}
            className="text-primary"
          >
            Accès rapides
          </Text>
        </View>

        {/* Carte RSVP prioritaire */}
        {guest && !guest.hasCompletedRSVP && (
          <View className="px-6 mb-4">
            <Link href="/RSVPScreen" asChild>
              <TouchableOpacity activeOpacity={0.9}>
                <BlurView intensity={75} tint="light" className="rounded-2xl overflow-hidden">
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    className="p-6"
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-white/90 text-sm font-medium mb-1">
                          ACTION REQUISE
                        </Text>
                        <Text className="text-white text-xl font-bold mb-2">
                          Confirmez votre présence
                        </Text>
                        <Text className="text-white/80 text-sm">
                          Aidez-nous à organiser cette journée parfaite
                        </Text>
                      </View>
                      <View className="bg-white/20 p-3 rounded-full ml-4">
                        <Ionicons name="checkmark-circle" size={28} color="white" />
                      </View>
                    </View>
                  </LinearGradient>
                </BlurView>
              </TouchableOpacity>
            </Link>
          </View>
        )}
        
        {/* Cartes de navigation style Apple */}
        <View className="px-6 gap-4">
          {/* Programme */}
          <Link href="/schedule" asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <Animated.View style={{
                opacity: programOpacity,
                transform: [{ 
                  translateY: programOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  }) 
                }]
              }}>
                <BlurView intensity={75} tint="light" className="rounded-2xl overflow-hidden">
                  <View className="p-5 flex-row items-center justify-between">
                    <View>
                      <Text 
                        style={{
                          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                          fontSize: 20,
                          fontWeight: '600',
                        }}
                        className="text-primary"
                      >
                        Programme
                      </Text>
                      <Text 
                        style={{
                          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                          fontSize: 16,
                          fontWeight: '400',
                        }}
                        className="text-primary/60"
                      >
                        Déroulement des festivités
                      </Text>
                    </View>
                    <View className="bg-primary/10 p-3 rounded-xl">
                      <Ionicons name="calendar-outline" size={24} color="#92400e" />
                    </View>
                  </View>
                </BlurView>
              </Animated.View>
            </TouchableOpacity>
          </Link>
          
          {/* Informations */}
          <Link href="/setting" asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <Animated.View style={{
                opacity: infoOpacity,
                transform: [{ 
                  translateY: infoOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  }) 
                }]
              }}>
                <BlurView intensity={75} tint="light" className="rounded-2xl overflow-hidden">
                  <View className="p-5 flex-row items-center justify-between">
                    <View>
                      <Text 
                        style={{
                          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                          fontSize: 20,
                          fontWeight: '600',
                        }}
                        className="text-primary"
                      >
                        Informations
                      </Text>
                      <Text 
                        style={{
                          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                          fontSize: 16,
                          fontWeight: '400',
                        }}
                        className="text-primary/60"
                      >
                        Détails et contacts
                      </Text>
                    </View>
                    <View className="bg-primary/10 p-3 rounded-xl">
                      <Ionicons name="information-circle-outline" size={24} color="#92400e" />
                    </View>
                  </View>
                </BlurView>
              </Animated.View>
            </TouchableOpacity>
          </Link>
          
          {/* Localisation */}
          <TouchableOpacity activeOpacity={0.9}>
            <Animated.View style={{
              opacity: locationOpacity,
              transform: [{ 
                translateY: locationOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                }) 
              }]
            }}>
              <BlurView intensity={75} tint="light" className="rounded-2xl overflow-hidden">
                <View className="p-5 flex-row items-center justify-between">
                  <View>
                    <Text 
                      style={{
                        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                        fontSize: 20,
                        fontWeight: '600',
                      }}
                      className="text-primary"
                    >
                      Localisation
                    </Text>
                    <Text 
                      style={{
                        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                        fontSize: 16,
                        fontWeight: '400',
                      }}
                      className="text-primary/60"
                    >
                      Accès et itinéraires
                    </Text>
                  </View>
                  <View className="bg-primary/10 p-3 rounded-xl">
                    <Ionicons name="location-outline" size={24} color="#92400e" />
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
