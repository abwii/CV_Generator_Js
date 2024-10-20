import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();

 
  // Fonction pour connecter un utilisateur avec des informations
  const login = (logInfos) => {
    const userData = { ...logInfos };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Stocke l'utilisateur
  };
  // Fonction pour connecter un utilisateur avec des informations
    const createCV = (logInfos) => {
    const cvData = { ...logInfos };
    setCv(cvData)
    localStorage.setItem('cv', JSON.stringify(cvData));  // Stocke l'utilisateur
  };

  // Fonction pour déconnecter un utilisateur
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');  // Supprime l'utilisateur du localStorage
    navigate('/'); 
  };
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
  const getCvInfos = () => {
    return cv
  }
  // Récupère les informations de l'utilisateur depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Exécute une fois au montage

  // Fonction de mise à jour des informations utilisateur
  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }; 

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser,getUserInfos,getCvInfos,createCV }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider };
