import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, ScrollView, StatusBar, Text, TouchableOpacity, UIManager, View } from 'react-native';

interface WeddingActivity {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
  icon: string;
  color: string;
  additionalInfo?: string;
  menu?: {
    starter: string;
    main: string;
    dessert: string;
  };
}

interface WeddingEvent {
  eventName: string;
  eventDate: Date;
  activities: WeddingActivity[];
}

// Sample data - in a real app, this would come from an API
const weddingEvent: WeddingEvent = {
  eventName: "Mariage de Trésor & Marie",
  eventDate: new Date("2025-06-29"),
  activities: [
    {
      id: "act-001",
      title: "Cérémonie civile",
      startTime: new Date("2025-06-29T14:00:00"),
      endTime: new Date("2025-06-29T15:00:00"),
      location: "Mairie de Bordeaux",
      description: "Cérémonie officielle à la mairie",
      icon: "document-text",
      color: "#92400e", // Ambre foncé
      additionalInfo: "Tenue formelle recommandée"
    },
    {
      id: "act-002",
      title: "Cérémonie religieuse",
      startTime: new Date("2025-06-29T16:00:00"),
      endTime: new Date("2025-06-29T17:30:00"),
      location: "Église Saint-André",
      description: "Cérémonie religieuse suivie de la sortie des mariés",
      icon: "heart",
      color: "#92400e", // Ambre foncé
      additionalInfo: "Veuillez arriver 15 minutes avant le début"
    },
    {
      id: "act-003",
      title: "Cocktail & Photos",
      startTime: new Date("2025-06-29T18:00:00"),
      endTime: new Date("2025-06-29T19:30:00"),
      location: "Château Pape Clément - Jardins",
      description: "Cocktail dans les jardins du château avec séance photo",
      icon: "wine",
      color: "#b45309", // Ambre moyen-foncé
      additionalInfo: "Boissons et amuse-bouches servis"
    },
    {
      id: "act-004",
      title: "Dîner",
      startTime: new Date("2025-06-29T20:00:00"),
      endTime: new Date("2025-06-29T23:00:00"),
      location: "Château Pape Clément - Grand Salon",
      description: "Dîner gastronomique avec discours et animations",
      icon: "restaurant",
      color: "#d97706", // Ambre moyen
      additionalInfo: "Menu gastronomique 3 services",
      menu: {
        starter: "Foie gras mi-cuit et chutney de figues",
        main: "Filet de bœuf Wellington, purée truffée",
        dessert: "Pièce montée traditionnelle et mignardises"
      }
    },
    {
      id: "act-005",
      title: "Soirée dansante",
      startTime: new Date("2025-06-29T23:00:00"),
      endTime: new Date("2025-06-30T04:00:00"),
      location: "Château Pape Clément - Salle de Bal",
      description: "Ouverture du bal par les mariés suivie de la fête",
      icon: "musical-notes",
      color: "#9a3412", // Ambre très foncé
      additionalInfo: "Open bar et snacks de minuit disponibles"
    },
    {
      id: "act-006",
      title: "Brunch du lendemain",
      startTime: new Date("2025-06-30T11:00:00"),
      endTime: new Date("2025-06-30T14:00:00"),
      location: "Château Pape Clément - Terrasse",
      description: "Brunch décontracté pour les invités qui restent",
      icon: "cafe",
      color: "#f59e0b", // Ambre clair
      additionalInfo: "Tenue décontractée bienvenue"
    }
  ]
};

// Format time to display
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Format date to display
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

// Check if an activity is current
const isCurrentActivity = (activity: WeddingActivity, currentTime: Date): boolean => {
  return currentTime >= activity.startTime && currentTime <= activity.endTime;
};

// Activer les animations de layout pour Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Configuration personnalisée des animations pour les expansions - style Apple
const CustomLayoutAnimation = {
  duration: 350,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.85,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.85,
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.85,
  },
};

const ScheduleScreen = () => {
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);
  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Animation values for each section
  const locationOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const additionalInfoOpacity = useRef(new Animated.Value(0)).current;
  const menuOpacity = useRef(new Animated.Value(0)).current;
  
  // Animation values for slide-in
  const contentSlideY = useRef(new Animated.Value(20)).current;
  
  // Animation séquentielle pour l'ouverture du modal - style Apple fluide
  const startOpenAnimation = () => {
    // Reset animation values
    locationOpacity.setValue(0);
    descriptionOpacity.setValue(0);
    additionalInfoOpacity.setValue(0);
    menuOpacity.setValue(0);
    contentSlideY.setValue(20);
    
    // Séquence d'animation
    Animated.parallel([
      // Slide-in animation for all content - animation plus fluide style Apple
      Animated.timing(contentSlideY, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
        easing: Easing.out(Easing.bezier(0.2, 0.8, 0.2, 1.0))
      }),
      
      // Fade-in animations with sequence - style de séquence Apple
      Animated.stagger(80, [
        Animated.timing(locationOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1)
        }),
        Animated.timing(descriptionOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1)
        }),
        Animated.timing(additionalInfoOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1)
        }),
        Animated.timing(menuOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1)
        })
      ])
    ]).start();
  };
  
  // Animation pour fermeture du modal - style Apple
  const startCloseAnimation = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(contentSlideY, {
        toValue: 10,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.bezier(0.2, 0.8, 0.2, 1.0))
      }),
      Animated.timing(locationOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(descriptionOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(additionalInfoOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(menuOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      })
    ]).start(callback);
  };
  
  // Toggle activity expansion with animation
  const toggleActivity = (activityId: string): void => {
    // Configure layout animation for smooth transitions
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    
    // Update expanded state with animations
    if (expandedActivityId === activityId) {
      // Fermeture du modal - marquer l'activité comme "en fermeture"
      setExpandedActivityId(`closing-${activityId}`);
      // Démarrer l'animation de fermeture
      startCloseAnimation(() => {
        // Une fois l'animation terminée, fermer complètement
        setExpandedActivityId(null);
      });
    } else {
      // Ouverture du modal
      setExpandedActivityId(activityId);
      // Démarrer l'animation d'ouverture
      startOpenAnimation();
    }
  };

  useEffect(() => {
    // For demo purposes, we're using the current real time
    // In a real app, you might want to mock time to show the UI states
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Find current activity
      const current = weddingEvent.activities.find(a => 
        now >= a.startTime && now <= a.endTime
      );
      
      setCurrentActivityId(current ? current.id : null);
    }, 60000); // Update every minute
    
    // Initial check
    const now = new Date();
    const current = weddingEvent.activities.find(a => 
      now >= a.startTime && now <= a.endTime
    );
    setCurrentActivityId(current ? current.id : null);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <View className="flex-1 bg-neutral">
      <StatusBar barStyle="dark-content" />
      
      {/* En-tête avec effet de flou style Apple */}
      <View className="bg-neutral pt-4 px-5 pb-2 relative z-10">
        <BlurView intensity={20} tint="light" className="absolute inset-0" />
        <View className="mt-12 mb-2">
          <Text className="text-3xl font-semibold text-primary tracking-tight">Programme</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="calendar-outline" size={16} color="#92400e" style={{ marginRight: 6 }} />
            <Text className="text-primary/80 text-base font-medium">
              {formatDate(weddingEvent.eventDate)}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Timeline */}
      <ScrollView 
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative">
          {/* Ligne verticale */}
          <View 
            className="absolute left-6 top-0 bottom-0 w-[1.5px]"
            style={{ backgroundColor: 'rgba(146, 64, 14, 0.2)' }}
          />
          
          {weddingEvent.activities.map((activity, index) => (
            <View key={activity.id} className="mb-6 relative">
              {/* Timeline dot */}
              <View 
                className={`absolute left-6 size-12 rounded-full shadow-sm z-10 
                ${isCurrentActivity(activity, currentTime) ? 'border-2 ring-4 ring-amber-800 ring-opacity-30' : ''}`}
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderColor: activity.color,
                  transform: [{ translateX: -24 }],
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2
                }}
              >
                <View className="flex-1 items-center justify-center">
                  <Ionicons name={activity.icon as any} size={24} color={activity.color} />
                </View>
              </View>
              
              {/* Activity card - Style Apple avec blur effect */}
              <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => toggleActivity(activity.id)}
                className={`ml-16 rounded-2xl overflow-hidden
                ${isCurrentActivity(activity, currentTime) ? 'border-l-4' : ''}`}
                style={{ 
                  borderLeftColor: activity.color,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: expandedActivityId === activity.id ? 4 : 2 },
                  shadowOpacity: expandedActivityId === activity.id ? 0.15 : 0.08,
                  shadowRadius: expandedActivityId === activity.id ? 8 : 4,
                  elevation: expandedActivityId === activity.id ? 4 : 2,
                  // Animation will make the card pop slightly when expanded - style Apple
                  transform: expandedActivityId === activity.id ? [{ scale: 1.02 }, { translateY: -1 }] : [{ scale: 1 }, { translateY: 0 }]
                }}
              >
                <BlurView intensity={40} tint="light" className="absolute inset-0" />
                
                {/* Activity header */}
                <View className="p-4">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="font-semibold text-lg text-primary">{activity.title}</Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="time-outline" size={13} color="#92400e" style={{ marginRight: 5, opacity: 0.7 }} />
                        <Text className="text-primary/70 text-base">
                          {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                        </Text>
                      </View>
                    </View>
                    <Animated.View
                      style={{
                        transform: [{ 
                          rotate: expandedActivityId === activity.id ? '180deg' : '0deg' 
                        }]
                      }}
                    >
                      <Ionicons 
                        name="chevron-down"
                        size={20} 
                        color={expandedActivityId === activity.id ? activity.color : "#92400e"} 
                        style={{ opacity: expandedActivityId === activity.id ? 1 : 0.6 }}
                      />
                    </Animated.View>
                  </View>
                </View>
                
                {/* Activity details */}
                {(expandedActivityId === activity.id || expandedActivityId === `closing-${activity.id}`) && (
                  <Animated.View 
                    className="px-4 pb-5"
                    style={{
                      transform: [{ translateY: contentSlideY }]
                    }}
                  >
                    {/* Separator line - style Apple */}
                    <View className="h-[0.5px] bg-primary/15 mb-3" />
                    
                    {/* Location with fade-in */}
                    <Animated.View 
                      className="flex-row items-start mb-3"
                      style={{ opacity: locationOpacity }}
                    >
                      <Ionicons name="location-outline" size={18} color="#92400e" style={{ marginRight: 8, marginTop: 2, opacity: 0.8 }} />
                      <View>
                        <Text className="text-primary font-medium text-base">{activity.location}</Text>
                      </View>
                    </Animated.View>
                    
                    {/* Description with fade-in */}
                    <Animated.Text 
                      className="text-primary/80 text-base mb-4 leading-5"
                      style={{ opacity: descriptionOpacity }}
                    >
                      {activity.description}
                    </Animated.Text>
                    
                    {/* Additional info with fade-in - style Apple card */}
                    {activity.additionalInfo && (
                      <Animated.View 
                        className="bg-amber-50/50 rounded-xl p-3.5 mb-2"
                        style={{ opacity: additionalInfoOpacity }}
                      >
                        <Text className="text-primary/90 text-[15px]">{activity.additionalInfo}</Text>
                      </Animated.View>
                    )}
                    
                    {/* Menu with fade-in - style Apple */}
                    {activity.id === 'act-004' && activity.menu && (
                      <Animated.View 
                        className="mt-1 bg-amber-50/50 rounded-xl p-3.5"
                        style={{ opacity: menuOpacity }}
                      >
                        <Text className="font-semibold text-primary mb-2.5">Menu</Text>
                        <View className="space-y-2.5">
                          <View className="flex-row items-baseline">
                            <Text className="text-[15px] font-medium text-primary/70 w-20">Entrée</Text>
                            <Text className="text-[15px] text-primary/90 flex-1">{activity.menu.starter}</Text>
                          </View>
                          <View className="flex-row items-baseline">
                            <Text className="text-[15px] font-medium text-primary/70 w-20">Plat</Text>
                            <Text className="text-[15px] text-primary/90 flex-1">{activity.menu.main}</Text>
                          </View>
                          <View className="flex-row items-baseline">
                            <Text className="text-[15px] font-medium text-primary/70 w-20">Dessert</Text>
                            <Text className="text-[15px] text-primary/90 flex-1">{activity.menu.dessert}</Text>
                          </View>
                        </View>
                      </Animated.View>
                    )}
                  </Animated.View>
                )}
                
                {isCurrentActivity(activity, currentTime) && (
                  <View className="px-4 py-2.5 border-t border-primary/10" style={{backgroundColor: 'rgba(245, 158, 11, 0.08)'}}>
                    <Text className="text-secondary font-medium">En cours</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;