import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "./global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Composant principal qui encapsule l'app avec le context d'authentification
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

// Composant pour gérer la protection des routes
function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();

  // Vérifier si l'utilisateur est sur un écran protégé
  const isProtectedRoute = segments[0] === "(tabs)";

  useEffect(() => {
    // Hide splash screen once the app is ready
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplashScreen();
  }, []);

  // Si l'app est en chargement, afficher le stack normalement sans redirection
  if (isLoading) {
    return (
      <Stack>
        <Stack.Screen name="splashscreen" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!isAuthenticated && isProtectedRoute) {
    return <Redirect href="/splashscreen" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="splashscreen" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ScanQRScreen" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
