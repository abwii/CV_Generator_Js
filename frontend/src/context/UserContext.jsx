import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Login function
  const login = (logInfos, token) => {
    const userWithToken = { ...logInfos, name: "Toto", token };
    setUser(userWithToken);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userWithToken));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  };

  // Check if token is stored and still valid
  const getUserInfos = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(parsedUser.token);
      return parsedUser;
    }
    return null;
  };

  // Interceptor to check token expiration for each request
  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expired or unauthorized
      logout();
      alert("Session expired, please log in again.");
    }

    return response;
  };

  // Automatically fetch user info on component mount
  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <UserContext.Provider
      value={{ login, getUserInfos, logout, fetchWithAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider };
