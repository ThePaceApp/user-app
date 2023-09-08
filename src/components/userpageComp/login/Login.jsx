import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './login.css'

const Login = () => {
  return (
    <div className='loginContainer'>
        <div className='loginDet'> 
          <div className="loginform">
            <div className="loglinks">
              <div>
                <h1 style={{color:"#16955C"}} className="nins">Welcome.</h1>
              </div>
              <div className="loglink">
                <NavLink to ='/User/Login'
                className='bigLink'
                style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "bold",
                  color: isPending ? "red" : "#FFFf",
                  backgroundColor:"isActive" ? "#16955C": "",
                };
                }}
                >Sign In</NavLink>
                <NavLink to='/User/Register'
                className='bigLink'
                >Sign Up</NavLink>
              </div>
            </div>
            <form action=""  className='formks'>
              <div className="formk">
                <div className='box'>
                  <label htmlFor="Username" style={{display:'flex'}}>Username:
                  </label> 
                  <input type="text"
                  id="username"
                  required
                  autoComplete='off'/>
                </div>
                <div className='box'>
                  <label htmlFor="Username" style={{display:'flex'}}>Password:
                  </label> 
                  <input type="text"
                  id="username"
                  required
                  autoComplete='off'/>
                </div>
                </div>
                <Link to ='/User/ResetPassword' className="fgt">Forget password?</Link>
                <button className='btnlogs'>Sign in</button>
            </form>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default Login
