import React from 'react'

const Dashboard = ({user}) => {
  return (
    <div>
        <h4>Hello, {user?.email}</h4>
    </div>
  )
}

export default Dashboard