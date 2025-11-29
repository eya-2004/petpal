import { useState, useEffect } from 'react';

export default function BookingRequest({ onNavigate, sitterId, user, bookings, setBookings }) {
  const [sitter, setSitter] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '18:00',
    serviceType: 'overnight',
    specialNeeds: '',
    additionalInfo: ''
  });

  // Données fictives du sitter
  useEffect(() => {
    const mockSitter = {
      id: sitterId || 1,
      name: "Marie Dubois",
      avatar: "👩",
      rating: 4.9,
      price: 25,
      services: [
        { id: 'overnight', name: 'Garde chez le sitter', price: 25, unit: 'nuit' },
        { id: 'daycare', name: 'Garderie de jour', price: 20, unit: 'jour' },
        { id: 'visit', name: 'Visite à domicile', price: 15, unit: 'visite' },
        { id: 'walk', name: 'Promenade', price: 12, unit: 'promenade' }
      ]
    };
    setSitter(mockSitter);
  }, [sitterId]);

  // Données fictives des animaux de l'utilisateur
  useEffect(() => {
    const mockPets = [
      { id: 1, name: 'Max', type: 'Chien', breed: 'Labrador', age: 3, avatar: '🐕' },
      { id: 2, name: 'Luna', type: 'Chat', breed: 'Siamois', age: 2, avatar: '🐱' },
      { id: 3, name: 'Rocky', type: 'Chien', breed: 'Bulldog', age: 5, avatar: '🐕‍🦺' }
    ];
    setUserPets(mockPets);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePetSelection = (petId) => {
    setSelectedPets(prev => {
      if (prev.includes(petId)) {
        return prev.filter(id => id !== petId);
      } else {
        return [...prev, petId];
      }
    });
  };

  const calculateTotalPrice = () => {
    if (!sitter || !bookingData.startDate || !bookingData.endDate) return 0;
    
    const service = sitter.services.find(s => s.id === bookingData.serviceType);
    if (!service) return 0;
    
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return service.price * diffDays;
  };

  const submitBookingRequest = () => {
    if (!bookingData.startDate || !bookingData.endDate || selectedPets.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Créer une nouvelle réservation
    const newBooking = {
      id: Date.now(), // ID unique basé sur le timestamp
      sitterId: sitterId,
      sitterName: sitter.name,
      userId: user.id,
      userName: user.name,
      pets: selectedPets.map(id => userPets.find(pet => pet.id === id)),
      ...bookingData,
      status: 'pending', // pending, confirmed, cancelled
      createdAt: new Date().toISOString()
    };
    
    // Ajouter la réservation à la liste existante
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    // Dans une vraie application, envoie des données au backend
    console.log('Demande de réservation envoyée:', newBooking);
    
    alert('Demande de réservation envoyée avec succès!');
    onNavigate('bookings');
  };

  if (!sitter) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="booking-request-container">
      {/* Header */}
      <div className="booking-request-header">
        <div className="container booking-request-header-inner">
          <button className="back-button" onClick={() => onNavigate(`sitterprofile/${sitter.id}`)}>
            ← Retour
          </button>
          <h1 className="booking-request-title">Demande de réservation</h1>
        </div>
      </div>

      <div className="container">
        <div className="booking-form-container">
          {/* Sitter Info */}
          <div className="sitter-summary">
            <div className="sitter-avatar">{sitter.avatar}</div>
            <div className="sitter-info">
              <h2>{sitter.name}</h2>
              <div className="sitter-rating">⭐ {sitter.rating}</div>
            </div>
          </div>

          <div className="booking-form">
            {/* Service Selection */}
            <div className="form-section">
              <h3>Type de service</h3>
              <div className="service-options">
                {sitter.services.map(service => (
                  <div 
                    key={service.id}
                    className={`service-option ${bookingData.serviceType === service.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'serviceType', value: service.id } })}
                  >
                    <div className="service-name">{service.name}</div>
                    <div className="service-price">{service.price}€/{service.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="form-section">
              <h3>Dates</h3>
              <div className="date-inputs">
                <div className="date-input-group">
                  <label>Date de début</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="date-input-group">
                  <label>Date de fin</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingData.endDate}
                    onChange={handleInputChange}
                    min={bookingData.startDate}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Times */}
            <div className="form-section">
              <h3>Heures</h3>
              <div className="time-inputs">
                <div className="time-input-group">
                  <label>Heure de début</label>
                  <input
                    type="time"
                    name="startTime"
                    value={bookingData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="time-input-group">
                  <label>Heure de fin</label>
                  <input
                    type="time"
                    name="endTime"
                    value={bookingData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Pet Selection */}
            <div className="form-section">
              <h3>Sélectionnez vos animaux</h3>
              <div className="pets-selection">
                {userPets.map(pet => (
                  <div 
                    key={pet.id}
                    className={`pet-card ${selectedPets.includes(pet.id) ? 'selected' : ''}`}
                    onClick={() => togglePetSelection(pet.id)}
                  >
                    <div className="pet-avatar">{pet.avatar}</div>
                    <div className="pet-info">
                      <div className="pet-name">{pet.name}</div>
                      <div className="pet-details">{pet.type} • {pet.breed} • {pet.age} ans</div>
                    </div>
                    <div className="pet-selection-indicator">
                      {selectedPets.includes(pet.id) ? '✓' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Needs */}
            <div className="form-section">
              <h3>Besoins spéciaux</h3>
              <textarea
                name="specialNeeds"
                value={bookingData.specialNeeds}
                onChange={handleInputChange}
                placeholder="Médicaments, régime alimentaire, problèmes de santé, etc."
                rows={3}
              />
            </div>

            {/* Additional Info */}
            <div className="form-section">
              <h3>Informations complémentaires</h3>
              <textarea
                name="additionalInfo"
                value={bookingData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Toute information utile pour le sitter"
                rows={3}
              />
            </div>

            {/* Summary */}
            <div className="booking-summary">
              <h3>Récapitulatif</h3>
              <div className="summary-item">
                <span>Sitter:</span>
                <span>{sitter.name}</span>
              </div>
              <div className="summary-item">
                <span>Service:</span>
                <span>
                  {sitter.services.find(s => s.id === bookingData.serviceType)?.name}
                </span>
              </div>
              <div className="summary-item">
                <span>Dates:</span>
                <span>
                  {bookingData.startDate && bookingData.endDate 
                    ? `${bookingData.startDate} - ${bookingData.endDate}` 
                    : 'Non spécifiées'}
                </span>
              </div>
              <div className="summary-item">
                <span>Animaux:</span>
                <span>
                  {selectedPets.length > 0 
                    ? selectedPets.map(id => userPets.find(p => p.id === id)?.name).join(', ')
                    : 'Aucun sélectionné'}
                </span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>{calculateTotalPrice()}€</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="btn-primary submit-button"
              onClick={submitBookingRequest}
              disabled={!bookingData.startDate || !bookingData.endDate || selectedPets.length === 0}
            >
              Envoyer la demande
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .booking-request-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .booking-request-header {
          margin-bottom: 30px;
        }
        
        .booking-request-header-inner {
          display: flex;
          align-items: center;
          padding: 15px 0;
        }
        
        .back-button {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          margin-right: 15px;
        }
        
        .booking-request-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .booking-form-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .sitter-summary {
          display: flex;
          align-items: center;
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          margin-bottom: 25px;
        }
        
        .sitter-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 15px;
        }
        
        .sitter-info h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }
        
        .sitter-rating {
          color: #FFD700;
        }
        
        .booking-form {
          background: white;
          border-radius: var(--radius);
          padding: 25px;
          box-shadow: var(--shadow);
        }
        
        .form-section {
          margin-bottom: 30px;
        }
        
        .form-section h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 15px 0;
          color: #333;
        }
        
        .service-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .service-option {
          border: 2px solid #eee;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .service-option:hover {
          border-color: rgba(181, 123, 255, 0.5);
        }
        
        .service-option.selected {
          border-color: var(--accent1);
          background: rgba(181, 123, 255, 0.05);
        }
        
        .service-name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .service-price {
          color: var(--accent1);
          font-weight: 700;
        }
        
        .date-inputs, .time-inputs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .date-input-group, .time-input-group {
          display: flex;
          flex-direction: column;
        }
        
        .date-input-group label, .time-input-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        
        .date-input-group input, .time-input-group input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .pets-selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }
        
        .pet-card {
          border: 2px solid #eee;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .pet-card:hover {
          border-color: rgba(181, 123, 255, 0.5);
        }
        
        .pet-card.selected {
          border-color: var(--accent1);
          background: rgba(181, 123, 255, 0.05);
        }
        
        .pet-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 10px;
        }
        
        .pet-info {
          flex-grow: 1;
        }
        
        .pet-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        
        .pet-details {
          font-size: 12px;
          color: #666;
        }
        
        .pet-selection-indicator {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        
        .pet-card:not(.selected) .pet-selection-indicator {
          background: #eee;
          color: transparent;
        }
        
        textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          resize: vertical;
          font-family: inherit;
        }
        
        .booking-summary {
          background: rgba(181, 123, 255, 0.05);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .booking-summary h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 15px 0;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .summary-item.total {
          font-weight: 700;
          font-size: 18px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        
        .submit-button {
          width: 100%;
          padding: 15px;
          font-size: 16px;
        }
        
        @media (max-width: 768px) {
          .service-options {
            grid-template-columns: 1fr;
          }
          
          .date-inputs, .time-inputs {
            grid-template-columns: 1fr;
          }
          
          .pets-selection {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}