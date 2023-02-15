import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
        <h1>404</h1>
        <p>Page not Found</p>
        <Link to='/'>Back Home</Link>
    </>
  )
}

export default Error