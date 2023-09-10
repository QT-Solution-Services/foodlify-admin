import CookieService from "@/services/Cookies.services";
import React, { FC, ReactNode, createContext, useState } from "react";

interface AuthContextProps {
  token: string;
  userData: any;
  setAuthToken: (newToken: string) => void;
  setAdminDetails: (data: any) => void;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextProps>({
  token: "",
  userData: null,
  setAuthToken: () => {},
  setAdminDetails: () => {},
});

// Create the AuthProvider component
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(
    CookieService.getter("app_session") || "",
  );
  const storedUserData = CookieService.getter("user_data");
  const [userData, setUserData] = useState<any>(storedUserData || null);

  // Function to set the user's token to the cookie storage
  const setAuthToken = (newToken: string) => {
    // if (newToken) {
    CookieService.setter("app_session", newToken);
    setToken(newToken);
    // }
  };

  // Function to set the user's data to the cookie storage
  const setAdminDetails = (data: any) => {
    // if (data !== null) {
    CookieService.setter("user_data", data);
    setUserData(data);
    // }
  };

  // Provide the auth context values to the children components
  return (
    <AuthContext.Provider
      value={{ token, userData, setAuthToken, setAdminDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
