import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import Formulario from './components/Formulario.jsx';
import Registros from './components/Registros.jsx';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Main />
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/registros" element={<Registros />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
