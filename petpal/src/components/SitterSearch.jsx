import { useState, useEffect } from 'react';

export default function SitterSearch({ onNavigate, sitters, setSitters }) {
  const [filteredSitters, setFilteredSitters] = useState([]);
  const [filters, setFilters] = useState({
    distance: 10,
    maxPrice: 50,
    availability: 'any',
    petType: 'any'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize sitters if empty
  useEffect(() => {
    if (sitters.length === 0) {
      const mockSitters = [
        {
          id: 1,
          name: "Marie Dubois",
          avatar: "👩",
          rating: 4.9,
          reviews: 48,
          distance: 1.2,
          price: 25,
          availability: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
          petTypes: ["Chiens", "Chats"],
          services: ["Garde à domicile", "Promenades"],
          description: "Passionnée par les animaux, j'ai 5 ans d'expérience en pet sitting...",
          verified: true
        },
        {
          id: 2,
          name: "Lucas Martin",
          avatar: "👨",
          rating: 4.8,
          reviews: 35,
          distance: 2.5,
          price: 30,
          availability: ["Mar", "Mer", "Jeu", "Ven", "Sam"],
          petTypes: ["Chiens", "Oiseaux"],
          services: ["Garde chez le sitter", "Soins spéciaux"],
          description: "Amoureux des chiens, je propose un environnement sécurisé...",
          verified: true
        },
        {
          id: 3,
          name: "Sophie Laurent",
          avatar: "👩‍🦰",
          rating: 5.0,
          reviews: 62,
          distance: 0.8,
          price: 35,
          availability: ["Lun", "Mer", "Ven", "Sam", "Dim"],
          petTypes: ["Chiens", "Chats", "Lapins"],
          services: ["Garde à domicile", "Garderie de jour"],
          description: "Vétérinaire de formation, j'offre des soins professionnels...",
          verified: true
        },
        {
          id: 4,
          name: "Thomas Petit",
          avatar: "👨‍💼",
          rating: 4.7,
          reviews: 29,
          distance: 3.2,
          price: 20,
          availability: ["Jeu", "Ven", "Sam", "Dim"],
          petTypes: ["Chats"],
          services: ["Garde à domicile", "Promenades"],
          description: "Spécialiste des chats, je comprends leurs besoins spécifiques...",
          verified: false
        }
      ];
      setSitters(mockSitters);
    }
  }, [sitters.length, setSitters]);

  // Appliquer les filtres
  useEffect(() => {
    let result = sitters;
    
    // Filtre par recherche
    if (searchQuery) {
      result = result.filter(sitter => 
        sitter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sitter.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtre par distance
    result = result.filter(sitter => sitter.distance <= filters.distance);
    
    // Filtre par prix
    result = result.filter(sitter => sitter.price <= filters.maxPrice);
    
    // Filtre par type d'animal
    if (filters.petType !== 'any') {
      result = result.filter(sitter => 
        sitter.petTypes.includes(filters.petType)
      );
    }
    
    setFilteredSitters(result);
  }, [filters, searchQuery, sitters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const viewSitterProfile = (sitterId) => {
    onNavigate(`sitterprofile/${sitterId}`);
  };

  return (
    <div className="sitter-search-container">
      {/* Header */}
      <div className="sitter-search-header">
        <div className="container sitter-search-header-inner">
          <button className="back-button" onClick={() => onNavigate('home')}>
            ← Retour
          </button>
          <h1 className="sitter-search-title">Trouver un Pet Sitter</h1>
        </div>
      </div>

      <div className="container">
        {/* Search Bar */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un sitter..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Distance (km)</label>
            <div className="range-filter">
              <input
                type="range"
                min="1"
                max="20"
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                className="range-input"
              />
              <span className="range-value">{filters.distance} km</span>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Prix max (€/nuit)</label>
            <div className="range-filter">
              <input
                type="range"
                min="10"
                max="100"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                className="range-input"
              />
              <span className="range-value">{filters.maxPrice} €</span>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Type d'animal</label>
            <select
              value={filters.petType}
              onChange={(e) => handleFilterChange('petType', e.target.value)}
              className="filter-select"
            >
              <option value="any">Tous</option>
              <option value="Chiens">Chiens</option>
              <option value="Chats">Chats</option>
              <option value="Oiseaux">Oiseaux</option>
              <option value="Lapins">Lapins</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="results-header">
          <h2>{filteredSitters.length} sitters disponibles</h2>
          <div className="sort-options">
            <select className="sort-select">
              <option>Trier par pertinence</option>
              <option>Trier par distance</option>
              <option>Trier par prix</option>
              <option>Trier par note</option>
            </select>
          </div>
        </div>

        {/* Sitters List */}
        {filteredSitters.length > 0 ? (
          <div className="sitters-list">
            {filteredSitters.map(sitter => (
              <div key={sitter.id} className="sitter-card" onClick={() => viewSitterProfile(sitter.id)}>
                <div className="sitter-card-header">
                  <div className="sitter-avatar-container">
                    <div className="sitter-avatar">{sitter.avatar}</div>
                    {sitter.verified && <div className="verified-badge">✓ Vérifié</div>}
                  </div>
                  <div className="sitter-info">
                    <h3 className="sitter-name">{sitter.name}</h3>
                    <div className="sitter-rating">
                      <span className="rating">⭐ {sitter.rating}</span>
                      <span className="reviews">({sitter.reviews} avis)</span>
                    </div>
                    <div className="sitter-distance">📍 {sitter.distance} km</div>
                  </div>
                  <div className="sitter-price">
                    <span className="price-value">{sitter.price}€</span>
                    <span className="price-unit">/nuit</span>
                  </div>
                </div>

                <div className="sitter-pets">
                  {sitter.petTypes.map((pet, index) => (
                    <span key={index} className="pet-tag">{pet}</span>
                  ))}
                </div>

                <p className="sitter-description">{sitter.description}</p>

                <div className="sitter-services">
                  {sitter.services.map((service, index) => (
                    <span key={index} className="service-tag">{service}</span>
                  ))}
                </div>

                <div className="sitter-availability">
                  <span className="availability-label">Disponibilité:</span>
                  <div className="availability-days">
                    {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
                      <span 
                        key={day} 
                        className={`day ${sitter.availability.includes(day) ? 'available' : 'unavailable'}`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="btn-primary btn-sm">Voir le profil</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Aucun sitter trouvé</h3>
            <p>Essayez de modifier vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .sitter-search-container {
          min-height: 100vh;
          padding: 20px 0;
        }
        
        .sitter-search-header {
          margin-bottom: 30px;
        }
        
        .sitter-search-header-inner {
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
        
        .sitter-search-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent1);
          margin: 0;
        }
        
        .search-container {
          position: relative;
          margin-bottom: 25px;
        }
        
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border-radius: 30px;
          border: 1px solid #ddd;
          font-size: 16px;
        }
        
        .filters-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        
        .range-filter {
          display: flex;
          align-items: center;
        }
        
        .range-input {
          flex-grow: 1;
        }
        
        .range-value {
          margin-left: 10px;
          font-weight: 600;
          color: var(--accent1);
          min-width: 50px;
        }
        
        .filter-select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .sort-select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .sitters-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }
        
        .sitter-card {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        
        .sitter-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .sitter-card-header {
          display: flex;
          margin-bottom: 15px;
        }
        
        .sitter-avatar-container {
          position: relative;
          margin-right: 15px;
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
        }
        
        .verified-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: #4CAF50;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        
        .sitter-info {
          flex-grow: 1;
        }
        
        .sitter-name {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }
        
        .sitter-rating {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .rating {
          font-weight: 600;
          margin-right: 5px;
        }
        
        .reviews {
          color: #666;
          font-size: 14px;
        }
        
        .sitter-distance {
          color: #666;
          font-size: 14px;
        }
        
        .sitter-price {
          text-align: right;
        }
        
        .price-value {
          font-size: 20px;
          font-weight: 700;
          color: var(--accent1);
        }
        
        .price-unit {
          color: #666;
          font-size: 14px;
        }
        
        .sitter-pets {
          margin-bottom: 12px;
        }
        
        .pet-tag {
          display: inline-block;
          background: rgba(181, 123, 255, 0.1);
          color: var(--accent1);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          margin-right: 8px;
          margin-bottom: 5px;
        }
        
        .sitter-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .sitter-services {
          margin-bottom: 15px;
        }
        
        .service-tag {
          display: inline-block;
          background: rgba(100, 150, 255, 0.1);
          color: #3498db;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          margin-right: 8px;
          margin-bottom: 5px;
        }
        
        .sitter-availability {
          margin-bottom: 15px;
        }
        
        .availability-label {
          font-weight: 600;
          margin-right: 10px;
          color: #555;
        }
        
        .availability-days {
          display: flex;
          gap: 5px;
        }
        
        .day {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }
        
        .day.available {
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }
        
        .day.unavailable {
          background: rgba(0, 0, 0, 0.05);
          color: #999;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .filters-container {
            grid-template-columns: 1fr;
          }
          
          .sitters-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}