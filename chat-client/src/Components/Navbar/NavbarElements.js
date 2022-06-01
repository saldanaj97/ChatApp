import { NavLink as Link } from "react-router-dom";
import styled from 'styled-components';

/* The main colors that will be used */
let mainColor = '#FA2849'
let secondaryColor = '#110F15'
let tertiaryColor = '#423399'

/* Navbar Div */
export const Nav = styled.nav`
  background: #110F15;
  height: 45px;
  display: flex;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;

/* Styling for the menu items that ARE NOT BUTTONS */
export const NavLink = styled(Link)`
  color: #FA2849;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #FFFFFF;
  }
`;

/* All the menu items in the navbar that are not the buttons on the right*/
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 200px) {
    display: none;
  }
`;

/* Group of buttons that will be on the right side */
export const NavBtnGroup = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  justify-content: flex-end;
  width: 100vw;
  @media screen and (max-width: 200px) {
    display: none;
  }
`;

/* Styling for the nav button links */
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  padding: 10px 10px;
  color: #FA2849;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  font-size: 18px;
  margin-left: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #FA2849;
    color: #FFFFFF;
  }
  &.active {
    background: #FA2849;
    color: #FFFFFF;
  }
`;