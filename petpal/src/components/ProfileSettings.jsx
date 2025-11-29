import React, { useState, useEffect } from 'react';

const ProfileSettings = ({ onNavigate, user, profile, setProfile }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: 'Français',
    currency: 'EUR (€)',
    notifications: {
      email: true,
      push: false,
      sms: true,
      bookings: true,
      messages: true,
      promotions: false
    }
  });

  // Initialiser le formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name.split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        ...profile
      }));
    }
  }, [user, profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSaveProfile = () => {
    // Sauvegarder les modifications du profil
    const updatedProfile = {
      ...profile,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      language: formData.language,
      currency: formData.currency,
      notifications: formData.notifications
    };
    
    setProfile(updatedProfile);
    
    // Mettre à jour les informations de l'utilisateur si nécessaire
    if (user) {
      const updatedUser = {
        ...user,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      };
      
      // Mettre à jour l'utilisateur dans le localStorage
      const users = JSON.parse(localStorage.getItem('petpal_users') || '[]');
      const updatedUsers = users.map(u => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('petpal_users', JSON.stringify(updatedUsers));
      
      // Mettre à jour l'état de l'utilisateur dans App.js via une fonction de rappel
      // Nous devons ajouter cette fonctionnalité
    }
    
    alert('Profil sauvegardé avec succès!');
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        className="toggle-input" 
      />
      <span className="toggle-slider"></span>
    </label>
  );

  return (
    <div className="profile-settings-container">
      {/* Header */}
      <div className="profile-header">
        <div className="container profile-header-inner">
          <button className="back-button" onClick={() => onNavigate('home')}>
            ← Retour
          </button>
          <h1 className="profile-title">Mon Profil</h1>
          <button className="save-button" onClick={handleSaveProfile}>
            💾 Sauvegarder
          </button>
        </div>
      </div>

      <div className="container profile-content">
        {/* Profile Photo */}
        <div className="profile-photo-section">
          <div className="profile-photo-container">
            <div className="profile-photo">
              {user?.avatar || '👤'}
            </div>
            <button className="photo-edit-button">
              📷
            </button>
          </div>
          <button className="change-photo-text">Changer la photo</button>
        </div>

        {/* Personal Information */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">👤</span>
            <h2>Informations Personnelles</h2>
          </div>
          
          <div className="form-group">
            <label className="form-label">Prénom</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Votre prénom"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nom</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse e-mail</label>
            <div className="input-with-badge">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Votre adresse e-mail"
              />
              <span className="verified-badge">✓ Vérifié</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Numéro de téléphone</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Votre numéro de téléphone"
            />
          </div>
        </div>

        {/* Security */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🔒</span>
            <h2>Sécurité</h2>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-title">Mot de passe</p>
              <p className="setting-description">••••••••••••</p>
            </div>
            <button className="setting-action">Modifier →</button>
          </div>

          <div className="setting-item with-border">
            <div className="setting-info">
              <p className="setting-title">Authentification à deux facteurs</p>
              <p className="setting-description">Sécurité renforcée</p>
            </div>
            <ToggleSwitch 
              checked={false} 
              onChange={() => {}} 
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🌐</span>
            <h2>Préférences</h2>
          </div>
          
          <div className="form-group">
            <label className="form-label">Langue 🌐</label>
            <select 
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="form-input"
            >
              <option>Français</option>
              <option>English</option>
              <option>العربية</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Devise 💰</label>
            <select 
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="form-input"
            >
              <option>EUR (€)</option>
              <option>USD ($)</option>
              <option>TND (د.ت)</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🔔</span>
            <h2>Notifications</h2>
          </div>
          
          {Object.entries({
            email: 'Notifications par email',
            push: 'Notifications push',
            sms: 'Notifications SMS',
            bookings: 'Confirmations de réservation',
            messages: 'Messages',
            promotions: 'Promotions et actualités'
          }).map(([key, label]) => (
            <div key={key} className="setting-item">
              <span className="notification-label">{label}</span>
              <ToggleSwitch 
                checked={formData.notifications[key]}
                onChange={() => handleNotificationChange(key)}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="actions-section">
          <button className="btn-logout" onClick={() => onNavigate('home')}>
            <span className="btn-icon">🚪</span>
            Se déconnecter
          </button>
          
          <button className="btn-delete">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;