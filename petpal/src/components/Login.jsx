import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import AuthService from "./AuthService";

export default function Login({ onNavigate, onLogin }) {
  const [userType, setUserType] = useState("owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Vérifier les identifiants
      const user = AuthService.login(email, password);
      
      // Vérifier que le type d'utilisateur correspond
      if (user.type !== userType) {
        throw new Error(`Ce compte est de type ${user.type === 'owner' ? 'propriétaire' : 'pet sitter'}`);
      }
      
      // Appeler la fonction de connexion du parent
      onLogin(user, userType);
      
      // Naviguer vers le tableau de bord approprié
      onNavigate(userType);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🔒</div>
          <h2 className="auth-title">Connexion</h2>
          <p className="auth-subtitle">Bienvenue sur PetPal</p>
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
          </div>
          <div 
            className={`user-type-option ${userType === 'sitter' ? 'active' : ''}`}
            onClick={() => setUserType('sitter')}
          >
            <div className="user-type-icon">🐾</div>
            <span>Pet Sitter</span>
          </div>
        </div>

        <Form onSubmit={handleLogin} className="auth-form">
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

          <Button 
            type="submit"
            className="btn-primary btn-auth"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Pas encore de compte ?{" "}
            <span className="auth-link" onClick={() => onNavigate("signup")}>
              Créer un compte
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}