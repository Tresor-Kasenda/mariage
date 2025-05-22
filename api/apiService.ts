import { GuestData, WeddingActivity, WeddingInfo } from '../types';
import { mockActivities, mockGuests, mockWeddingInfo } from './mockData';

// Simuler un délai d'API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Service API pour les invités
export const guestService = {
  // Vérifier un code QR
  verifyQRCode: async (code: string): Promise<GuestData | null> => {
    await delay(1000); // Simuler la latence réseau
    const guest = mockGuests.find(g => g.qrCode === code);
    if (!guest) {
      throw new Error('Code QR invalide');
    }
    return guest;
  },

  // Récupérer les informations d'un invité
  getGuestInfo: async (email: string): Promise<GuestData | null> => {
    await delay(800);
    return mockGuests.find(g => g.email === email) || null;
  },

  // Mettre à jour les informations d'un invité
  updateGuestInfo: async (email: string, updates: Partial<GuestData>): Promise<GuestData> => {
    await delay(1200);
    const guestIndex = mockGuests.findIndex(g => g.email === email);
    if (guestIndex === -1) {
      throw new Error('Invité non trouvé');
    }
    const updatedGuest = { ...mockGuests[guestIndex], ...updates };
    mockGuests[guestIndex] = updatedGuest;
    return updatedGuest;
  }
};

// Service API pour les informations du mariage
export const weddingService = {
  // Récupérer les informations générales
  getWeddingInfo: async (): Promise<WeddingInfo> => {
    await delay(600);
    return mockWeddingInfo;
  },

  // Récupérer le programme des activités
  getActivities: async (): Promise<WeddingActivity[]> => {
    await delay(800);
    return mockActivities;
  },

  // Récupérer une activité spécifique
  getActivity: async (id: string): Promise<WeddingActivity | null> => {
    await delay(500);
    return mockActivities.find(a => a.id === id) || null;
  }
};

// Service API pour l'authentification
export const authService = {
  // Vérifier un code d'invitation
  verifyInvitationCode: async (code: string): Promise<boolean> => {
    await delay(1500);
    // Simuler une vérification de code d'invitation
    const validCodes = mockGuests.map(g => g.qrCode);
    return validCodes.includes(code);
  },

  // Simuler une connexion
  login: async (code: string): Promise<{ token: string; guest: GuestData }> => {
    await delay(2000);
    const guest = mockGuests.find(g => g.qrCode === code);
    if (!guest) {
      throw new Error('Code d\'invitation invalide');
    }
    return {
      token: `fake-jwt-token-${Date.now()}`,
      guest
    };
  }
};
