import React from 'react'
import Header from './Header'
import Menu from './Menu'
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <>
    <div className="dashboard">
      <Header/>
      <Menu/>
    </div>
    </>
  )
}

export default Dashboard