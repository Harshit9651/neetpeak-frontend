import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/login')
  };

  const setUserFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.warn("Token expired");
        logout();
        return;
      }

      localStorage.setItem("token", token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  };
useEffect(() => {
  const token = localStorage.getItem("token");

  const initialize = () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        logout();
      } else {
        setUser(decoded);

        const timeUntilExpire = decoded.exp * 1000 - Date.now();
        const logoutTimer = setTimeout(() => {
          logout();
        }, timeUntilExpire);

        return () => clearTimeout(logoutTimer);
      }
    } catch (err) {
      console.error("Token parse error", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  initialize();
}, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUserFromToken,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
