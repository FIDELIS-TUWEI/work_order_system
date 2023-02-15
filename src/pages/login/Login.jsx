import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) return;
    setUser({email: email, password: password})
    navigate('/home')
  }

  return (
    <div className='container login__container'>
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" name="email" 
            placeholder='Enter your email' required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password'>Password</label>
          <input 
            type="password" name="password" 
            placeholder='Enter your password' required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' className='btn'>Login</button>
        </form>
    </div>
  )
}

export default Login