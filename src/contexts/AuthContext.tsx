import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah@evolvglobal.com',
        role: 'ceo',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        permissions: ['all']
      },
      {
        id: '2',
        name: 'Rajesh Kumar', 
        email: 'rajesh@distributor.com',
        role: 'distributor',
        region: 'North India',
        territory: 'Delhi NCR',
        permissions: ['orders', 'inventory', 'performance']
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily@evolvglobal.com',
        role: 'brand_manager',
        permissions: ['campaigns', 'analytics', 'distributors', 'reports']
      },
      {
        id: '4',
        name: 'Arjun Patel',
        email: 'arjun@evolvglobal.com',
        role: 'admin',
        permissions: ['all']
      },
      {
        id: '5',
        name: 'Priya Sharma',
        email: 'priya@evolvglobal.com',
        role: 'sales_team',
        region: 'West India',
        territory: 'Maharashtra',
        permissions: ['distributors', 'orders', 'targets', 'analytics']
      },
      {
        id: '6',
        name: 'Vikram Singh',
        email: 'vikram@evolvglobal.com',
        role: 'manufacturing',
        permissions: ['production', 'inventory', 'forecasting']
      },
      {
        id: '7',
        name: 'Anita Desai',
        email: 'anita@evolvglobal.com',
        role: 'reports',
        permissions: ['reports', 'analytics', 'export']
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};