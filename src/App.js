import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import { AuthProvider } from "./contexts/AuthContext.js";
import RedirectHome from "./pages/redirectHome.js";

export default function App() {
  return (
    <AuthProvider>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/nova-transacao/:tipo"
              element={<TransactionsPage />}
            />
            <Route path="/nova-transacao" element={<RedirectHome />} />
          </Routes>
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
