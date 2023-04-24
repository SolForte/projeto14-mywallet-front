import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const [formData, setFormData] = useState({
    titulo: "",
    valor: "",
    tipo: tipo,
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("auth"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = { ...formData };

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/nova-transacao`,
      body,
      config
    );

    promise.then((response) => {
      navigate("/home");
    });

    promise.catch((erro) => {
      alert(`Erro: ${erro.response.data}`);
    });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <Form onSubmit={handleSubmit}>
        <input
          name="valor"
          placeholder="Valor"
          type="number"
          value={formData.valor}
          onChange={handleChange}
          required
        />
        <input
          name="titulo"
          placeholder="Descrição"
          type="text"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <button type="submit">Salvar {tipo}</button>
      </Form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;

const Form = styled.form``;
