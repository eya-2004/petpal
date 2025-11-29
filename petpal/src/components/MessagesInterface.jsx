import React, { useState } from 'react';

const MessagesInterface = ({ onNavigate, userType = 'sitter', messages, setMessages }) => {
  const [view, setView] = useState('list');
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Realistic conversations for Owners (talking to sitters)
  const ownerConversations = [
    {
      id: 1,
      name: 'Marie Dubois',
      avatar: '👩',
      petIcon: '🐕',
      petName: 'Charlie',
      lastMessage: 'Charlie a bien mangé ce matin, tout va bien!',
      time: 'il y a 1h',
      unread: 2,
      online: true,
      type: 'active',
      role: 'Pet Sitter',
      messages: [
        { id: 1, sender: 'them', text: 'Bonjour! Charlie a très bien passé la nuit', time: '09:30' },
        { id: 2, sender: 'them', text: 'Il a mangé toutes ses croquettes ce matin', time: '09:32' },
        { id: 3, sender: 'me', text: 'Super, merci pour le retour! Il a fait sa promenade?', time: '10:15' },
        { id: 4, sender: 'them', text: 'Oui, on vient de rentrer. Il a adoré le parc 🐕', time: '10:16' },
        { id: 5, sender: 'them', text: '📷 Photo de Charlie au parc', time: '10:17', isImage: true }
      ]
    },
    {
      id: 2,
      name: 'Lucas Martin',
      avatar: '👨',
      petIcon: '🐱',
      petName: 'Luna',
      lastMessage: 'Merci pour les photos! Luna a l\'air heureuse',
      time: 'Hier',
      unread: 0,
      online: false,
      type: 'active',
      role: 'Pet Sitter',
      messages: [
        { id: 1, sender: 'them', text: 'Luna est très câline aujourd\'hui', time: '16:20' },
        { id: 2, sender: 'them', text: 'Elle a passé l\'après-midi sur le canapé', time: '16:21' },
        { id: 3, sender: 'me', text: 'Haha typique de Luna! Merci pour les nouvelles', time: '17:45' },
        { id: 4, sender: 'them', text: 'Je vous envoie des photos avant de partir', time: '17:46' }
      ]
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      avatar: '👩‍🦰',
      petIcon: '🐕',
      petName: 'Max',
      lastMessage: 'Je peux venir demain à 14h pour la visite',
      time: 'il y a 3h',
      unread: 1,
      online: true,
      type: 'active',
      role: 'Pet Sitter',
      messages: [
        { id: 1, sender: 'me', text: 'Bonjour, je voulais confirmer la visite de demain', time: '14:30' },
        { id: 2, sender: 'them', text: 'Oui, à 14h ça me convient parfaitement', time: '14:45' },
        { id: 3, sender: 'me', text: 'Parfait! Max aura besoin de son carnet de santé', time: '14:46' }
      ]
    },
    {
      id: 4,
      name: 'Thomas Petit',
      avatar: '👨‍💼',
      petIcon: '🐈',
      petName: 'Mimi',
      lastMessage: 'Prochain vaccin de Mimi le mois prochain',
      time: '2 jours',
      unread: 0,
      online: false,
      type: 'archived',
      role: 'Vétérinaire',
      messages: [
        { id: 1, sender: 'them', text: 'Bonjour, je vous rappelle que le prochain vaccin de Mimi est prévu le mois prochain', time: '10:30' },
        { id: 2, sender: 'me', text: 'Merci pour le rappel, je prends note', time: '11:15' }
      ]
    }
  ];

  // Realistic conversations for Sitters (talking to owners)
  const sitterConversations = [
    {
      id: 1,
      name: 'Julie Rousseau',
      avatar: '👩',
      petIcon: '🐕',
      petName: 'Rocky',
      lastMessage: 'Rocky a bien dormi, il est très calme',
      time: 'il y a 1h',
      unread: 2,
      online: true,
      type: 'active',
      role: 'Propriétaire',
      messages: [
        { id: 1, sender: 'them', text: 'Bonjour! Comment se passe la garde de Rocky?', time: '08:30' },
        { id: 2, sender: 'me', text: 'Très bien! Il a bien mangé et on va au parc', time: '09:15' },
        { id: 3, sender: 'them', text: 'Super! Il a ses médicaments à 18h', time: '09:16' },
        { id: 4, sender: 'me', text: 'Pas de problème, je note pour 18h', time: '09:17' },
        { id: 5, sender: 'me', text: '📷 Rocky au parc', time: '10:30', isImage: true }
      ]
    },
    {
      id: 2,
      name: 'Pierre Durand',
      avatar: '👨',
      petIcon: '🐕',
      petName: 'Max',
      lastMessage: 'À quelle heure dois-je ramener Max demain?',
      time: 'Hier',
      unread: 0,
      online: false,
      type: 'active',
      role: 'Propriétaire',
      messages: [
        { id: 1, sender: 'them', text: 'Merci pour la garde de Max ce weekend!', time: '19:20' },
        { id: 2, sender: 'me', text: 'Avec plaisir! Il a été adorable', time: '19:45' },
        { id: 3, sender: 'them', text: 'À quelle heure dois-je venir le chercher demain?', time: '19:46' },
        { id: 4, sender: 'me', text: 'N\'importe quand après 10h me convient', time: '19:47' }
      ]
    },
    {
      id: 3,
      name: 'Claire Moreau',
      avatar: '👩',
      petIcon: '🐈',
      petName: 'Mimi',
      lastMessage: 'Mimi a-t-elle bien mangé ce matin?',
      time: 'il y a 3h',
      unread: 1,
      online: true,
      type: 'active',
      role: 'Propriétaire',
      messages: [
        { id: 1, sender: 'them', text: 'Bonjour, Mimi a-t-elle bien mangé ce matin?', time: '11:30' },
        { id: 2, sender: 'me', text: 'Oui, elle a fini ses croquettes et a bu de l\'eau', time: '11:45' },
        { id: 3, sender: 'them', text: 'Parfait! Elle est parfois difficile', time: '11:46' }
      ]
    },
    {
      id: 4,
      name: 'Jean Lefebvre',
      avatar: '👨‍🦳',
      petIcon: '🐕',
      petName: 'Buddy',
      lastMessage: 'Merci pour le rapport quotidien!',
      time: '2 jours',
      unread: 0,
      online: false,
      type: 'archived',
      role: 'Propriétaire',
      messages: [
        { id: 1, sender: 'them', text: 'Merci pour le rapport quotidien sur Buddy', time: '18:20' },
        { id: 2, sender: 'me', text: 'Avec plaisir! C\'est un chien adorable', time: '18:45' }
      ]
    }
  ];

  // Initialize messages if empty
  React.useEffect(() => {
    if (messages.length === 0) {
      const initialMessages = userType === 'owner' ? ownerConversations : sitterConversations;
      setMessages(initialMessages);
    }
  }, [messages.length, userType]);

  // Select data based on user type
  const conversations = userType === 'owner' ? ownerConversations : sitterConversations;

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'unread', label: 'Non lus' },
    { id: 'archived', label: 'Archivés' }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (activeFilter === 'all') return conv.type === 'active';
    if (activeFilter === 'unread') return conv.unread > 0 && conv.type === 'active';
    if (activeFilter === 'archived') return conv.type === 'archived';
    return true;
  });

  const openChat = (conversation) => {
    setActiveChat(conversation);
    setView('chat');
    
    // Mark conversation as read
    const updatedMessages = messages.map(msg => {
      if (msg.id === conversation.id) {
        return { ...msg, unread: 0 };
      }
      return msg;
    });
    setMessages(updatedMessages);
  };

  const getChatMessages = () => {
    if (!activeChat) return [];
    const conversation = messages.find(msg => msg.id === activeChat.id);
    return conversation ? conversation.messages || [] : [];
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Créer un nouveau message
      const newMessage = {
        id: Date.now(), // ID unique basé sur le timestamp
        sender: 'me',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString()
      };
      
      // Mettre à jour la conversation active
      const updatedMessages = [...messages];
      const conversationIndex = updatedMessages.findIndex(conv => conv.id === activeChat.id);
      
      if (conversationIndex !== -1) {
        // Ajouter le message à la conversation
        if (!updatedMessages[conversationIndex].messages) {
          updatedMessages[conversationIndex].messages = [];
        }
        updatedMessages[conversationIndex].messages.push(newMessage);
        
        // Mettre à jour le dernier message et l'heure
        updatedMessages[conversationIndex].lastMessage = message;
        updatedMessages[conversationIndex].time = "À l'instant";
        
        // Mettre à jour l'état
        setMessages(updatedMessages);
      }
      
      // Réinitialiser le champ de saisie
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (view === 'chat' && activeChat) {
    const currentMessages = getChatMessages();
    
    return (
      <div className="messages-chat-container">
        {/* Chat Header */}
        <div className="messages-header">
          <div className="container messages-header-inner">
            <button className="back-button" onClick={() => setView('list')}>
              ← Retour
            </button>
            <div className="chat-user-info">
              <div className="user-avatar-container">
                <div className="user-avatar">{activeChat.avatar}</div>
                <div className="pet-icon-small">{activeChat.petIcon}</div>
                {activeChat.online && <div className="online-indicator"></div>}
              </div>
              <div className="user-details">
                <h2 className="user-name">{activeChat.name}</h2>
                <p className="user-status">
                  {activeChat.online ? 'En ligne' : 'Hors ligne'} • {activeChat.petName} • {activeChat.role}
                </p>
              </div>
            </div>
            <button className="info-button">ℹ️</button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages-container">
          <div className="container">
            <div className="chat-date-indicator">
              <span className="date-badge">Aujourd'hui</span>
            </div>

            <div className="messages-list">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                  <div className={`message-content ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                    {msg.isImage ? (
                      <div className="message-image">
                        <span className="image-icon">📷</span>
                        <p className="image-text">
                          {userType === 'owner' ? `Photo de ${activeChat.petName}` : `Photo de ${activeChat.petName}`}
                        </p>
                      </div>
                    ) : (
                      <p className="message-text">{msg.text}</p>
                    )}
                  </div>
                  <span className="message-time">{msg.time}</span>
                </div>
              ))}

              {/* Typing Indicator */}
              {activeChat.online && (
                <div className="message-bubble received">
                  <div className="message-content received">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="message-input-container">
          <div className="container">
            <div className="input-group">
              <button className="attachment-button">📎</button>
              <button className="camera-button">📷</button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="message-input"
              />
              <button 
                className="send-button"
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-container">
      {/* Header */}
      <div className="messages-header">
        <div className="container messages-header-inner">
          <button className="menu-button" onClick={() => onNavigate(userType)}>
            ←
          </button>
          <div className="messages-title-section">
            <h1 className="messages-title">Messages</h1>
            <span className="user-type-badge">
              {userType === 'owner' ? '👤 Propriétaire' : '🐾 Pet Sitter'}
            </span>
          </div>
          <button className="search-button">🔍</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container">
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="container conversations-container">
        {filteredConversations.length > 0 ? (
          <div className="conversations-list">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => openChat(conv)}
                className="conversation-card"
              >
                <div className="conversation-avatar">
                  <div className="user-avatar-main">{conv.avatar}</div>
                  <div className="pet-icon">{conv.petIcon}</div>
                  {conv.online && <div className="online-indicator"></div>}
                </div>

                <div className="conversation-details">
                  <div className="conversation-header">
                    <h3 className="conversation-name">{conv.name}</h3>
                    {conv.unread > 0 && (
                      <span className="unread-badge">{conv.unread}</span>
                    )}
                  </div>
                  <p className="conversation-role">{conv.role} • {conv.petName}</p>
                  <p className="conversation-preview">{conv.lastMessage}</p>
                  <div className="conversation-footer">
                    <span className="conversation-time">{conv.time}</span>
                    {conv.unread === 0 && (
                      <span className="read-indicator">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>Aucun message</h3>
            <p>
              {activeFilter === 'unread' 
                ? 'Vous n\'avez aucun message non lu'
                : activeFilter === 'archived'
                ? 'Vous n\'avez aucune conversation archivée'
                : 'Commencez une nouvelle conversation'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesInterface;