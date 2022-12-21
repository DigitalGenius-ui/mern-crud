import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Welcome to MERN Crud</h1>
      <Button onClick={() => navigate("/create")}>Next</Button>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;
const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
`;
