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
  const ENTRADA_LITERAL = "entrada";
  const EMPTY_LITERAL = "";

  const { auth } = useAuth();
  const [transacoes, setTransacoes] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [corSaldo, setCorSaldo] = useState(EMPTY_LITERAL);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("auth");
    navigate("/");
  }

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
      navigate("/");
    }
  }, [auth]);

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
        <h1>Olá, {auth ? auth.nome : null}</h1>
        <BiExit onClick={() => logOut()} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes && transacoes.length > 0 ? (
            transacoes.map((elemento) => {
              return (
                <ListItemContainer key={elemento._id}>
                  <div>
                    <span>{elemento.data}</span>
                    <strong>{elemento.titulo}</strong>
                  </div>
                  <Value
                    color={
                      ENTRADA_LITERAL === elemento.tipo
                        ? POSITIVO_LITERAL
                        : null
                    }
                  >
                    {elemento.valor}
                  </Value>
                </ListItemContainer>
              );
            })
          ) : (
            <></>
          )}
          {transacoes === null || transacoes.length === 0 ? (
            <SemRegistro>Não há registros de entrada ou saída</SemRegistro>
          ) : (
            <></>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={corSaldo}>{saldo}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <Link to={"/nova-transacao/entrada"}>
          <button>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </button>
        </Link>

        <Link to={"/nova-transacao/saida"}>
          <button>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </button>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  );
}
const SemRegistro = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #868686;
`;

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
  ul {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 350px;
  }
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
  a {
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    width: 100%;
    button {
      height: 115px;
      font-size: 22px;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 18px;
      }
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "#03AC00" : "#C70000")};
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
