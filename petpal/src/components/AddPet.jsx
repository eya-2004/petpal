import { useState, useEffect } from 'react';

export default function AddPet({ onNavigate, user, updateUser }) {
  const [petData, setPetData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    weight: '',
    specialNeeds: '',
    avatar: '🐶'
  });

  const [petTypes] = useState([
    'Chien', 'Chat', 'Oiseau', 'Lapin', 'Poisson', 'Rongeur', 'Reptile', 'Autre'
  ]);

  const petAvatars = {
    'Chien': '🐶',
    'Chat': '🐱',
    'Oiseau': '🐦',
    'Lapin': '🐰',
    'Poisson': '🐠',
    'Rongeur': '🐹',
    'Reptile': '🦎',
    'Autre': '🐾'
  };

  useEffect(() => {
    // Mettre à jour l'avatar quand le type change
    setPetData(prev => ({
      ...prev,
      avatar: petAvatars[prev.type] || '🐾'
    }));
  }, [petData.type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Valider les champs
    if (!petData.name || !petData.type) {
      alert('Veuillez remplir au moins le nom et le type de votre animal');
      return;
    }

    // Créer le nouvel animal
    const newPet = {
      id: Date.now(),
      ...petData,
      age: petData.age ? parseInt(petData.age) : 0,
      weight: petData.weight ? parseFloat(petData.weight) : 0
    };

    // Mettre à jour les informations de l'utilisateur
    const updatedUser = {
      ...user,
      pets: [...(user.pets || []), newPet]
    };

    // Sauvegarder les modifications
    updateUser(updatedUser);
    
    alert('Animal ajouté avec succès!');
    onNavigate('owner');
  };

  return (
    <div className="add-pet-container">
      <div className="add-pet-header">
        <button className="back-button" onClick={() => onNavigate('owner')}>
          ← Retour
        </button>
        <h1 className="add-pet-title">Ajouter un animal</h1>
      </div>

      <div className="container">
        <div className="add-pet-card">
          <div className="pet-avatar-preview">
            <div className="pet-avatar-large">{petData.avatar}</div>
            <p className="pet-avatar-text">Aperçu</p>
          </div>

          <form onSubmit={handleSubmit} className="add-pet-form">
            <div className="form-group">
              <label className="form-label">Nom de l'animal *</label>
              <input
                type="text"
                name="name"
                value={petData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ex: Max, Luna, Rocky..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Type d'animal *</label>
              <select
                name="type"
                value={petData.type}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Sélectionnez un type</option>
                {petTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Race</label>
              <input
                type="text"
                name="breed"
                value={petData.breed}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ex: Labrador, Siamois, Canari..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Âge (années)</label>
                <input
                  type="number"
                  name="age"
                  value={petData.age}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Âge"
                  min="0"
                  max="30"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Poids (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={petData.weight}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Poids"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Besoins spéciaux</label>
              <textarea
                name="specialNeeds"
                value={petData.specialNeeds}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Médicaments, régime alimentaire, allergies, comportement particulier..."
                rows={3}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => onNavigate('owner')}>
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                Ajouter l'animal
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .add-pet-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .add-pet-header {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .back-button {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          margin-right: 15px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: rgba(181, 123, 255, 0.1);
          color: var(--accent1);
        }
        
        .add-pet-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .add-pet-card {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .pet-avatar-preview {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .pet-avatar-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: rgba(181, 123, 255, 0.15);
          margin: 0 auto 10px;
        }
        
        .pet-avatar-text {
          color: var(--text-light);
          font-size: 14px;
          margin: 0;
        }
        
        .add-pet-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-label {
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-dark);
        }
        
        .form-input {
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--accent1);
          box-shadow: 0 0 0 3px rgba(181, 123, 255, 0.1);
        }
        
        .form-textarea {
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          resize: vertical;
          font-family: inherit;
          min-height: 100px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
            gap: 10px;
          }
          
          .form-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}