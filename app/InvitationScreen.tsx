import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const InvitationScreen = () => {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState('');

  const handleVerifyCode = () => {
    if (invitationCode.trim() !== '') {
      // Navigate to the main app screen (e.g., the tabs layout)
      router.replace('/(tabs)');
    } else {
      Alert.alert('Code Invalide', 'Veuillez entrer un code d\'invitation valide.');
    }
  };

  return (
    <LinearGradient
      colors={['#9333ea', '#9333ea']} // Same gradient as SplashScreen
      style={styles.container}
      className="flex-1 items-center justify-center p-6"
    >
        <Stack.Screen options={{ headerShown: false }} />

        <View className="w-full px-11">
        <Text className="text-3xl font-bold text-white text-center mb-8">
          Vérification
        </Text>
        <Text className="text-lg text-white text-center mb-6">
          Veuillez entrer votre code d'invitation.
        </Text>
        <TextInput
          className="bg-white/30 text-white placeholder-white/70 text-lg rounded-lg w-full p-4 mb-6 text-center"
          placeholder="Code d'invitation"
          placeholderTextColor="#E0E0E0"
          value={invitationCode}
          onChangeText={setInvitationCode}
          autoCapitalize="none"
        />
        <TouchableOpacity
          className="bg-secondary py-4 rounded-lg shadow-md"
          onPress={handleVerifyCode}
        >
          <Text className="text-white text-xl font-bold text-center">
            Vérifier
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default InvitationScreen;
