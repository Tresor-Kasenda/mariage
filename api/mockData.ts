import { GuestData, WeddingActivity, WeddingInfo } from '../types';

// Mock des invités
export const mockGuests: GuestData[] = [
  {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    tableNumber: '1',
    numberOfGuests: 2,
    dietaryRestrictions: 'Végétarien',
    confirmationStatus: 'Confirmé',
    qrCode: 'JEAN2025',
  },
  {
    name: 'Marie Martin',
    email: 'marie.martin@email.com',
    phone: '+33 6 23 45 67 89',
    tableNumber: '2',
    numberOfGuests: 3,
    dietaryRestrictions: 'Sans gluten',
    confirmationStatus: 'Confirmé',
    qrCode: 'MARIE2025',
  },
  {
    name: 'Pierre Dubois',
    email: 'pierre.dubois@email.com',
    phone: '+33 6 34 56 78 90',
    tableNumber: '3',
    numberOfGuests: 1,
    dietaryRestrictions: 'Aucune',
    confirmationStatus: 'En attente',
    qrCode: 'PIERRE2025',
  },
];

// Mock des informations du mariage
export const mockWeddingInfo: WeddingInfo = {
  coupleName: 'Sophie & Thomas',
  date: '15 Juin 2025',
  venue: {
    name: 'Château des Fleurs',
    address: '123 Avenue des Roses, 75000 Paris',
    locationLink: 'https://maps.google.com',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522
    }
  },
  dresscode: 'Tenue formelle - Couleurs claires',
  contactPerson: {
    name: 'Marie Martin',
    phone: '+33 6 98 76 54 32',
    email: 'marie.martin@email.com'
  }
};

// Mock des activités
export const mockActivities: WeddingActivity[] = [
  {
    id: 'ceremony',
    title: 'Cérémonie Civile',
    startTime: new Date('2025-06-15T14:00:00'),
    endTime: new Date('2025-06-15T15:00:00'),
    location: 'Mairie du 8ème arrondissement',
    description: 'Cérémonie officielle à la mairie',
    icon: 'document-text',
    color: '#92400e',
    additionalInfo: 'Merci d\'arriver 15 minutes en avance'
  },
  {
    id: 'church',
    title: 'Cérémonie Religieuse',
    startTime: new Date('2025-06-15T15:30:00'),
    endTime: new Date('2025-06-15T16:30:00'),
    location: 'Église Saint-Honoré',
    description: 'Cérémonie religieuse traditionnelle',
    icon: 'heart',
    color: '#b45309',
    additionalInfo: 'Photos autorisées pendant la cérémonie'
  },
  {
    id: 'cocktail',
    title: 'Cocktail',
    startTime: new Date('2025-06-15T17:00:00'),
    endTime: new Date('2025-06-15T19:00:00'),
    location: 'Jardins du Château',
    description: 'Cocktail et photos dans les jardins',
    icon: 'wine',
    color: '#d97706',
    additionalInfo: 'Bar à champagne et animations'
  },
  {
    id: 'dinner',
    title: 'Dîner',
    startTime: new Date('2025-06-15T19:30:00'),
    endTime: new Date('2025-06-15T23:00:00'),
    location: 'Grande Salle du Château',
    description: 'Dîner de réception',
    icon: 'restaurant',
    color: '#92400e',
    menu: {
      starter: 'Foie gras maison et son chutney de figues',
      main: 'Filet de bœuf Wellington, légumes de saison',
      dessert: 'Pièce montée traditionnelle'
    }
  },
  {
    id: 'party',
    title: 'Soirée Dansante',
    startTime: new Date('2025-06-15T23:00:00'),
    endTime: new Date('2025-06-16T04:00:00'),
    location: 'Salle de Bal du Château',
    description: 'Soirée dansante avec DJ',
    icon: 'musical-notes',
    color: '#b45309',
    additionalInfo: 'Open bar et animations surprises'
  }
];
