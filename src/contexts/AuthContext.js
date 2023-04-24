import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const localStorageConversion = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(localStorageConversion);

  function login(data) {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
