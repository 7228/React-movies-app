import React, { useContext, useState } from 'react';
import "./Register.css";
import { auth } from '../firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';



const Login = () => {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const {user, setUser} = useContext(AppContext)

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
   
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setUser(user);
      navigate("/home");
    
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className="login">
        <h1 className="title"><span className="first-letter">M</span>ovies</h1>
        <fieldset className="register-fieldset">
            <h1 className="register-title">Login</h1>
            <form className="register-form" onSubmit={login}>
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" className="register-input" onChange={(e) => {setLoginEmail(e.target.value)}}></input>
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" id="password" className="register-input" onChange={(e) => {setLoginPassword(e.target.value)}}></input>
                <h4 className="login-label">Don't have an account?<Link to="/">  Register</Link></h4>
                <button type="submit" className="register-submit"><span className="submit-text">Log in</span></button>
            </form>
        </fieldset>
    </div>
)
}

export default Login