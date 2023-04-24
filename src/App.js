import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import { UserContext } from "./contexts/user.context.js";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext.js";

export default function App() {
  const [user, setUser] = useState(undefined);

  return (
    <AuthProvider>
      <PagesContainer>
        <BrowserRouter>
          <UserContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/nova-transacao/:tipo"
                element={<TransactionsPage />}
              />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </PagesContainer>
    </AuthProvider>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
