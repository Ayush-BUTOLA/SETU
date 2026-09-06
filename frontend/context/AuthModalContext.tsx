'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { SlideNavbarAuth, UserRole } from '@/components/SlideNavbarAuth';

interface AuthModalContextType {
  isAuthOpen: boolean;
  openAuth: (initialRole?: UserRole) => void;
  closeAuth: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [initialRole, setInitialRole] = useState<UserRole | undefined>(undefined);

  const openAuth = useCallback((role?: UserRole) => {
    if (role) setInitialRole(role);
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  return (
    <AuthModalContext.Provider value={{ isAuthOpen, openAuth, closeAuth }}>
      {children}
      <SlideNavbarAuth
        open={isAuthOpen}
        onClose={closeAuth}
        initialRole={initialRole}
        theme="dark"
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
