import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "./global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function _layout() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplashScreen();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen 
        name="splashscreen" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
