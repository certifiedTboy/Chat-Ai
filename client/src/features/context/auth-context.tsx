import { createContext, useContext, useState } from "react";
import { useLocation } from "wouter";
import { useHttp } from "@/hooks/use-http";

interface IUser {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: IUser | null;
  logout: () => void;
  checkUserIsAuthenticated: (userData: IUser) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  logout: () => {},
  checkUserIsAuthenticated: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [, setLocation] = useLocation();

  const [logoutUser] = useHttp<void>();

  function logout() {
    localStorage.removeItem("isAuth");
    setIsLoggedIn(false);
    setUser(null);
    logoutUser("/auth/logout", "POST", "include", null, {
      "Content-Type": "application/json",
    });
    setLocation("/auth", { replace: true });
  }

  function checkUserIsAuthenticated(userData: IUser) {
    if (localStorage.getItem("isAuth")) {
      setIsLoggedIn(true);
      setUser({ ...userData });
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  const value = {
    isLoggedIn,
    user,
    logout,
    checkUserIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
