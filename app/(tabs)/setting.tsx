import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Données temporaires pour la démonstration
const guestData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+33 6 12 34 56 78',
  tableNumber: '5',
  numberOfGuests: 2,
  dietaryRestrictions: 'Aucune',
  confirmationStatus: 'Confirmé',
};

const weddingInfo = {
  coupleName: 'Sophie & Thomas',
  date: '15 Juin 2025',
  venue: {
    name: 'Château des Fleurs',
    address: '123 Avenue des Roses, 75000 Paris',
    locationLink: 'https://maps.google.com',
  },
  dresscode: 'Tenue formelle - Couleurs claires',
  contactPerson: {
    name: 'Marie Martin',
    phone: '+33 6 98 76 54 32',
  },
};

const Setting = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        bounces={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header - Style Apple avec image de couverture et effet de flou */}
        <View className="items-center">
          <View className="h-40 w-full overflow-hidden">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2787&auto=format&fit=crop' }} 
              className="w-full h-full"
              style={{ resizeMode: "cover" }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(254, 243, 199, 1)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 60
              }}
            />
          </View>
          
          <View className="w-28 h-28 rounded-full overflow-hidden border-4 border-neutral mt-[-56px] mb-2 shadow-lg">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1698220175361-dd634ee17ee2?q=80&w=1974&auto=format&fit=crop' }} 
              className="w-full h-full"
              style={{ resizeMode: "cover" }}
            />
          </View>
          
          <Text 
            className="text-3xl font-semibold text-primary text-center"
            style={{ 
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
            }}
          >
            {weddingInfo.coupleName}
          </Text>
          
          <Text 
            className="text-lg text-primary/70 mt-0.5 mb-4"
            style={{ 
              fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
            }}
          >
            {weddingInfo.date}
          </Text>
        </View>

        {/* Profile Section - Style Apple Card avec flou */}
        <View className="mx-5 mb-6">
          <View className="flex-row items-center justify-between mb-2 px-1">
            <Text 
              className="text-xl font-semibold text-primary"
              style={{ 
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
              }}
            >
              Mon Profil
            </Text>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#92400e" />
            </TouchableOpacity>
          </View>
          
          <BlurView intensity={60} tint="light" className="rounded-2xl overflow-hidden shadow-sm">
            <View className="p-5">
              <View className="flex-row items-center mb-6">
                <View className="size-16 bg-secondary/10 rounded-full items-center justify-center border border-secondary/20">
                  <Text 
                    className="text-2xl font-semibold text-primary"
                    style={{ 
                      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
                    }}
                  >
                    {guestData.name.charAt(0)}
                  </Text>
                </View>
                <View className="ml-4">
                  <Text 
                    className="text-lg font-medium text-primary"
                    style={{ 
                      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
                    }}
                  >
                    {guestData.name}
                  </Text>
                  <Text 
                    className="text-base text-primary/70"
                    style={{ 
                      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
                    }}
                  >
                    {guestData.email}
                  </Text>
                </View>
              </View>

              <View>
                <InfoRow icon="call-outline" label="Téléphone" value={guestData.phone} />
                <InfoRow icon="people-outline" label="Invités" value={guestData.numberOfGuests.toString()} />
                <InfoRow icon="grid-outline" label="Table" value={`N° ${guestData.tableNumber}`} />
                <InfoRow icon="nutrition-outline" label="Régime" value={guestData.dietaryRestrictions} />
                <InfoRow icon="checkmark-circle-outline" label="Statut" value={guestData.confirmationStatus} />
              </View>
            </View>
          </BlurView>
        </View>

        {/* Wedding Info Section - Style Apple Card avec flou */}
        <View className="mx-5 mb-24">
          <View className="flex-row items-center justify-between mb-2 px-1">
            <Text 
              className="text-xl font-semibold text-primary"
              style={{ 
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
              }}
            >
              Informations Cérémonie
            </Text>
            <TouchableOpacity>
              <Ionicons name="information-circle-outline" size={22} color="#92400e" />
            </TouchableOpacity>
          </View>
          
          <BlurView intensity={60} tint="light" className="rounded-2xl overflow-hidden shadow-sm">
            <View className="p-5">
              <InfoRow icon="location-outline" label="Lieu" value={weddingInfo.venue.name} />
              <InfoRow icon="map-outline" label="Adresse" value={weddingInfo.venue.address} />
              
              <TouchableOpacity 
                className="flex-row items-center justify-center my-4 py-3.5 rounded-xl"
                style={{ backgroundColor: 'rgba(146, 64, 14, 0.1)' }}
                onPress={() => setShowMap(!showMap)}
              >
                <Ionicons name="navigate-outline" size={20} color="#92400e" />
                <Text 
                  className="ml-2 text-primary font-medium"
                  style={{ 
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
                  }}
                >
                  Ouvrir dans Plans
                </Text>
              </TouchableOpacity>

              <InfoRow icon="calendar-outline" label="Date" value={weddingInfo.date} />
              <InfoRow icon="shirt-outline" label="Dress code" value={weddingInfo.dresscode} />
              
              <View className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(146, 64, 14, 0.07)' }}>
                <Text 
                  className="font-medium text-primary mb-2 text-base"
                  style={{ 
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
                  }}
                >
                  Contact d'urgence
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="person-outline" size={18} color="#92400e" style={{ marginRight: 6, opacity: 0.7 }} />
                  <Text className="text-primary/80">
                    {weddingInfo.contactPerson.name}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="call-outline" size={18} color="#92400e" style={{ marginRight: 6, opacity: 0.7 }} />
                  <Text className="text-primary/80">
                    {weddingInfo.contactPerson.phone}
                  </Text>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Composant utilitaire pour afficher une ligne d'information
interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <View className="flex-row items-center py-3.5 border-b border-primary/10">
    <Ionicons name={icon as any} size={20} color="#92400e" style={{opacity: 0.8}} />
    <Text 
      className="ml-3 text-primary/70 text-base w-24"
      style={{ 
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
      }}
    >
      {label}
    </Text>
    <Text 
      className="flex-1 text-primary text-base"
      style={{ 
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
      }}
    >
      {value}
    </Text>
    <Ionicons name="chevron-forward" size={18} color="#92400e" style={{opacity: 0.4}} />
  </View>
);

export default Setting;