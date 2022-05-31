import React from "react";
import { Nav, Navlink, Bars, NavMenu, NavButton, NavBtnLink } from './NavbarElements';

const Navbar = () => {
    return (
        <Nav>
            <Bars />
            <NavMenu>
                <Navlink to='/'>Rooms</Navlink>
            </NavMenu>
            <NavMenu>
                <Navlink to='/signup'>Signup</Navlink>
            </NavMenu>
            <NavMenu>
                <Navlink to='/login'>Login</Navlink>
            </NavMenu>
        </Nav>
    )
}

export default Navbar;

