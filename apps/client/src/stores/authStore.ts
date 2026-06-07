import { create } from "zustand";

type LocalAccount = {
  login: string;
  password: string;
  userId: string;
};

type PreparedSession = {
  displayName: string;
  userId: string;
};

type AuthState = {
  userId: string;
  displayName: string;
  initialized: boolean;
  isAuthenticated: boolean;
  clear: () => void;
  finalize: (session: PreparedSession) => void;
  init: () => void;
  login: (login: string, password: string) => PreparedSession;
  register: (login: string, password: string) => PreparedSession;
};

const accountsStorageKey = "sdg_accounts";
const userIdStorageKey = "sdg_demo_user";
const displayNameStorageKey = "sdg_demo_name";

function slugifyLogin(login: string): string {
  return login.trim().toLowerCase().replaceAll(/\s+/g, "-");
}

function readAccounts(): LocalAccount[] {
  const raw = localStorage.getItem(accountsStorageKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as LocalAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: LocalAccount[]) {
  localStorage.setItem(accountsStorageKey, JSON.stringify(accounts));
}

function persistSession(userId: string, displayName: string) {
  localStorage.setItem(userIdStorageKey, userId);
  localStorage.setItem(displayNameStorageKey, displayName);
  localStorage.removeItem("sdg_access_token");
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: "",
  displayName: "",
  initialized: false,
  isAuthenticated: false,
  clear: () => {
    localStorage.removeItem(userIdStorageKey);
    localStorage.removeItem(displayNameStorageKey);
    localStorage.removeItem("sdg_access_token");
    set({ userId: "", displayName: "", isAuthenticated: false });
  },
  finalize: (session) => {
    persistSession(session.userId, session.displayName);
    set({
      userId: session.userId,
      displayName: session.displayName,
      isAuthenticated: true
    });
  },
  init: () => {
    const userId = localStorage.getItem(userIdStorageKey) ?? "";
    const displayName = localStorage.getItem(displayNameStorageKey) ?? "";

    set({
      userId,
      displayName,
      initialized: true,
      isAuthenticated: Boolean(userId && displayName)
    });
  },
  login: (login, password) => {
    const normalizedLogin = login.trim();
    const accounts = readAccounts();
    const account = accounts.find((item) => item.login.toLowerCase() === normalizedLogin.toLowerCase());

    if (!account || account.password !== password) {
      throw new Error("Неверный никнейм или пароль.");
    }

    return {
      userId: account.userId,
      displayName: account.login
    };
  },
  register: (login, password) => {
    const normalizedLogin = login.trim();
    const normalizedPassword = password.trim();

    if (!normalizedLogin) {
      throw new Error("Введите никнейм.");
    }

    if (!normalizedPassword) {
      throw new Error("Введите пароль.");
    }

    const accounts = readAccounts();
    if (accounts.some((item) => item.login.toLowerCase() === normalizedLogin.toLowerCase())) {
      throw new Error("Такой никнейм уже существует.");
    }

    const account: LocalAccount = {
      login: normalizedLogin,
      password: normalizedPassword,
      userId: slugifyLogin(normalizedLogin)
    };

    writeAccounts([...accounts, account]);

    return {
      userId: account.userId,
      displayName: account.login
    };
  }
}));
