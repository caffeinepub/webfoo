import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthUser {
  username: string; // internally the mobile number used as key
  displayName: string;
  phone: string;
}

interface AuthContextValue {
  currentUser: AuthUser | null;
  isInitializing: boolean;
  login: (
    phone: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    phone: string,
    displayName: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_USER_KEY = "webfoo_auth_user";
const KNOWN_USERS_KEY = "webfoo_known_users";

interface StoredUser {
  username: string;
  displayName: string;
  phone: string;
  passwordHash: string;
}

function simpleHash(str: string): string {
  // Simple deterministic hash for simulated auth (not secure, just for demo)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function getKnownUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(KNOWN_USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveKnownUsers(users: StoredUser[]): void {
  localStorage.setItem(KNOWN_USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as AuthUser;
        // Ensure phone field is present (backward compat — older sessions may lack it)
        if (!stored.phone) {
          stored.phone = stored.username;
        }
        setCurrentUser(stored);
      }
    } catch {
      // ignore
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const login = useCallback(
    async (
      phone: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      const cleanPhone = phone.replace(/\D/g, "");
      if (!cleanPhone || !password.trim()) {
        return {
          success: false,
          error: "Mobile number and password are required.",
        };
      }
      if (cleanPhone.length !== 10) {
        return {
          success: false,
          error: "Please enter a valid 10-digit mobile number.",
        };
      }

      const knownUsers = getKnownUsers();
      const passwordHash = simpleHash(password);
      const existing = knownUsers.find(
        (u) => (u.phone ?? u.username) === cleanPhone,
      );

      if (existing) {
        // Registered user: verify password
        if (existing.passwordHash !== passwordHash) {
          return { success: false, error: "Incorrect password." };
        }
        const user: AuthUser = {
          username: existing.username,
          displayName: existing.displayName,
          phone: existing.phone ?? existing.username,
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        setCurrentUser(user);
        return { success: true };
      }

      // Unknown mobile: not registered
      return {
        success: false,
        error:
          "No account found with this mobile number. Please register first.",
      };
    },
    [],
  );

  const register = useCallback(
    async (
      phone: string,
      displayName: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        return {
          success: false,
          error: "Please enter a valid 10-digit mobile number.",
        };
      }
      if (!displayName.trim()) {
        return { success: false, error: "Display name is required." };
      }
      if (!password.trim()) {
        return { success: false, error: "Password is required." };
      }

      const knownUsers = getKnownUsers();
      const alreadyExists = knownUsers.some(
        (u) => (u.phone ?? u.username) === cleanPhone,
      );

      if (alreadyExists) {
        return {
          success: false,
          error:
            "An account with this mobile number already exists. Please log in.",
        };
      }

      const newUser: StoredUser = {
        username: cleanPhone,
        displayName: displayName.trim(),
        phone: cleanPhone,
        passwordHash: simpleHash(password),
      };
      saveKnownUsers([...knownUsers, newUser]);

      const user: AuthUser = {
        username: newUser.username,
        displayName: newUser.displayName,
        phone: newUser.phone,
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_USER_KEY);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isInitializing, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
