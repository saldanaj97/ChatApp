import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavButton, NavBtnLink } from './NavbarElements';

const Navbar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to='/'>Rooms</NavLink>
            </NavMenu>
            <NavMenu>
                <NavLink to='/signup'>Signup</NavLink>
            </NavMenu>
            <NavMenu>
                <NavLink to='/login'>Login</NavLink>
            </NavMenu>
        </Nav>
    )
}

export default Navbar;

