import React, { useContext } from "react";
import "./Register.css";
import { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { updateProfile } from "firebase/auth";


export default function Register() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const {user, setUser} = useContext(AppContext);


    const nav = useNavigate();

    async function register(event) {
        event.preventDefault();
        
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            await updateProfile(auth.currentUser, {
                displayName: document.getElementById("username").value
            })
            setUser(user)
            nav("/home")
        
        } catch (error) {
            console.log(error.message)
        }
    }


    return(
        <div className="register">
            <h1 className="title"><span className="first-letter">M</span>ovies</h1>
            <fieldset className="register-fieldset">
                <h1 className="register-title">Register</h1>
                <form className="register-form" onSubmit={register}>
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" id="username" className="register-input"></input>
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="register-input" onChange={(e) => {setRegisterEmail(e.target.value)}}></input>
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" className="register-input" onChange={(e) => {setRegisterPassword(e.target.value)}}></input>
                    <h4 className="login-label">Already have an account?<Link to="/login">  Log in</Link></h4>
                    <button type="submit" className="register-submit"><span className="submit-text">Sign Up</span></button>
                </form>
            </fieldset>
        </div>
    )
}