import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {
  
  // useNavigate
  const navigate = useNavigate();
  
  // useState
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    
    try {
      const user = signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      navigate("/")
    } catch(error) {
      window.alert(error.message)
  }
  

  return (
    <div className='login__container'>
        <form onSubmit={handleLogin}>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            placeholder="Enter your email"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          
          <label htmFor="passowrd">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setLoginPassword}
          />
    
          <button type="submit">Login</button>
        </form>

    </div>
  )
}

export default Login
