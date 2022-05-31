import React from 'react'
import { Link } from 'react-router-dom'

/* Navbar that will be displayed if a user if logged out */
const Navbar = () => {
    return (
        <div>
            <li>
                <Link to='/'>Rooms</Link>
            </li>
            <li>
                <Link to='/signup'>Sign up</Link>
            </li>
            <li>
                <Link to='/profile'>Login</Link>
            </li>
        </div>
    )
}


export default Navbar;