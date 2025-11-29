import { useState, useEffect } from 'react';

export default function SitterProfile({ onNavigate, sitterId }) {
  const [sitter, setSitter] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [bookingDates, setBookingDates] = useState({
    startDate: '',
    endDate: ''
  });

  // Données fictives du sitter
  useEffect(() => {
    const mockSitter = {
      id: sitterId || 1,
      name: "Marie Dubois",
      avatar: "👩",
      rating: 4.9,
      reviews: 48,
      distance: 1.2,
      price: 25,
      availability: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
      petTypes: ["Chiens", "Chats"],
      services: [
        { id: 1, name: "Garde à domicile", price: "15€/visite", description: "Je viens chez vous pour m'occuper de votre animal" },
        { id: 2, name: "Garde chez le sitter", price: "25€/nuit", description: "Votre animal séjourne chez moi dans un environnement sécurisé" },
        { id: 3, name: "Promenades", price: "12€/promenade", description: "Promenades de 30-60 minutes pour votre chien" }
      ],
      description: "Passionnée par les animaux, j'ai 5 ans d'expérience en pet sitting. Je suis formée aux premiers secours animaliers et j'offre un environnement sécurisé et aimant pour vos compagnons. J'habite dans un appartement avec un petit jardin sécurisé, idéal pour les petits chiens et les chats. J'envoie régulièrement des photos et des mises à jour pour vous rassurer.",
      verified: true,
      joinedDate: "Janvier 2020",
      responseTime: "1 heure",
      address: "15 Rue des Fleurs, Paris 75001",
      reviewsList: [
        { 
          id: 1, 
          author: "Jean Dupont", 
          avatar: "👨", 
          rating: 5, 
          comment: "Marie a pris soin de mon labrador Max pendant une semaine. Elle a envoyé des photos quotidiennes et Max était très heureux à son retour. Je recommande vivement !", 
          date: "15/10/2023",
          pet: "Max (Chien)"
        },
        { 
          id: 2, 
          author: "Sophie Martin", 
          avatar: "👩", 
          rating: 5, 
          comment: "Excellente garde pour mon chat Luna. Marie est très attentionnée et a respecté toutes les instructions. Luna était détendue et heureuse à son retour.", 
          date: "02/10/2023",
          pet: "Luna (Chat)"
        },
        { 
          id: 3, 
          author: "Thomas Bernard", 
          avatar: "👨‍💼", 
          rating: 4.5, 
          comment: "Très bon service, Marie a pris soin de mes deux chats pendant mes vacances. Seul petit point, j'aurais aimé un peu plus de photos.", 
          date: "20/09/2023",
          pet: "Mimi & Fifi (Chats)"
        }
      ]
    };
    setSitter(mockSitter);
  }, [sitterId]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const bookNow = () => {
    onNavigate(`booking/${sitter.id}`);
  };

  if (!sitter) {
    return <div className="loading-container">Chargement du profil...</div>;
  }

  return (
    <div className="sitter-profile-container">
      {/* Header */}
      <div className="sitter-profile-header">
        <div className="container sitter-profile-header-inner">
          <button className="back-button" onClick={() => onNavigate('sitters')}>
            ← Retour
          </button>
          <h1 className="sitter-profile-title">Profil du Sitter</h1>
        </div>
      </div>

      <div className="container">
        {/* Sitter Info */}
        <div className="sitter-info-section">
          <div className="sitter-avatar-large">
            {sitter.avatar}
            {sitter.verified && <div className="verified-badge-large">✓ Vérifié</div>}
          </div>
          
          <div className="sitter-details">
            <div className="sitter-name-rating">
              <h1 className="sitter-name">{sitter.name}</h1>
              <div className="sitter-rating-large">
                <span className="rating">⭐ {sitter.rating}</span>
                <span className="reviews">({sitter.reviews} avis)</span>
              </div>
            </div>
            
            <div className="sitter-meta">
              <div className="sitter-distance">📍 {sitter.distance} km de chez vous</div>
              <div className="sitter-response">⏱️ Temps de réponse: {sitter.responseTime}</div>
              <div className="sitter-member">📅 Membre depuis {sitter.joinedDate}</div>
            </div>
            
            <div className="sitter-pets">
              {sitter.petTypes.map((pet, index) => (
                <span key={index} className="pet-tag">{pet}</span>
              ))}
            </div>
          </div>
          
          <div className="sitter-booking">
            <div className="booking-price">
              <span className="price-value">{sitter.price}€</span>
              <span className="price-unit">/nuit</span>
            </div>
            
            <div className="booking-dates">
              <div className="date-input-group">
                <label>Début</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={bookingDates.startDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="date-input-group">
                <label>Fin</label>
                <input 
                  type="date" 
                  name="endDate"
                  value={bookingDates.endDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            
            <button 
              className="btn-primary" 
              onClick={bookNow}
              disabled={!bookingDates.startDate || !bookingDates.endDate}
            >
              Réserver maintenant
            </button>
            
            <button className="btn-ghost">
              💬 Envoyer un message
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            À propos
          </button>
          <button 
            className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button 
            className={`tab-button ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            Disponibilité
          </button>
          <button 
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Avis ({sitter.reviewsList.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="about-section">
              <h2>À propos de {sitter.name}</h2>
              <p className="about-description">{sitter.description}</p>
              
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-details">
                    <h3>Localisation</h3>
                    <p>{sitter.address}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">🐾</div>
                  <div className="info-details">
                    <h3>Animaux acceptés</h3>
                    <p>{sitter.petTypes.join(', ')}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">⏱️</div>
                  <div className="info-details">
                    <h3>Temps de réponse</h3>
                    <p>{sitter.responseTime}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">📅</div>
                  <div className="info-details">
                    <h3>Membre depuis</h3>
                    <p>{sitter.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="services-section">
              <h2>Services proposés</h2>
              <div className="services-list">
                {sitter.services.map(service => (
                  <div key={service.id} className="service-card">
                    <div className="service-header">
                      <h3 className="service-name">{service.name}</h3>
                      <div className="service-price">{service.price}</div>
                    </div>
                    <p className="service-description">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'availability' && (
            <div className="availability-section">
              <h2>Disponibilité</h2>
              <div className="availability-calendar">
                <div className="calendar-header">
                  <button className="calendar-nav">←</button>
                  <h3>Novembre 2023</h3>
                  <button className="calendar-nav">→</button>
                </div>
                
                <div className="calendar-grid">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                  ))}
                  
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isAvailable = sitter.availability.includes(
                      ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][new Date(2023, 10, day).getDay()]
                    );
                    
                    return (
                      <div 
                        key={day} 
                        className={`calendar-day ${isAvailable ? 'available' : 'unavailable'}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="availability-legend">
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span>Disponible</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color unavailable"></div>
                  <span>Indisponible</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <h2>Avis des propriétaires</h2>
              
              <div className="reviews-summary">
                <div className="reviews-rating">
                  <div className="rating-number">{sitter.rating}</div>
                  <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                  <div className="rating-count">Basé sur {sitter.reviews} avis</div>
                </div>
                
                <div className="rating-breakdown">
                  {[
                    { stars: 5, count: 42, percent: 87 },
                    { stars: 4, count: 4, percent: 8 },
                    { stars: 3, count: 2, percent: 4 },
                    { stars: 2, count: 0, percent: 0 },
                    { stars: 1, count: 0, percent: 0 }
                  ].map(rating => (
                    <div key={rating.stars} className="rating-bar">
                      <div className="rating-label">{rating.stars} ⭐</div>
                      <div className="rating-progress">
                        <div 
                          className="rating-fill" 
                          style={{ width: `${rating.percent}%` }}
                        ></div>
                      </div>
                      <div className="rating-count">{rating.count}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="reviews-list">
                {sitter.reviewsList.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-avatar">{review.avatar}</div>
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{review.author}</h4>
                        <div className="review-pet">{review.pet}</div>
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    
                    <div className="review-rating">
                      {'⭐'.repeat(review.rating)}
                    </div>
                    
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sitter-profile-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .sitter-profile-header {
          margin-bottom: 30px;
        }
        
        .sitter-profile-header-inner {
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
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: rgba(181, 123, 255, 0.1);
          color: var(--accent1);
        }
        
        .sitter-profile-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .sitter-info-section {
          display: flex;
          background: white;
          border-radius: var(--radius);
          padding: 25px;
          box-shadow: var(--shadow);
          margin-bottom: 30px;
        }
        
        .sitter-avatar-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 25px;
          position: relative;
        }
        
        .verified-badge-large {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #4CAF50;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        
        .sitter-details {
          flex-grow: 1;
        }
        
        .sitter-name-rating {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .sitter-name {
          font-size: 28px;
          font-weight: 700;
          margin: 0 15px 0 0;
        }
        
        .sitter-rating-large {
          display: flex;
          align-items: center;
        }
        
        .rating {
          font-weight: 600;
          margin-right: 5px;
        }
        
        .reviews {
          color: #666;
        }
        
        .sitter-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .sitter-distance, .sitter-response, .sitter-member {
          display: flex;
          align-items: center;
          color: #666;
        }
        
        .sitter-pets {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .pet-tag {
          display: inline-block;
          background: rgba(181, 123, 255, 0.1);
          color: var(--accent1);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
        }
        
        .sitter-booking {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          min-width: 250px;
        }
        
        .booking-price {
          margin-bottom: 15px;
          text-align: right;
        }
        
        .price-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
        }
        
        .price-unit {
          color: #666;
          font-size: 14px;
        }
        
        .booking-dates {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .date-input-group {
          display: flex;
          flex-direction: column;
        }
        
        .date-input-group label {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        
        .date-input-group input {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ddd;
        }
        
        .profile-tabs {
          display: flex;
          border-bottom: 1px solid #eee;
          margin-bottom: 25px;
        }
        
        .tab-button {
          background: none;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          position: relative;
        }
        
        .tab-button.active {
          color: var(--accent1);
        }
        
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--accent1);
        }
        
        .tab-content {
          background: white;
          border-radius: var(--radius);
          padding: 25px;
          box-shadow: var(--shadow);
          margin-bottom: 30px;
        }
        
        .about-section h2, .services-section h2, .availability-section h2, .reviews-section h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px 0;
        }
        
        .about-description {
          line-height: 1.6;
          color: #555;
          margin-bottom: 25px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
        }
        
        .info-icon {
          font-size: 24px;
          margin-right: 15px;
        }
        
        .info-details h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 5px 0;
        }
        
        .info-details p {
          color: #666;
          margin: 0;
        }
        
        .services-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .service-card {
          background: rgba(181, 123, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
        }
        
        .service-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .service-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        
        .service-price {
          font-weight: 700;
          color: var(--accent1);
        }
        
        .service-description {
          color: #666;
          margin: 0;
        }
        
        .availability-calendar {
          margin-bottom: 20px;
        }
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .calendar-nav {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
        
        .calendar-header h3 {
          margin: 0;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        
        .calendar-day-header {
          text-align: center;
          font-weight: 600;
          color: #666;
          padding: 8px 0;
        }
        
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: 600;
        }
        
        .calendar-day.available {
          background: rgba(76, 175, 80, 0.1);
          color: #4CAF50;
        }
        
        .calendar-day.unavailable {
          background: rgba(0, 0, 0, 0.05);
          color: #999;
        }
        
        .availability-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
        }
        
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          margin-right: 8px;
        }
        
        .legend-color.available {
          background: rgba(76, 175, 80, 0.3);
        }
        
        .legend-color.unavailable {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .reviews-summary {
          display: flex;
          margin-bottom: 30px;
        }
        
        .reviews-rating {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: rgba(181, 123, 255, 0.05);
          border-radius: 12px;
          margin-right: 30px;
          min-width: 150px;
        }
        
        .rating-number {
          font-size: 48px;
          font-weight: 700;
          color: var(--accent1);
        }
        
        .rating-stars {
          font-size: 20px;
          margin: 5px 0;
        }
        
        .rating-count {
          color: #666;
        }
        
        .rating-breakdown {
          flex-grow: 1;
        }
        
        .rating-bar {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .rating-label {
          width: 40px;
        }
        
        .rating-progress {
          flex-grow: 1;
          height: 8px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
          margin: 0 10px;
        }
        
        .rating-fill {
          height: 100%;
          background: #FFD700;
          border-radius: 4px;
        }
        
        .reviews-list {
          display: grid;
          gap: 20px;
        }
        
        .review-card {
          padding: 20px;
          background: rgba(181, 123, 255, 0.05);
          border-radius: 12px;
        }
        
        .review-header {
          display: flex;
          margin-bottom: 10px;
        }
        
        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(181, 123, 255, 0.15);
          margin-right: 15px;
        }
        
        .reviewer-info {
          flex-grow: 1;
        }
        
        .reviewer-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 3px 0;
        }
        
        .review-pet {
          color: #666;
          font-size: 14px;
          margin: 0;
        }
        
        .review-date {
          color: #666;
          font-size: 14px;
        }
        
        .review-rating {
          margin-bottom: 10px;
        }
        
        .review-comment {
          color: #555;
          line-height: 1.5;
          margin: 0;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          font-size: 18px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .sitter-info-section {
            flex-direction: column;
            align-items: center;
          }
          
          .sitter-booking {
            width: 100%;
            align-items: center;
            margin-top: 20px;
          }
          
          .booking-dates {
            width: 100%;
            justify-content: space-between;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .services-list {
            grid-template-columns: 1fr;
          }
          
          .reviews-summary {
            flex-direction: column;
            align-items: center;
          }
          
          .reviews-rating {
            margin-right: 0;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}