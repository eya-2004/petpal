export default function AuthenticatedHeader({ onNavigate, userType, onLogout }) {
  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* logo + PetPal */}
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => onNavigate(userType)}>
          <div className="logo">🐶</div>
          <span className="brand-title">PetPal</span>
        </div>

        {/* NAV - For authenticated users */}
        <nav className="nav">
          <a onClick={() => onNavigate(userType)} className="nav-item">
            <span className="emoji">📊</span> Dashboard
          </a>
          <a onClick={() => onNavigate("sitters")} className="nav-item">
            <span className="emoji">🐾</span> Sitters
          </a>
          <a onClick={() => onNavigate("bookings")} className="nav-item">
            <span className="emoji">📅</span> Réservations
          </a>
          <a onClick={() => onNavigate("messages")} className="nav-item">
            <span className="emoji">💬</span> Messages
          </a>
          <a onClick={() => onNavigate("notifications")} className="nav-item">
            <span className="emoji">🔔</span> Notifications
          </a>
          <a onClick={() => onNavigate("profile")} className="nav-item">
            <span className="emoji">👤</span> Mon Profil
          </a>
          <a onClick={onLogout} className="nav-item">
            <span className="emoji">🚪</span> Déconnexion
          </a>
        </nav>

      </div>
    </header>
  );
}