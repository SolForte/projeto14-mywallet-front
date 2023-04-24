import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { auth, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.token) {
      navigate("/home");
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const body = { ...formData };
    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/sign-in`,
      body
    );

    promise.then((response) => {
      setIsLoading(false);
      login(response.data);
      navigate("/home");
    });

    promise.catch((erro) => {
      setIsLoading(false);
      alert(`Erro: ${erro.response.data}`);
    });
  }

  return (
    <SingInContainer>
      <Form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          name="senha"
          onChange={handleChange}
          value={formData.senha}
          disabled={isLoading}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ThreeDots type="ThreeDots" color="#FFFFFF" height="100%" />
          ) : (
            "Entrar"
          )}
        </Button>
      </Form>

      <Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input``;

const Form = styled.form``;
