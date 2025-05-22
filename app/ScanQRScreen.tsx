import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Camera, CameraView } from "expo-camera";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Animation pour le scan - style Apple
const ScannerAnimatedBorder = () => {
  const scanAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1)
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1)
        })
      ])
    ).start();
  }, []);
  
  const borderOpacity = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9]
  });
  
  return (
    <Animated.View
      style={{
        opacity: borderOpacity,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <View className="w-full h-full relative">
        <View className="absolute -top-1.5 -left-1.5 w-[60px] h-[60px] border-t-[3px] border-l-[3px] border-primary rounded-tl-2xl" />
        <View className="absolute -top-1.5 -right-1.5 w-[60px] h-[60px] border-t-[3px] border-r-[3px] border-secondary rounded-tr-2xl" />
        <View className="absolute -bottom-1.5 -left-1.5 w-[60px] h-[60px] border-b-[3px] border-l-[3px] border-secondary rounded-bl-2xl" />
        <View className="absolute -bottom-1.5 -right-1.5 w-[60px] h-[60px] border-b-[3px] border-r-[3px] border-accent rounded-br-2xl" />
      </View>
    </Animated.View>
  );
};

const SharedFooterElements = () => (
  <>
    <TouchableOpacity 
      className="py-3.5 px-8 rounded-2xl mb-10"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Text className="text-amber-50 text-base font-semibold">Afficher votre code</Text>
    </TouchableOpacity>
    <Text className="text-amber-200 text-sm mb-3">
      Cherchez des codes QR
    </Text>
    <View className="flex-row items-center">
      <Text className="text-amber-50 text-base font-semibold mx-3">MARIAGE</Text>
      <View className="w-px h-5 bg-amber-200/50" />
      <Text className="text-amber-50 text-base font-semibold mx-3">INVITATION</Text>
    </View>
  </>
);

interface ScanResult {
  type: string;
  data: string;
}

const ScanQRScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Animation pour le succès de scan
  const successAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    setAuthError(null);
    
    // Animation de succès
    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1.0)
      }),
      Animated.timing(successAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1)
      }),
    ]).start(async () => {
      try {
        // Authentification avec le QR code
        const success = await login(data);
        
        if (success) {
          // Redirection vers l'index après authentification réussie
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 1500);
        } else {
          setAuthError("Code QR invalide. Veuillez réessayer avec un code valide.");
        }
      } catch (error) {
        console.error("Erreur lors de l'authentification:", error);
        setAuthError("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const toggleTorch = () => {
    setIsTorchOn(!isTorchOn);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#92400e', '#b45309', '#d97706']}
          start={[0, 0]}
          end={[1, 1]}
          className="absolute inset-0"
        />
        <View className="bg-white/10 p-6 rounded-2xl backdrop-blur-2xl">
          <Text className="text-amber-50 text-lg font-medium text-center">Initialisation de la caméra...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center p-5">
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#92400e', '#b45309', '#d97706']}
          start={[0, 0]}
          end={[1, 1]}
          className="absolute inset-0"
        />
        <BlurView intensity={20} tint="dark" className="p-6 rounded-2xl overflow-hidden">
          <Text className="text-amber-50 text-xl font-medium text-center mb-2">Accès refusé</Text>
          <Text className="text-amber-100/90 text-base text-center mb-6">
            L'application a besoin d'accéder à votre caméra pour scanner les QR codes d'invitation.
          </Text>
          <TouchableOpacity 
            onPress={openSettings}
            className="bg-white/20 py-3.5 px-6 rounded-xl"
          >
            <Text className="text-amber-50 font-semibold text-center">Ouvrir les Paramètres</Text>
          </TouchableOpacity>
        </BlurView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center bg-primary">
      <StatusBar barStyle="light-content" />
      
      {/* Header - Style iOS */}
      <View className="absolute top-0 left-0 right-0 z-20 flex-row justify-between items-center pt-14 px-5">
        <TouchableOpacity 
          className="h-10 w-10 rounded-full bg-black/10 items-center justify-center backdrop-blur-md" 
          onPress={() => router.replace('/splashscreen')}
        >
          <Ionicons name="close" size={22} color="#fef3c7" />
        </TouchableOpacity>
        <View className="flex-row">
          <TouchableOpacity 
            className="h-10 w-10 rounded-full bg-black/10 items-center justify-center backdrop-blur-md mx-1" 
            onPress={toggleTorch}
          >
            <Ionicons 
              name={isTorchOn ? "flashlight" : "flashlight-outline"} 
              size={20} 
              color="#fef3c7" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {!scanned ? (
        <>
          {/* Camera View */}
          <CameraView
            enableTorch={isTorchOn}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={StyleSheet.absoluteFillObject}
            className="flex-1"
          />
          
          {/* Interface avec effet dynamique style Apple */}
          <View className="flex-1 w-full pt-20">
            {/* Titre scan */}
            <View className="items-center pt-4">
              <BlurView intensity={40} tint="dark" className="px-6 py-3 rounded-full overflow-hidden">
                <Text className="text-amber-50 font-medium text-base">Scanner le code d'invitation</Text>
              </BlurView>
            </View>
            
            {/* Zone de scan */}
            <View className="flex-1 justify-center items-center">
              <View className="w-3/4 aspect-square relative">
                {/* Cadre de scan avec animation */}
                <ScannerAnimatedBorder />
              </View>
            </View>
            
            {/* Footer avec effet de flou et dégradé style iOS */}
            <View className="pb-12 pt-6 items-center">
              <LinearGradient
                colors={['rgba(146, 64, 14, 0)', 'rgba(146, 64, 14, 0.8)']}
                style={StyleSheet.absoluteFill}
                start={[0, 0]}
                end={[0, 0.7]}
              />
              <BlurView intensity={30} tint="dark" className="absolute inset-0" />
              <SharedFooterElements />
            </View>
          </View>
        </>
      ) : (
        // Résultat du scan avec animation élégante style Apple
        <View className="flex-1 items-center justify-center px-5 w-full">
          <LinearGradient
            colors={['#92400e', '#b45309', '#d97706']}
            start={[0, 0]}
            end={[1, 1]}
            className="absolute inset-0"
          />
          
          <Animated.View 
            className="items-center justify-center"
            style={{
              opacity: successAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              }),
              transform: [
                {
                  scale: successAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1]
                  })
                }
              ]
            }}
          >
            <View className="bg-white/10 rounded-3xl p-6 w-full max-w-xs backdrop-blur-md mb-6">
              <View className="items-center mb-4">
                {!authError ? (
                  <>
                    <View className="bg-green-400/90 rounded-full p-3 mb-4">
                      <Ionicons name="checkmark" size={30} color="white" />
                    </View>
                    <Text className="text-amber-50 text-2xl font-semibold text-center mb-1">
                      Code scanné !
                    </Text>
                    <Text className="text-amber-200 text-base text-center">
                      Invitation vérifiée avec succès
                    </Text>
                  </>
                ) : (
                  <>
                    <View className="bg-red-400/90 rounded-full p-3 mb-4">
                      <Ionicons name="close" size={30} color="white" />
                    </View>
                    <Text className="text-amber-50 text-2xl font-semibold text-center mb-1">
                      Code invalide
                    </Text>
                    <Text className="text-amber-200 text-base text-center">
                      {authError}
                    </Text>
                  </>
                )}
              </View>
              
              <View className="bg-white/10 rounded-xl p-4 mb-4">
                <Text className="text-amber-100 text-sm font-medium mb-1">Code invitation</Text>
                <Text className="text-amber-50 text-base font-semibold">{scannedData}</Text>
              </View>
              
              <TouchableOpacity 
                className="bg-white/20 py-3.5 rounded-xl w-full"
                onPress={() => {
                  setScanned(false);
                  setScannedData(null);
                }}
              >
                <Text className="text-amber-50 font-semibold text-center">Scanner à nouveau</Text>
              </TouchableOpacity>
            </View>
            
            <SharedFooterElements />
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScanQRScreen;
