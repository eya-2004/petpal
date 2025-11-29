import React, { useState } from 'react';

const NotificationsCenter = ({ onNavigate, userType = 'sitter', notifications, setNotifications }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Different notifications for Owners vs Sitters
  const ownerNotifications = [
    {
      id: 1,
      type: 'booking',
      icon: '📅',
      title: 'Demande de réservation envoyée',
      message: 'Votre demande pour Charlie a été envoyée à Marie Dubois',
      time: 'il y a 2h',
      unread: true,
      action: 'Suivre'
    },
    {
      id: 2,
      type: 'message',
      icon: '💬',
      title: 'Nouveau message',
      message: 'Marie Dubois: "Je suis disponible pour garder Charlie!"',
      time: 'il y a 3h',
      unread: true,
      action: 'Répondre'
    },
    {
      id: 3,
      type: 'payment',
      icon: '💰',
      title: 'Paiement effectué',
      message: 'Vous avez payé 85€ pour la garde de Max',
      time: 'Hier',
      unread: false,
      action: null
    },
    {
      id: 4,
      type: 'booking',
      icon: '📅',
      title: 'Réservation confirmée',
      message: 'Marie Dubois a confirmé la garde de Charlie',
      time: 'Hier',
      unread: false,
      action: 'Voir détails'
    },
    {
      id: 5,
      type: 'system',
      icon: '⭐',
      title: 'Avis publié',
      message: 'Votre avis sur Marie Dubois a été publié',
      time: '2 jours',
      unread: false,
      action: 'Voir l\'avis'
    },
    {
      id: 6,
      type: 'reminder',
      icon: '⏰',
      title: 'Rappel de réservation',
      message: 'La garde de Charlie commence demain',
      time: 'il y a 30min',
      unread: true,
      action: 'Voir'
    }
  ];

  const sitterNotifications = [
    {
      id: 1,
      type: 'booking',
      icon: '📅',
      title: 'Nouvelle demande de réservation',
      message: 'Julie Rousseau souhaite réserver Rocky du 25-27 Nov',
      time: 'il y a 2h',
      unread: true,
      action: 'Voir détails'
    },
    {
      id: 2,
      type: 'message',
      icon: '💬',
      title: 'Nouveau message',
      message: 'Pierre Durand: "Merci pour cette belle garde de Max!"',
      time: 'il y a 3h',
      unread: true,
      action: 'Répondre'
    },
    {
      id: 3,
      type: 'payment',
      icon: '💰',
      title: 'Paiement reçu',
      message: '150€ pour la garde de Luna',
      time: 'Hier',
      unread: false,
      action: null
    },
    {
      id: 4,
      type: 'booking',
      icon: '📅',
      title: 'Réservation confirmée',
      message: 'Votre réservation avec Marie Dubois commence demain',
      time: 'Hier',
      unread: false,
      action: null
    },
    {
      id: 5,
      type: 'system',
      icon: '⭐',
      title: 'Nouvel avis reçu',
      message: 'Claire Moreau a laissé un avis 5 étoiles',
      time: '2 jours',
      unread: false,
      action: 'Voir l\'avis'
    },
    {
      id: 6,
      type: 'reminder',
      icon: '⏰',
      title: 'Rappel de garde',
      message: 'Vous avez une garde qui commence demain chez Pierre Durand',
      time: 'il y a 1h',
      unread: true,
      action: 'Préparer'
    }
  ];

  // Initialize notifications if empty
  React.useEffect(() => {
    if (notifications.length === 0) {
      const initialNotifications = userType === 'owner' ? ownerNotifications : sitterNotifications;
      setNotifications(initialNotifications);
    }
  }, [notifications.length, userType, setNotifications]);

  // Select notifications based on user type
  const baseNotifications = userType === 'owner' ? ownerNotifications : sitterNotifications;

  const tabs = [
    { id: 'all', label: 'Toutes', count: baseNotifications.length },
    { id: 'booking', label: 'Réservations', count: baseNotifications.filter(n => n.type === 'booking').length },
    { id: 'message', label: 'Messages', count: baseNotifications.filter(n => n.type === 'message').length },
    { id: 'payment', label: 'Paiements', count: baseNotifications.filter(n => n.type === 'payment').length },
    { id: 'system', label: 'Système', count: baseNotifications.filter(n => n.type === 'system').length },
    { id: 'reminder', label: 'Rappels', count: baseNotifications.filter(n => n.type === 'reminder').length }
  ];

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({
      ...notif,
      unread: false
    }));
    setNotifications(updatedNotifications);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notif => {
      if (notif.id === id) {
        return { ...notif, unread: false };
      }
      return notif;
    });
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notif => notif.type === activeTab);

  const unreadCount = notifications.filter(notif => notif.unread).length;

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="notifications-header">
        <div className="container notifications-header-inner">
          <button className="back-button" onClick={() => onNavigate(userType)}>
            ← Retour
          </button>
          <div className="notifications-title-section">
            <h1 className="notifications-title">Notifications</h1>
            <span className="user-type-badge">
              {userType === 'owner' ? '👤 Propriétaire' : '🐾 Pet Sitter'}
            </span>
          </div>
          <button className="settings-button">
            ⚙️
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="notifications-tabs">
        <div className="container">
          <div className="tabs-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
                {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mark all as read */}
      {unreadCount > 0 && (
        <div className="container">
          <div className="mark-all-read">
            <button className="mark-read-button" onClick={markAllAsRead}>
              Tout marquer comme lu ({unreadCount})
            </button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="container notifications-list-container">
        {filteredNotifications.length > 0 ? (
          <div className="notifications-list">
            {filteredNotifications.map(notif => (
              <div
                key={notif.id}
                className={`notification-card ${notif.unread ? 'unread' : ''}`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="notification-content">
                  <div className="notification-icon">{notif.icon}</div>
                  
                  <div className="notification-details">
                    <div className="notification-header">
                      <h3 className="notification-title">{notif.title}</h3>
                      {notif.unread && <div className="unread-indicator"></div>}
                    </div>
                    
                    <p className="notification-message">{notif.message}</p>
                    
                    <div className="notification-footer">
                      <span className="notification-time">{notif.time}</span>
                      {notif.action && (
                        <button className="notification-action">
                          {notif.action} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  className="delete-notification"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>Aucune notification</h3>
            <p>Vous n'avez aucune notification dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsCenter;