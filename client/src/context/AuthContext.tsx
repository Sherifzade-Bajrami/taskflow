import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("taskflow-auth") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("taskflow-auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("taskflow-auth");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
