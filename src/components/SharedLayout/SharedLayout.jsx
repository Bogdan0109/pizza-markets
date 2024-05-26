import styled from '@emotion/styled'; 

import {
  NavLink,
  Outlet 
} from 'react-router-dom';

import css from './SharedLayout.module.css';

//! Стилизация NavLink
const StyledLink = styled(NavLink)`
  color: #1b1111;
  &.active {
    color: #d38e0f;
    text-decoration: underline;
  }
`;

export const SharedLayout = () => {
  return (
    <div className={css.mainContainer}>
      <nav className={css.navFlex}>
        <StyledLink className={css.navLink} to="/" end>Shop</StyledLink>
        <StyledLink className={css.navLink} to="/cart">Shopping Cart</StyledLink>
        <StyledLink className={css.navLink} to="/history">Order History</StyledLink>
      </nav>
      <Outlet />
    </div>
  );
};
