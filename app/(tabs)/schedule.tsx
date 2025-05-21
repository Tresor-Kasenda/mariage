import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
      color: "#9333ea",
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
      color: "#9333ea",
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
      color: "#f472b6",
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
      color: "#fbbf24",
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
      color: "#ec4899",
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
      color: "#60a5fa",
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

  // Toggle activity expansion
  const toggleActivity = (activityId: string): void => {
    if (expandedActivityId === activityId) {
      setExpandedActivityId(null);
    } else {
      setExpandedActivityId(activityId);
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
    <View className="flex-1 bg-[#fef3c7]">
      {/* En-tête */}
      <View className="bg-[#fef3c7] py-6 px-4 rounded-b-xl">
        <View className="bg-primary/20 rounded-xl p-4 mb-2 mt-14">
          <Text className="text-primary text-lg font-bold">{weddingEvent.eventName}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="calendar" size={14} color="white" style={{ opacity: 0.8, marginRight: 4 }} />
            <Text className="text-primary opacity-90 text-sm">{formatDate(weddingEvent.eventDate)}</Text>
          </View>
        </View>
      </View>
      
      {/* Timeline */}
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative">
          {/* Ligne verticale */}
          <View className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></View>
          
          {weddingEvent.activities.map((activity, index) => (
            <View key={activity.id} className="mb-4 relative">
              {/* Timeline dot */}
              <View 
                className={`absolute left-4 size-12 rounded-full shadow z-10 
                ${isCurrentActivity(activity, currentTime) ? 'border-2 ring-4 ring-opacity-50' : ''} 
                bg-white flex items-center justify-center`}
                style={{ 
                  borderColor: activity.color,
                  transform: [{ translateX: -16 }],
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.5,
                  elevation: 2
                }}
              >
                <Ionicons name={activity.icon} size={22} color={activity.color} />
              </View>
              
              {/* Activity card */}
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => toggleActivity(activity.id)}
                className={`ml-16 rounded-xl overflow-hidden shadow-sm 
                ${isCurrentActivity(activity, currentTime) ? 'border-l-4' : 'border-l-0'}`}
                style={{ 
                  borderLeftColor: activity.color,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.5,
                  elevation: expandedActivityId === activity.id ? 3 : 1
                }}
              >
                {/* Activity header */}
                <View className="p-4">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="font-bold text-slate-800">{activity.title}</Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="time-outline" size={12} color="#64748b" style={{ marginRight: 4 }} />
                        <Text className="text-slate-500 text-sm">
                          {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                        </Text>
                      </View>
                    </View>
                    <Ionicons 
                      name={expandedActivityId === activity.id ? "chevron-up" : "chevron-down"} 
                      size={18} 
                      color="#94a3b8" 
                    />
                  </View>
                </View>
                
                {/* Activity details */}
                {expandedActivityId === activity.id && (
                  <View className="px-4 pb-4 bg-white">
                    <View className="flex-row items-start mb-3">
                      <Ionicons name="location" size={16} color="#64748b" style={{ marginRight: 8, marginTop: 2 }} />
                      <View>
                        <Text className="text-slate-700 font-medium">{activity.location}</Text>
                      </View>
                    </View>
                    
                    <Text className="text-slate-600 mb-3">{activity.description}</Text>
                    
                    {activity.additionalInfo && (
                      <View className="bg-slate-50 p-3 rounded-lg mt-2">
                        <Text className="text-slate-600 text-sm">{activity.additionalInfo}</Text>
                      </View>
                    )}
                    
                    {activity.id === 'act-004' && activity.menu && (
                      <View className="mt-3">
                        <Text className="font-medium text-slate-700 mb-2">Menu</Text>
                        <View className="space-y-2">
                          <View className="flex-row items-baseline">
                            <Text className="text-sm font-medium text-slate-500 w-16">Entrée</Text>
                            <Text className="text-sm text-slate-700">{activity.menu.starter}</Text>
                          </View>
                          <View className="flex-row items-baseline">
                            <Text className="text-sm font-medium text-slate-500 w-16">Plat</Text>
                            <Text className="text-sm text-slate-700">{activity.menu.main}</Text>
                          </View>
                          <View className="flex-row items-baseline">
                            <Text className="text-sm font-medium text-slate-500 w-16">Dessert</Text>
                            <Text className="text-sm text-slate-700">{activity.menu.dessert}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )}
                
                {isCurrentActivity(activity, currentTime) && (
                  <View className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-slate-100">
                    <Text className="text-purple-600 text-sm font-medium">En cours</Text>
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