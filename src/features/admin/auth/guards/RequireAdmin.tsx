import type { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { useAdminAuth } from "../hooks/useAdminAuth";

interface RequireAdminProps {
  children: ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { loading, isAuthenticated } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    const loginPath: string = "/admin/login";
    return <Navigate to={loginPath} />;
  }

  return <>{children}</>;
}