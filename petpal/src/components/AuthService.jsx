// src/components/authService.js

class AuthService {
  // Récupérer tous les utilisateurs
  static getUsers() {
    const users = localStorage.getItem('petpal_users');
    return users ? JSON.parse(users) : [];
  }

  // Sauvegarder les utilisateurs
  static saveUsers(users) {
    localStorage.setItem('petpal_users', JSON.stringify(users));
  }

  // Inscrire un nouvel utilisateur
  static register(userData) {
    const users = this.getUsers();
    
    // Vérifier si l'email existe déjà
    if (users.find(user => user.email === userData.email)) {
      throw new Error('Cet email est déjà utilisé');
    }
    
    // Ajouter le nouvel utilisateur
    users.push(userData);
    this.saveUsers(users);
    
    return userData;
  }

  // Connecter un utilisateur
  static login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    return user;
  }

  // Vérifier si un utilisateur existe
  static userExists(email) {
    const users = this.getUsers();
    return users.some(user => user.email === email);
  }
}

export default AuthService;