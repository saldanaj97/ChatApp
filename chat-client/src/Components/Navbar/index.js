import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnGroup, NavBtnLink } from './NavbarElements';

const Navbar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to='/'>Rooms</NavLink>
            </NavMenu>
            <NavBtnGroup>
                <NavBtnLink to='/signup'>Signup</NavBtnLink>
                <NavBtnLink to='/login'>Login</NavBtnLink>
            </NavBtnGroup>
        </Nav>
    )
}

export default Navbar;

