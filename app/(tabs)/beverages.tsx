import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const BeveragesScreen = () => {
  const { guest } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'alcoholic' | 'nonalcoholic' | 'cocktails' | 'all'>('all');

  const beverages = [
    {
      id: 'champagne',
      name: 'Champagne Moët & Chandon',
      description: 'Champagne brut impérial, notes fruitées et légères',
      category: 'alcoholic',
      image: require('../../assets/images/logo.png'), // Remplacer par l'image appropriée
      icon: 'wine-outline'
    },
    {
      id: 'wine1',
      name: 'Vin blanc - Chablis 2022',
      description: 'Frais et minéral, parfait pour l\'apéritif',
      category: 'alcoholic',
      image: require('../../assets/images/logo.png'),
      icon: 'wine-outline'
    },
    {
      id: 'wine2',
      name: 'Vin rouge - Saint-Émilion 2018',
      description: 'Rond et fruité, accompagne parfaitement les plats',
      category: 'alcoholic',
      image: require('../../assets/images/logo.png'),
      icon: 'wine-outline'
    },
    {
      id: 'cocktail1',
      name: 'Cocktail Signature - Amour Passion',
      description: 'Vodka, fruits de la passion et jus de cranberry',
      category: 'cocktails',
      image: require('../../assets/images/logo.png'),
      icon: 'beer-outline'
    },
    {
      id: 'cocktail2',
      name: 'Spritz Royal',
      description: 'Aperol, prosecco et orange, une touche d\'élégance',
      category: 'cocktails',
      image: require('../../assets/images/logo.png'),
      icon: 'beer-outline'
    },
    {
      id: 'soft1',
      name: 'Eaux minérales',
      description: 'Plate ou pétillante, à volonté',
      category: 'nonalcoholic',
      image: require('../../assets/images/logo.png'),
      icon: 'water-outline'
    },
    {
      id: 'soft2',
      name: 'Jus de fruits frais',
      description: 'Orange, pomme, ananas ou multi-fruits',
      category: 'nonalcoholic',
      image: require('../../assets/images/logo.png'),
      icon: 'water-outline'
    },
    {
      id: 'soft3',
      name: 'Mocktails',
      description: 'Virgin Mojito et Fruits Rouges Pétillant',
      category: 'nonalcoholic',
      image: require('../../assets/images/logo.png'),
      icon: 'water-outline'
    },
  ];

  // Filtrer les boissons selon la catégorie sélectionnée
  const filteredBeverages = selectedCategory === 'all' 
    ? beverages 
    : beverages.filter(b => b.category === selectedCategory);

  // Rendu d'une carte de boisson
  const renderBeverageCard = (beverage: typeof beverages[0]) => (
    <View key={beverage.id} className="mb-4">
      <BlurView intensity={40} tint="light" className="rounded-2xl overflow-hidden">
        <View className="p-4 bg-white/10">
          <View className="flex-row">
            <View className="w-12 h-12 rounded-full bg-amber-500/20 items-center justify-center mr-4">
              <Ionicons name={beverage.icon as any} size={24} color="#fef3c7" />
            </View>
            <View className="flex-1">
              <Text className="text-amber-50 font-bold text-lg">
                {beverage.name}
              </Text>
              <Text className="text-amber-200/90 text-sm mt-1">
                {beverage.description}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );

  return (
    <View className="flex-1 bg-amber-900">
      <LinearGradient
        colors={['#92400e', '#b45309', '#78350f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      
      {/* Header avec information de l'invité et de sa table */}
      <View className="pt-16 pb-4 px-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-amber-200 text-sm">Bonjour</Text>
            <Text className="text-white text-xl font-bold">{guest?.name || 'Invité'}</Text>
          </View>
          <View className="bg-white/20 px-4 py-2 rounded-xl">
            <Text className="text-white font-medium">Table {guest?.tableNumber || '-'}</Text>
          </View>
        </View>
      </View>
      
      {/* Filtres de catégories */}
      <View className="px-6 py-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          className="space-x-3"
        >
          <TouchableOpacity 
            className={`px-4 py-2 rounded-xl ${selectedCategory === 'all' ? 'bg-amber-500/30' : 'bg-white/10'}`}
            onPress={() => setSelectedCategory('all')}
          >
            <Text className="text-white font-medium">Tous</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`px-4 py-2 rounded-xl ${selectedCategory === 'alcoholic' ? 'bg-amber-500/30' : 'bg-white/10'}`}
            onPress={() => setSelectedCategory('alcoholic')}
          >
            <Text className="text-white font-medium">Alcools</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`px-4 py-2 rounded-xl ${selectedCategory === 'cocktails' ? 'bg-amber-500/30' : 'bg-white/10'}`}
            onPress={() => setSelectedCategory('cocktails')}
          >
            <Text className="text-white font-medium">Cocktails</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`px-4 py-2 rounded-xl ${selectedCategory === 'nonalcoholic' ? 'bg-amber-500/30' : 'bg-white/10'}`}
            onPress={() => setSelectedCategory('nonalcoholic')}
          >
            <Text className="text-white font-medium">Sans alcool</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Liste des boissons */}
      <ScrollView 
        className="flex-1 px-6 pt-2 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-2xl font-bold mb-6">
          Boissons {selectedCategory !== 'all' && (
            selectedCategory === 'alcoholic' ? 'Alcoolisées' : 
            selectedCategory === 'cocktails' ? 'Cocktails' : 'Sans Alcool'
          )}
        </Text>
        
        <View>
          {filteredBeverages.map(renderBeverageCard)}
        </View>
        
        {/* Note de service */}
        <View className="bg-white/10 rounded-xl p-4 mt-4 mb-12">
          <Text className="text-amber-50 font-medium mb-1">Service des boissons</Text>
          <Text className="text-amber-200/90 text-sm">
            Les boissons sont servies au bar principal et aux bars mobiles. N'hésitez pas à demander conseil à nos serveurs pour des accords mets et boissons.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BeveragesScreen;
