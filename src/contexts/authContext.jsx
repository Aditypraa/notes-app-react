import { createContext, useEffect, useState } from "react";
import {
  getAccessToken,
  getUserLogged,
  putAccessToken,
  login as loginAPI,
} from "../utils/apiUtils";
import PropTypes from "prop-types";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (token) {
        try {
          const result = await getUserLogged();
          if (!result.error) {
            setUser(result.data);
            setIsAuthenticated(true);
          } else {
            // Token invalid, remove it
            localStorage.removeItem("accessToken");
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("accessToken");
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const result = await loginAPI(credentials);

      if (!result.error) {
        putAccessToken(result.data.accessToken);

        // Get user data after successful login
        const userResult = await getUserLogged();
        if (!userResult.error) {
          setUser(userResult.data);
          setIsAuthenticated(true);
          return { success: true };
        }
      }

      return { success: false, message: result.message || "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
