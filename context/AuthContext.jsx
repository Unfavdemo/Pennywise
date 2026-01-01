import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const COACH_CREDENTIALS = [
  { email: 'rob@launchpadphilly.org', password: 'lpuser1', role: 'coach' },
  { email: 'sanaa@launchpadphilly.org', password: 'lpuser2', role: 'coach' },
  { email: 'taheera@launchpadphilly.org', password: 'lpuser3', role: 'coach' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('pennywise_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const createAccount = (email, password, name) => {
    // Check if email already exists
    const accounts = JSON.parse(localStorage.getItem('pennywise_accounts') || '[]');
    
    if (accounts.some(acc => acc.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Check if it's a coach email
    if (COACH_CREDENTIALS.some(c => c.email === email)) {
      return { success: false, error: 'This email is reserved. Please use a different email.' };
    }

    // Create new account
    const newAccount = {
      email,
      password,
      name,
      role: 'student',
    };

    accounts.push(newAccount);
    localStorage.setItem('pennywise_accounts', JSON.stringify(accounts));

    // Log the user in
    const userData = { email, name, role: 'student' };
    setUser(userData);
    localStorage.setItem('pennywise_user', JSON.stringify(userData));

    return { success: true };
  };

  const login = (email, password) => {
    // Check coach credentials
    const coach = COACH_CREDENTIALS.find(
      c => c.email === email && c.password === password
    );
    
    if (coach) {
      const userData = { email: coach.email, role: coach.role };
      setUser(userData);
      localStorage.setItem('pennywise_user', JSON.stringify(userData));
      return true;
    }
    
    // Check student accounts
    const accounts = JSON.parse(localStorage.getItem('pennywise_accounts') || '[]');
    const account = accounts.find(acc => acc.email === email && acc.password === password);
    
    if (account) {
      const userData = { email: account.email, name: account.name, role: 'student' };
      setUser(userData);
      localStorage.setItem('pennywise_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
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

