"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type StoredUser = User & {
  password: string;
};

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const DEMO_USER: StoredUser = {
  name: "Damayan Demo User",
  email: "demo@damayan.app",
  password: "password123",
};

const AUTH_STORAGE_KEY = "damayan-web-auth";
const USERS_STORAGE_KEY = "damayan-web-users";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [DEMO_USER];
  }

  const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) {
    return [DEMO_USER];
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return [DEMO_USER, ...parsed.filter((user) => user.email !== DEMO_USER.email)];
  } catch {
    return [DEMO_USER];
  }
}

function writeStoredUsers(users: StoredUser[]) {
  const customUsers = users.filter((user) => user.email !== DEMO_USER.email);
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(customUsers));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as User);
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      login: async (email, password) => {
        const users = readStoredUsers();
        const match = users.find(
          (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
        );

        await new Promise((resolve) => window.setTimeout(resolve, 450));

        if (!match) {
          throw new Error("Invalid credentials. Use the demo account or create one.");
        }

        const nextUser = { name: match.name, email: match.email };
        setUser(nextUser);
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      },
      signup: async (name, email, password) => {
        const users = readStoredUsers();
        const exists = users.some((entry) => entry.email.toLowerCase() === email.toLowerCase());

        await new Promise((resolve) => window.setTimeout(resolve, 450));

        if (exists) {
          throw new Error("An account with that email already exists.");
        }

        const nextEntry = { name, email, password };
        writeStoredUsers([...users, nextEntry]);

        const nextUser = { name, email };
        setUser(nextUser);
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      },
      logout: () => {
        setUser(null);
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      },
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
