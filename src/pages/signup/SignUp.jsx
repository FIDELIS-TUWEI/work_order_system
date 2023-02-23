import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } form '../Firebase
import { createUserWithEmailAndPassword } form 'firebase/auth'

const SignUp = () => {
  
  // useNavigate
  const navigate = useNavigate()
  
  // useState
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  
  // handleSignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    
    try {
      const user = createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      navigate("/")
    } catch (error) {
      window.alert(error.message)
  }

  return (
    <div className='container'>
      <form onSubmit={handleSignUp}>
        <label htmlFor="signup">Sign Up</label>
        <input
          type="text"
          placeholder="Enter your Email"
          required
          onChange={(e) setSignUpEmail(e.target.value)}
        />
    
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          required
        />
    
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
