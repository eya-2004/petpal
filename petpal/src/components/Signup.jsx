import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import AuthService from "./AuthService";

export default function Signup({ onNavigate, onLogin }) {
  const [userType, setUserType] = useState("owner");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

// Dans la fonction handleSignup de Signup.jsx, ajoutez des animaux par défaut
const handleSignup = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  
  try {
    // Valider les champs
    if (!firstName || !lastName || !email || !phone || !password) {
      throw new Error("Veuillez remplir tous les champs");
    }
    
    if (password !== confirmPassword) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    
    if (password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }
    
    // Vérifier si l'email existe déjà
    if (AuthService.userExists(email)) {
      throw new Error("Cet email est déjà utilisé");
    }
    
    // Créer l'utilisateur avec un animal par défaut
    const userData = {
      id: Date.now(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      password,
      avatar: userType === "owner" ? "👤" : "🐾",
      type: userType,
      pets: userType === "owner" ? [
        {
          id: 1,
          name: "Mon animal",
          type: "Chien",
          breed: "Mélangé",
          age: 3,
          weight: 15,
          avatar: "🐶"
        }
      ] : [],
      createdAt: new Date().toISOString()
    };
    
    // Inscrire l'utilisateur
    AuthService.register(userData);
    
    // Afficher le message de succès
    setSuccess(true);
    
    // Connecter l'utilisateur après 2 secondes
    setTimeout(() => {
      onLogin(userData, userType);
      onNavigate(userType);
    }, 2000);
    
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-success">
            <div className="success-icon">✅</div>
            <h2 className="auth-title">Inscription réussie !</h2>
            <p className="auth-subtitle">Vous allez être redirigé vers votre tableau de bord...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🐾</div>
          <h2 className="auth-title">Créer un compte</h2>
          <p className="auth-subtitle">Rejoignez la communauté PetPal</p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* User Type Selection */}
        <div className="user-type-selection">
          <div 
            className={`user-type-option ${userType === 'owner' ? 'active' : ''}`}
            onClick={() => setUserType('owner')}
          >
            <div className="user-type-icon">👤</div>
            <span>Propriétaire</span>
            <p className="user-type-description">Je cherche un pet sitter</p>
          </div>
          <div 
            className={`user-type-option ${userType === 'sitter' ? 'active' : ''}`}
            onClick={() => setUserType('sitter')}
          >
            <div className="user-type-icon">🐾</div>
            <span>Pet Sitter</span>
            <p className="user-type-description">Je garde des animaux</p>
          </div>
        </div>

        <Form onSubmit={handleSignup} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <div className="input-group">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <div className="input-group">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Adresse e-mail</label>
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input 
                type="email" 
                className="form-input" 
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Numéro de téléphone</label>
            <div className="input-group">
              <span className="input-icon">📱</span>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="+216 XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="btn-primary btn-auth"
            disabled={loading}
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </Button>
        </Form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Déjà inscrit ?{" "}
            <span className="auth-link" onClick={() => onNavigate("login")}>
              Connexion
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}