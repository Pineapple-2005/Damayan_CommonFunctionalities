import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type StoredUser = User & {
  password: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const demoUser: StoredUser = {
  name: "Damayan Demo User",
  email: "demo@damayan.app",
  password: "password123",
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<StoredUser[]>([demoUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 350));

        const match = registeredUsers.find(
          (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
        );

        if (!match) {
          throw new Error("Invalid credentials. Use the demo account or create one.");
        }

        setUser({ name: match.name, email: match.email });
      },
      signup: async (name, email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 350));

        const exists = registeredUsers.some(
          (entry) => entry.email.toLowerCase() === email.toLowerCase(),
        );

        if (exists) {
          throw new Error("An account with that email already exists.");
        }

        const nextUser = { name, email, password };
        setRegisteredUsers((current) => [...current, nextUser]);
        setUser({ name, email });
      },
      logout: () => {
        setUser(null);
      },
    }),
    [registeredUsers, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
