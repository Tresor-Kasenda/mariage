import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

// Couleurs d'amour vives pour les activités
const weddingEvent: WeddingEvent = {
  eventName: "Mariage de Trésor & Rosalinda",
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
      color: "#e11d48", // Rouge vif
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
      color: "#be185d", // Rose foncé
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
      color: "#db2777", // Rose vif
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
      color: "#f43f5e", // Rose-rouge
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
      color: "#a21caf", // Violet vif
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
      color: "#c026d3", // Fuchsia
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

const ScheduleScreen = () => {
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);
  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  // Animation de l'ouverture des details
  const [animation] = useState(new Animated.Value(0));

  // Toggle activity expansion avec animation
  const toggleActivity = (activityId: string): void => {
    if (expandedActivityId === activityId) {
      // Animation pour fermer
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
      setTimeout(() => setExpandedActivityId(null), 300);
    } else {
      setExpandedActivityId(activityId);
      // Animation pour ouvrir
      Animated.spring(animation, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true
      }).start();
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
    <View className="flex-1 bg-rose-50">
      {/* En-tête avec dégradé de couleurs vives */}
      <View className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 py-6 px-4 rounded-b-3xl shadow-xl">
        <View className="bg-white/20 rounded-xl p-4 mb-2 mt-14 border border-white/30 backdrop-blur-sm">
          <Text className="text-white text-xl font-bold">{weddingEvent.eventName}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="heart" size={14} color="white" style={{ opacity: 0.8, marginRight: 4 }} />
            <Text className="text-white opacity-90 text-sm">{formatDate(weddingEvent.eventDate)}</Text>
          </View>
        </View>
      </View>
      
      {/* Timeline avec animations */}
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative">
          {/* Ligne verticale colorée */}
          <View className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-fuchsia-300 via-pink-300 to-rose-300 rounded-full"></View>
          
          {weddingEvent.activities.map((activity, index) => (
            <View key={activity.id} className="mb-6 relative">
              {/* Timeline dot animé */}
              <View 
                className={`absolute left-4 w-10 h-10 rounded-full shadow-md z-10 
                ${isCurrentActivity(activity, currentTime) 
                  ? 'border-2 animate-pulse' 
                  : 'border border-white/80'} 
                bg-gradient-to-br from-white to-rose-50 flex items-center justify-center`}
                style={{ 
                  borderColor: activity.color,
                  transform: [{ translateX: -20 }],
                  shadowColor: activity.color,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 4
                }}
              >
                {activity.id === "act-001" && <Ionicons name="document-text" size={18} color={activity.color} />}
                {activity.id === "act-002" && <Ionicons name="heart" size={18} color={activity.color} />}
                {activity.id === "act-003" && <Ionicons name="wine" size={18} color={activity.color} />}
                {activity.id === "act-004" && <Ionicons name="restaurant" size={18} color={activity.color} />}
                {activity.id === "act-005" && <Ionicons name="musical-notes" size={18} color={activity.color} />}
                {activity.id === "act-006" && <Ionicons name="cafe" size={18} color={activity.color} />}
              </View>
              
              {/* Activity card */}
              <Animated.View
                style={{
                  marginLeft: 40,
                  transform: [
                    { 
                      scale: expandedActivityId === activity.id 
                        ? animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.02]
                          }) 
                        : 1 
                    }
                  ],
                }}
              >
                <TouchableOpacity 
                  activeOpacity={0.6}
                  onPress={() => toggleActivity(activity.id)}
                  className={`rounded-xl overflow-hidden shadow-sm
                  ${isCurrentActivity(activity, currentTime) ? 'border-l-4' : 'border-l-0'}`}
                  style={{ 
                    borderLeftColor: activity.color,
                    backgroundColor: 'white',
                    shadowColor: activity.color,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: expandedActivityId === activity.id ? 5 : 2
                  }}
                >
                  {/* Activity header */}
                  <View className={`p-5 ${
                    expandedActivityId === activity.id 
                      ? 'bg-gradient-to-r from-white to-rose-50' 
                      : 'bg-white'
                  }`}>
                    <View className="flex-row justify-between items-center">
                      <View>
                        <Text className="font-bold text-slate-800 text-lg">{activity.title}</Text>
                        <View className="flex-row items-center mt-1">
                          <Ionicons name="time-outline" size={14} color={activity.color} style={{ marginRight: 4 }} />
                          <Text className="text-slate-500 text-sm">
                            {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                          </Text>
                        </View>
                      </View>
                      <Animated.View
                        style={{
                          transform: [{
                            rotate: expandedActivityId === activity.id
                              ? animation.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0deg', '180deg']
                                })
                              : '0deg'
                          }]
                        }}
                      >
                        <Ionicons 
                          name="chevron-down"
                          size={22} 
                          color={activity.color} 
                        />
                      </Animated.View>
                    </View>
                  </View>
                  
                  {/* Activity details avec animation */}
                  {expandedActivityId === activity.id && (
                    <Animated.View
                      style={{
                        opacity: animation,
                        transform: [
                          {
                            translateY: animation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-20, 0]
                            })
                          }
                        ]
                      }}
                    >
                      <View className="px-5 pb-5 bg-white">
                        <View className="flex-row items-start mb-3 mt-2">
                          <Ionicons name="location" size={16} color={activity.color} style={{ marginRight: 8, marginTop: 2 }} />
                          <View>
                            <Text className="text-slate-700 font-medium">{activity.location}</Text>
                          </View>
                        </View>
                        
                        <Text className="text-slate-600 mb-4">{activity.description}</Text>
                        
                        {activity.additionalInfo && (
                          <View className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl mt-2 border border-pink-100">
                            <Text className="text-slate-700 text-sm">{activity.additionalInfo}</Text>
                          </View>
                        )}
                        
                        {activity.id === 'act-004' && activity.menu && (
                          <View className="mt-4">
                            <Text className="font-medium text-slate-700 mb-3 text-center">Menu</Text>
                            <View className="space-y-3 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
                              <View className="flex-row items-baseline">
                                <Text className="text-sm font-medium text-amber-800 w-16">Entrée</Text>
                                <Text className="text-sm text-amber-900">{activity.menu.starter}</Text>
                              </View>
                              <View className="flex-row items-baseline">
                                <Text className="text-sm font-medium text-amber-800 w-16">Plat</Text>
                                <Text className="text-sm text-amber-900">{activity.menu.main}</Text>
                              </View>
                              <View className="flex-row items-baseline">
                                <Text className="text-sm font-medium text-amber-800 w-16">Dessert</Text>
                                <Text className="text-sm text-amber-900">{activity.menu.dessert}</Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    </Animated.View>
                  )}
                  
                  {isCurrentActivity(activity, currentTime) && (
                    <View className="px-4 py-3 bg-gradient-to-r from-fuchsia-100 via-pink-100 to-rose-100 border-t border-pink-200">
                      <View className="flex-row items-center justify-center">
                        <Ionicons name="heart" size={14} color="#be185d" className="animate-pulse" style={{ marginRight: 6 }} />
                        <Text className="text-pink-700 text-sm font-medium">En cours</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>
          ))}
        </View>
        
        {/* Espace en bas pour un meilleur scroll */}
        <View className="h-20"></View>
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;