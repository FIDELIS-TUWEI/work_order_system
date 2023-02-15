import React from 'react'
import './signup.css'

const SignUp = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="create account">Create new account</label>
        
        <label htmlFor="name">Name</label>
        <input type="text" name="name"placeholder='Enter your name' required />

        <label htmlFor="email">Email</label>
        <input type="email" name='email' placeholder='Enter your email' required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder='Enter new password' required />

        <label htmlFor="confirmPswd">Confirm Password</label>
        <input type="password" name="confirmPswd" placeholder='Confirm Password' required />
      </form>
    </div>
  )
}

export default SignUp