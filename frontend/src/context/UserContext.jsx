import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  // Fonction pour connecter un utilisateur avec des informations et un token
  const login = (logInfos) => {
    const userData = { ...logInfos };
    setUser(userData);
    /* setToken(userToken); */
    localStorage.setItem('user', JSON.stringify(userData));  // Stocke l'utilisateur
    // localStorage.setItem('token', userToken);  // Stocke le token
  };

  // Fonction pour déconnecter un utilisateur
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');  // Supprime l'utilisateur du localStorage
    localStorage.removeItem('token');
    navigate('/home'); // Supprime le token du localStorage
  };

  // Récupère les informations de l'utilisateur depuis l'état ou le localStorage
  const getUserInfos = () => {
    if (user) {
      return user;
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        return JSON.parse(storedUser);
      }
    }
  };

  // Vérifie au montage si un token est stocké dans le localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);  // Réactive le token depuis le localStorage au chargement
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));  // Récupère les infos de l'utilisateur depuis le stockage
      }
    }
  }, []);

  // Déconnexion automatique si le token devient null
  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ login, getUserInfos, logout, token }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider };
