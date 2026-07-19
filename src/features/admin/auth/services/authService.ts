import { supabase } from "../../../../lib/supabase";

export type AdminRole = "owner" | "admin" | "editor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface LoginSuccess {
  success: true;
  user: AdminUser;
}

export interface LoginFailure {
  success: false;
  error: string;
}

export type LoginResult = LoginSuccess | LoginFailure;

export interface LogoutResult {
  success: true;
}

async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error || !data.user) {
    return {
      success: false,
      error: error?.message ?? "Login failed.",
    };
  }

  return {
    success: true,
    user: {
      id: data.user.id,
      name:
        data.user.user_metadata?.name ??
        "Administrator",
      email: data.user.email ?? "",
      role: "admin",
    },
  };
}

async function logout(): Promise<LogoutResult> {
  await supabase.auth.signOut();

  return {
    success: true,
  };
}

async function getCurrentUser(): Promise<AdminUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name:
      user.user_metadata?.name ??
      "Administrator",
    email: user.email ?? "",
    role: "admin",
  };
}

async function isAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session !== null;
}

export const authService = Object.freeze({
  login,
  logout,
 getCurrentUser,
  isAuthenticated,
});