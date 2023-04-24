import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import axios from "axios";

export default function HomePage() {
  const POSITIVO_LITERAL = "positivo";
  const EMPTY_LITERAL = "";

  const { auth } = useAuth();
  const [transacoes, setTransacoes] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [corSaldo, setCorSaldo] = useState(EMPTY_LITERAL);

  useEffect(() => {
    if (auth) {
      const { token } = auth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const promise = axios.get(
        `${process.env.REACT_APP_API_URL}/historico-transacao`,
        config
      );

      promise.then((response) => {
        setTransacoes(response.data);
        calculoSaldo(response.data);
      });

      promise.catch((erro) => {
        alert(`Erro: ${erro.response.data}`);
      });
    } else {
      Navigate("/");
    }
  }, []);

  function calculoSaldo(array) {
    let total = 0;
    array.forEach((element) => {
      if (element.tipo === "entrada") {
        total += Number(element.valor);
      } else {
        total -= Number(element.valor);
      }
    });
    setSaldo(total);
    if (total > 0) {
      setCorSaldo(POSITIVO_LITERAL);
    }
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {auth.nome}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={corSaldo}>{saldo}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <Link to={"/nova-transacao/entrada"}>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </Link>
        </button>

        <button>
          <Link to={"/nova-transacao/saida"}>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </Link>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    a {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 0px;
      height: 100%;
      p {
        font-size: 18px;
      }
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
