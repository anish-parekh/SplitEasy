import React, { PureComponent } from 'react'
import { Routes, Link } from 'react-router-dom';

export class Temp extends PureComponent {
  render() {
    return (
      <div>
         <h1>Hi there</h1> 
         <Link to={`/home`}>
            home
         </Link>
         <Link to={`/login`}>
            Login
         </Link>
         {/* <a href="/home">Home</a>
         <a href="/dashboard">Dashboard</a> */}                     
      </div>
    )
  }
}

export default Temp;