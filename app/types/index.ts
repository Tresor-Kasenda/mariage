// Types communs pour l'application

export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Venue {
  name: string;
  address: string;
  locationLink: string;
  coordinates?: Coords;
}

export interface ContactPerson {
  name: string;
  phone: string;
  email?: string;
}

export interface WeddingInfo {
  coupleName: string;
  date: string;
  venue: Venue;
  dresscode: string;
  contactPerson: ContactPerson;
}

export interface GuestData {
  name: string;
  email: string;
  phone: string;
  tableNumber: string;
  numberOfGuests: number;
  dietaryRestrictions: string;
  confirmationStatus: 'Confirmé' | 'En attente' | 'Annulé';
  qrCode?: string;
}

export interface WeddingActivity {
  id: string;
  title: string;
  startTime: Date | string;
  endTime: Date | string;
  location: string;
  description: string;
  icon: string;
  color: string;
  additionalInfo?: string;
  menu?: {
    starter: string;
    main: string;
    dessert: string;
  };
}

export interface WeddingEvent {
  eventName: string;
  eventDate: Date;
  activities: WeddingActivity[];
}

// Types pour les routes
export type RootStackParamList = {
  splashscreen: undefined;
  ScanQRScreen: undefined;
  InvitationScreen: undefined;
  '(tabs)': undefined;
};

export type TabParamList = {
  index: undefined;
  schedule: undefined;
  setting: undefined;
};
