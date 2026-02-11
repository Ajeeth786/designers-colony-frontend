import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const authStatus = localStorage.getItem('designers_colony_auth');
    setIsLoggedIn(authStatus === 'true');
  }, []);

  const login = () => {
    localStorage.setItem('designers_colony_auth', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('designers_colony_auth');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
