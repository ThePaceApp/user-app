import React, { useEffect, useRef, useState,useContext } from 'react'
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import './login.css'
import AuthContext from "../../../context/AuthProvider"
import axios from '../../../api/Axios' 

const LOGIN_URL = '/login'

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [sucess, setSuccess] = useState(false);

 useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ phoneNumberOrUsername:username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ username, password, roles, accessToken });
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            }
            else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          }
           else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
      
  return (
    <div>
    {
      sucess ? <Navigate to="/Dashboard"/>  :(
    <div className='loginContainer'>
        <div className='loginDet'> 
          <div className="loginform">
          <p ref={errRef} className={errMsg? 'errmsg' : "offscreen"} aria-live='assertive'>{errMsg}</p>
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
            <form action=""  className='formks' onSubmit={handleSubmit}>
              <div className="formk">
                <div className='box'>
                  <label htmlFor="Username" style={{display:'flex'}}>Username:
                  </label> 
                  <input type="text"
                  id="username"
                  ref={userRef}
                  onChange={(e)=>setUsername(e.target.value)}
                  value={username}
                  required
                  autoComplete='off'/>
                </div>
                <div className='box'>
                  <label htmlFor="Password" style={{display:'flex'}}>Password:
                  </label> 
                  <input type=""
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  />
                </div> 
                </div> 
                <Link to ='/User/ResetPassword' className="fgt">Forget password?</Link>
                <button className={!username || !password?  "btnlog": "btnlogs"}>Sign in</button>
            </form>
        </div>
      </div>
      <Outlet/>
    </div>
  )}
    </div>
  )
}

export default Login
