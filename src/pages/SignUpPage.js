import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [formConfirmarSenha, setFormConfirmarSenha] = useState({
    confirmarSenha: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleChangeSenha(e) {
    setFormConfirmarSenha({
      ...formConfirmarSenha,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (formData.senha !== formConfirmarSenha.confirmarSenha) {
      setIsLoading(false);
      return;
    }

    const body = { ...formData };

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/sign-up`,
      body
    );

    promise.then(() => {
      setIsLoading(false);
      navigate("/");
    });

    promise.catch((erro) => {
      setIsLoading(false);
      alert(`Erro, ${erro.response.data}`);
    });
  }

  return (
    <SingUpContainer>
      <Form onSubmit={handleSubmit}>
        <MyWalletLogo />

        <Input
          placeholder="Nome"
          type="text"
          name="nome"
          onChange={handleChange}
          value={formData.nome}
          disabled={isLoading}
          required
        />

        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          disabled={isLoading}
          required
        />

        <Input
          placeholder="Senha"
          type="password"
          name="senha"
          autoComplete="new-password"
          onChange={handleChange}
          value={formData.senha}
          disabled={isLoading}
          required
        />

        <Input
          placeholder="Confirme a senha"
          type="password"
          name="confirmarSenha"
          autoComplete="new-password"
          onChange={handleChangeSenha}
          value={formConfirmarSenha.confirmarSenha}
          disabled={isLoading}
          required
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ThreeDots type="ThreeDots" color="#FFFFFF" height="100%" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>

      <Link>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
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
