import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const initialUserState = Cookies.get("Admin_Key") && sessionStorage.getItem("Admin");

  const [authUser, setAuthUser] = useState( initialUserState ? JSON.parse(initialUserState) : undefined);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);