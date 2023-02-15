import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({setUser}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) return;
    setUser({email: email, password: password})
    navigate('/dashboard')
  }

  return (
    <div className='container login__container'>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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

        <Link to='/'>Back</Link>
        </form>

    </div>
  )
}

export default Login