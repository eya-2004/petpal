import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import OwnerDashboard from "./components/OwnerDashboard";
import SitterDashboard from "./components/SitterDashboard";
import ProfileSettings from "./components/ProfileSettings";
import NotificationsCenter from "./components/NotificationsCenter";
import MessagesInterface from "./components/Messages";
import SitterSearch from "./components/SitterSearch";
import SitterProfile from "./components/SitterProfile";
import BookingRequest from "./components/BookingRequest";
import AddPet from "./components/AddPet";
import LocalStorageService from "./components/localStorageService";
import AuthService from "./components/AuthService";
import "./App.css";

import Header from "./components/Header";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Services from "./components/Services";

export default function App() {
  const [view, setView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("owner");
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sitters, setSitters] = useState([]);
  const [profile, setProfile] = useState({});

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const authData = LocalStorageService.loadAuth();
    setIsAuthenticated(authData.isAuthenticated);
    setUserType(authData.userType);
    
    const userData = LocalStorageService.loadUser();
    setUser(userData);
    
    setBookings(LocalStorageService.loadBookings());
    setMessages(LocalStorageService.loadMessages());
    setNotifications(LocalStorageService.loadNotifications());
    setSitters(LocalStorageService.loadSitters());
    setProfile(LocalStorageService.loadProfile());
  }, []);

  // Sauvegarder les données dans localStorage lorsqu'elles changent
  useEffect(() => {
    LocalStorageService.saveAuth({ isAuthenticated, userType });
  }, [isAuthenticated, userType]);

  useEffect(() => {
    LocalStorageService.saveUser(user);
  }, [user]);

  useEffect(() => {
    LocalStorageService.saveBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    LocalStorageService.saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    LocalStorageService.saveNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    LocalStorageService.saveSitters(sitters);
  }, [sitters]);

  useEffect(() => {
    LocalStorageService.saveProfile(profile);
  }, [profile]);

  const handleViewChange = (newView) => {
    // Gérer les vues avec paramètres (ex: sitterprofile/1)
    if (typeof newView === 'string' && newView.includes('/')) {
      const [viewName, param] = newView.split('/');
      setView({ name: viewName, param });
      return;
    }
    
    // Si navigation vers les tableaux de bord owner/sitter, définir l'état d'authentification
    if (newView === "owner" || newView === "sitter") {
      setIsAuthenticated(true);
      setUserType(newView);
    }
    // Si navigation vers la page d'accueil depuis un état authentifié, se déconnecter
    else if (newView === "home" && isAuthenticated) {
      setIsAuthenticated(false);
      setUserType("owner");
      setUser(null);
      LocalStorageService.logout();
    }
    setView(newView);
  };

  const handleLogin = (userData, userType) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserType(userType);
    LocalStorageService.saveUser(userData);
    LocalStorageService.saveAuth({ isAuthenticated: true, userType });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType("owner");
    setUser(null);
    LocalStorageService.logout();
    setView("home");
  };

  // Fonction pour mettre à jour les informations de l'utilisateur
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    LocalStorageService.saveUser(updatedUserData);
    
    // Mettre aussi à jour dans la liste des utilisateurs
    const users = JSON.parse(localStorage.getItem('petpal_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === updatedUserData.id ? updatedUserData : u
    );
    localStorage.setItem('petpal_users', JSON.stringify(updatedUsers));
  };

  // Rendu conditionnel basé sur la vue actuelle
  const renderView = () => {
    // Vues avec paramètres
    if (typeof view === 'object' && view.name) {
      switch (view.name) {
        case 'sitterprofile':
          return <SitterProfile onNavigate={handleViewChange} sitterId={view.param} />;
        case 'booking':
          return <BookingRequest 
            onNavigate={handleViewChange} 
            sitterId={view.param} 
            user={user}
            bookings={bookings}
            setBookings={setBookings}
          />;
        default:
          return <Home onNavigate={handleViewChange} />;
      }
    }
    
    // Vues simples
    switch (view) {
      case "home":
        return <Home onNavigate={handleViewChange} />;
      case "login":
        return <Login onNavigate={handleViewChange} onLogin={handleLogin} />;
      case "signup":
        return <Signup onNavigate={handleViewChange} onLogin={handleLogin} />;
      case "owner":
        return <OwnerDashboard 
          onNavigate={handleViewChange} 
          user={user}
          bookings={bookings}
          updateUser={updateUser}
        />;
      case "sitter":
        return <SitterDashboard 
          onNavigate={handleViewChange} 
          user={user}
          bookings={bookings}
        />;
      case "profile":
        return <ProfileSettings 
          onNavigate={handleViewChange} 
          user={user}
          profile={profile}
          setProfile={setProfile}
          updateUser={updateUser}
        />;
      case "addpet":
        return <AddPet 
          onNavigate={handleViewChange} 
          user={user}
          updateUser={updateUser}
        />;
      case "notifications":
        return (
          <NotificationsCenter 
            onNavigate={handleViewChange} 
            userType={userType}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case "messages":
        return (
          <MessagesInterface 
            onNavigate={handleViewChange} 
            userType={userType}
            messages={messages}
            setMessages={setMessages}
          />
        );
      case "services":
        return <Services onNavigate={handleViewChange} />;
      case "sitters":
        return <SitterSearch 
          onNavigate={handleViewChange} 
          sitters={sitters}
          setSitters={setSitters}
        />;
      default:
        return <Home onNavigate={handleViewChange} />;
    }
  };

  return (
    <>
      {/* En-tête conditionnel basé sur l'authentification */}
      {isAuthenticated ? (
        <AuthenticatedHeader 
          onNavigate={handleViewChange} 
          userType={userType} 
          onLogout={handleLogout}
        />
      ) : (
        <Header onNavigate={handleViewChange} />
      )}

      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        {renderView()}
      </Container>
    </>
  );
}