import React from 'react'
import { NavLink } from 'react-router-dom'

const StyledNavbar = () => {
  return (
    <nav className='navbar'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Home</NavLink>
        <NavLink to='/login' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Login</NavLink>
        <NavLink to='/signup' className={({ isActive }) => (isActive ? 'link active' : 'link')}>Sign Up</NavLink>

    </nav>
  )
}

export default StyledNavbar