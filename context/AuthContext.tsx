import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authService, guestService } from '../api/apiService';
import { GuestData } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  guest: GuestData | null;
  login: (qrCode: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Valeurs par défaut du contexte
const defaultContext: AuthContextType = {
  isAuthenticated: false,
  isLoading: true,
  guest: null,
  login: async () => false,
  logout: async () => {},
};

// Création du contexte
export const AuthContext = createContext<AuthContextType>(defaultContext);

// Hook pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Fournisseur du contexte
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    isLoading: true,
    guest: null as GuestData | null,
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const guestData = await AsyncStorage.getItem('guest_data');
        
        if (token && guestData) {
          const guest = JSON.parse(guestData) as GuestData;
          setState({
            isAuthenticated: true,
            isLoading: false,
            guest,
          });
        } else {
          setState({
            isAuthenticated: false,
            isLoading: false,
            guest: null,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        setState({
          isAuthenticated: false,
          isLoading: false,
          guest: null,
        });
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion par QR code
  const login = async (qrCode: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Vérifier le QR code auprès de l'API
      const isValid = await authService.verifyInvitationCode(qrCode);
      
      if (!isValid) {
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
      
      // Récupérer les informations de l'invité
      const guest = await guestService.verifyQRCode(qrCode);
      
      if (!guest) {
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
      
      // Générer un token fictif
      const token = `auth-token-${Date.now()}`;
      
      // Stocker les données d'authentification
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('guest_data', JSON.stringify(guest));
      
      // Mettre à jour l'état
      setState({
        isAuthenticated: true,
        isLoading: false,
        guest,
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = async (): Promise<void> => {
    try {
      // Supprimer les données stockées
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('guest_data');
      
      // Réinitialiser l'état
      setState({
        isAuthenticated: false,
        isLoading: false,
        guest: null,
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Valeurs du contexte
  const contextValue: AuthContextType = {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    guest: state.guest,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};