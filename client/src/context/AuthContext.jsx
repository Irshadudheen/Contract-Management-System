import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, logoutUser } from "../services/authService";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth().then((userData) => {
      if (userData) setUser(userData);
    });
  }, []);

  const login = (userData) => setUser(userData);
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
