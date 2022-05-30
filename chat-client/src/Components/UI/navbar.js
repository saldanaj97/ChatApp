import React from 'react'
import { Link } from 'react-router-dom'

/* Navbar that will be displayed if a user if logged out */
const loggedOutNavbar = () => {
    return (
        <div>
            <li>
                <Link to='/'>Rooms</Link>
            </li>
            <li>
                <Link to='/sign-up'>Sign up</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </div>
    )
}

/* Navbar that will be displayed if a user if logged in */
const loggedInNavbar = () => {
    return (
        <div>
            <li>
                <Link to='/'>Rooms</Link>
            </li>
            <li>
                <Link to='/profile'>Profile</Link>
            </li>
            <li>
                <Link to='/logout'>Logout</Link>
            </li>
        </div>
    )
}