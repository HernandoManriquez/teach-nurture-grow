
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isInstructor: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock authentication - in a real app, this would connect to Supabase
  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('educate_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // This is a mock implementation
      // In a real app, we would authenticate against Supabase
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user - in production this would come from Supabase auth
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('instructor') ? 'instructor' : 'student',
      };
      
      setUser(mockUser);
      localStorage.setItem('educate_user', JSON.stringify(mockUser));
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // This is a mock implementation
      // In a real app, we would register with Supabase
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user - in production this would come from Supabase auth
      const mockUser: User = {
        id: Math.random().toString(36).slice(2, 9),
        email,
        name,
        role: 'student',
      };
      
      setUser(mockUser);
      localStorage.setItem('educate_user', JSON.stringify(mockUser));
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('educate_user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isInstructor = () => {
    return user?.role === 'instructor' || user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isInstructor }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
