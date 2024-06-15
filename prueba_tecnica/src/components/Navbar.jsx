import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center; /* Para alinear verticalmente */
  box-shadow: 0 4px 2px -2px gray;
`;

const StyledNavLink = styled(NavLink)`
  color: #002EFF;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 0 10px; /* Espacio entre los botones */
  
  &.active {
    background-color: #EEEBEB;
    color: #002EFF;
  }

  &:hover {
    text-decoration: none;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <StyledNavLink to="/">Formulario</StyledNavLink>
      <DesktopOnly>
        <StyledNavLink to="/registros">Registros</StyledNavLink>
      </DesktopOnly>
    </Nav>
  );
};

export default Navbar;
