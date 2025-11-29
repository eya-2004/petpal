// src/services/localStorageService.js

const STORAGE_KEYS = {
  USER: 'petpal_user',
  AUTH: 'petpal_auth',
  BOOKINGS: 'petpal_bookings',
  MESSAGES: 'petpal_messages',
  NOTIFICATIONS: 'petpal_notifications',
  SITTERS: 'petpal_sitters',
  PROFILE: 'petpal_profile'
};

class LocalStorageService {
  // Sauvegarder des données
  static save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde des données pour ${key}:`, error);
    }
  }

  // Charger des données
  static load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Erreur lors du chargement des données pour ${key}:`, error);
      return defaultValue;
    }
  }

  // Supprimer des données
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erreur lors de la suppression des données pour ${key}:`, error);
    }
  }

  // Vider tout le stockage
  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erreur lors du vidage du stockage:', error);
    }
  }

  // Sauvegarder l'utilisateur
  static saveUser(user) {
    this.save(STORAGE_KEYS.USER, user);
  }

  // Charger l'utilisateur
  static loadUser() {
    return this.load(STORAGE_KEYS.USER, null);
  }

  // Sauvegarder l'état d'authentification
  static saveAuth(authData) {
    this.save(STORAGE_KEYS.AUTH, authData);
  }

  // Charger l'état d'authentification
  static loadAuth() {
    return this.load(STORAGE_KEYS.AUTH, { isAuthenticated: false, userType: 'owner' });
  }

  // Sauvegarder les réservations
  static saveBookings(bookings) {
    this.save(STORAGE_KEYS.BOOKINGS, bookings);
  }

  // Charger les réservations
  static loadBookings() {
    return this.load(STORAGE_KEYS.BOOKINGS, []);
  }

  // Sauvegarder les messages
  static saveMessages(messages) {
    this.save(STORAGE_KEYS.MESSAGES, messages);
  }

  // Charger les messages
  static loadMessages() {
    return this.load(STORAGE_KEYS.MESSAGES, []);
  }

  // Sauvegarder les notifications
  static saveNotifications(notifications) {
    this.save(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // Charger les notifications
  static loadNotifications() {
    return this.load(STORAGE_KEYS.NOTIFICATIONS, []);
  }

  // Sauvegarder les sitters
  static saveSitters(sitters) {
    this.save(STORAGE_KEYS.SITTERS, sitters);
  }

  // Charger les sitters
  static loadSitters() {
    return this.load(STORAGE_KEYS.SITTERS, []);
  }

  // Sauvegarder le profil
  static saveProfile(profile) {
    this.save(STORAGE_KEYS.PROFILE, profile);
  }

  // Charger le profil
  static loadProfile() {
    return this.load(STORAGE_KEYS.PROFILE, {});
  }

  // Déconnexion
  static logout() {
    this.remove(STORAGE_KEYS.USER);
    this.remove(STORAGE_KEYS.AUTH);
    // On garde les autres données pour une prochaine connexion
  }
}

export default LocalStorageService;