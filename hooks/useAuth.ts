import { useAuth } from '../context/AuthContext';

// Réexporter le hook depuis le contexte
export { useAuth };

// Fonction de passerelle qui réexporte le hook useAuth comme export par défaut
// Cela répond à l'erreur de route d'Expo Router qui attend une export par défaut
export default function useAuthDefault() {
  return useAuth();
}
