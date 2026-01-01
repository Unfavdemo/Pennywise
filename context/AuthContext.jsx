import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('pennywise_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const createAccount = async (email, password, name) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to create account' };
      }

      // Log the user in
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };
      setUser(userData);
      localStorage.setItem('pennywise_user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error('Error creating account:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      // Set user data
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };
      setUser(userData);
      localStorage.setItem('pennywise_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pennywise_user');
  };

  const isCoach = () => {
    return user?.role === 'coach';
  };

  return (
    <AuthContext.Provider value={{ user, login, createAccount, logout, isCoach }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

