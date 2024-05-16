import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <div className="heading">
                    <h1>Chat Room</h1>
                </div>
                <div className="links">
                    <Link to={"/"} className='link'>Login</Link>
                    <p>|</p>
                    <Link to={"/signup"} className='link'>Signup</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar