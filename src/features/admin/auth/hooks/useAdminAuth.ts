import { useCallback, useEffect, useState } from "react";
import {
  authService,
  type AdminUser,
  type LoginResult,
} from "../services/authService";

export interface UseAdminAuthResult {
  user: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthResult {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const [currentUser, authenticated] = await Promise.all([
        authService.getCurrentUser(),
        authService.isAuthenticated(),
      ]);

      setUser(authenticated ? currentUser : null);
      setIsAuthenticated(authenticated);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      setLoading(true);

      try {
        const result = await authService.login(email, password);

        if (result.success) {
          setUser(result.user);
          setIsAuthenticated(true);
        }

        return result;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await authService.logout();

      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refresh,
  };
}