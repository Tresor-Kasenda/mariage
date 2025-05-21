import { Stack } from "expo-router";
import React from "react";
import "./global.css";

export default function RootLayout() {
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
