import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder='Enter your email' required />

        <label htmlFor='password'>password</label>
        <input type="password" name="password" placeholder='Enter your password' required />

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login