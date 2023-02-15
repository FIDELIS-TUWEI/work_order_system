import React from 'react'
import './signup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SignUp = ({setUser}) => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !email) return;
    setUser({name: name, email: email})
    navigate('/')
  }

  return (
    <div className='container'>
      <div className='signup__container'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="create account">Create new account</label>
          
          <label htmlFor="name">Name</label>
          <input 
            type="text" name="name" 
            placeholder='Enter your name' required 
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='Enter your email' required />

          <label htmlFor="password">Password</label>
          <input 
            type="password" name="password" 
            placeholder='Enter new password' required 
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="confirmPswd">Confirm Password</label>
          <input type="password" name="confirmPswd" placeholder='Confirm Password' required />

          <button type='submit' className='btn'>Sign Up</button>

          <Link to='/'>Back</Link>
        </form>
      </div>
      
    </div>
  )
}

export default SignUp