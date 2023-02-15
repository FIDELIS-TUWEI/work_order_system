import React from 'react'
import { NavLink } from 'react-router-dom'

const StyledNavbar = () => {
  return (
    <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/'>Login</NavLink>
        <NavLink to='/'>Sign Up</NavLink>

    </nav>
  )
}

export default StyledNavbar