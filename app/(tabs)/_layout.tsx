import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9333ea',
        tabBarInactiveTintColor: '#888',
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#fef3c7',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          position: 'absolute',
          bottom: 0,
          overflow: 'hidden',
          shadowColor: '#000',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => 
            <Feather 
              name="home" 
              size={size} 
              color={color} 
            />
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Programme',
          tabBarIcon: ({color, size}) => 
            <Feather 
              name="calendar" 
              size={size} 
              color={color} 
            />
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Parametre',
          tabBarIcon: ({color, size}) => 
            <Feather 
              name="settings" 
              size={size} 
              color={color} 
            />
        }}
      />
    </Tabs>
  )
}

export default _layout