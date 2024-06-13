import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  padding: 5px;
  heigth: 200px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  margin: 0;
  text-align: left;
  color: #002EFF;
`;

const Image = styled.img`
  max-width: 250px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    margin-top: 10px;
    max-width: 200px;
    align-self: center;
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <Title>Formulario de prueba</Title>
      <Image src="src/assets/img/laptop.JPG" alt="Imagen" />
    </MainContainer>
  );
};

export default Main;
