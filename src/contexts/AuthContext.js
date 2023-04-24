import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const localStorageConversion = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(localStorageConversion);

  function login(data) {
    //Parâmetro {data} equivale ao {response.data}, por sua vez obtido através do .then da const {promise}. I.e. response.data = data = { token, idUsuario,}
    setAuth(data);
    //Insere no local storage uma string na forma; auth: { token, idUsuario,}
    localStorage.setItem("auth", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
