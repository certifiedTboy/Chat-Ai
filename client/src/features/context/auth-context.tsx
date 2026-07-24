import { createContext, useContext, useState } from "react";

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

  function logout() {}

  function checkUserIsAuthenticated(userData: IUser) {
    if (localStorage.getItem("isAuthenticated")) {
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
