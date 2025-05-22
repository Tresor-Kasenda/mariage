import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Style du texte pour le design Apple
        tabBarLabelStyle: {
          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#92400e', // Ambre foncé pour la couleur active
        tabBarInactiveTintColor: '#92400e80', // Ambre foncé avec opacité réduite
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(254, 243, 199, 0.85)', // Couleur neutre avec transparence
          height: 85,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 8,
        },
        // Effet de flou style Apple
        tabBarBackground: () => (
          <BlurView 
            intensity={20} 
            tint="light" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Programme',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <Ionicons 
                name={focused ? "calendar" : "calendar-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="beverages"
        options={{
          title: 'Boissons',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <Ionicons 
                name={focused ? "wine" : "wine-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          )
        }}
      />
    </Tabs>
  )
}

export default _layout