import { Link } from "react-router-dom";
import AppContext from "../AppContext"
import "./Header.css"
import { useContext } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Header() {
    const {user, setUser, search, setSearch, results, setResults, inputLength, setInputLength} = useContext(AppContext);
    const navigate = useNavigate();


    const logout = async () => {
        await signOut(auth);
        navigate("/home")
    }

   
    return(
        <div className="header">
            <h3 className="nav-icon"><span className="nav-icon-first-letter">M</span>ovies</h3>
            <Link className="nav-link" to="/home"><h3 className="nav-tab">Home</h3></Link>
            <Link className="nav-link" to="/top-rated"><h3 className="nav-tab about">Top Rated</h3></Link>
            <Link className="nav-link" to="/upcoming"><h3 className="nav-tab about">Upcoming</h3></Link>
        {user?.email ? 
            <div className="auth"> 
                <Link className="nav-link" to="/profile"><h3 className="nav-tab user">Profile</h3></Link>
                <h3 className="nav-tab" onClick={logout}>Sign out</h3>
            </div> : 
            <div className="auth">
                <Link className="nav-link" to="/"><h3 className="nav-tab">Register</h3></Link>
                <Link className="nav-link" to="/login"><h3 className="nav-tab">Login</h3></Link>
            </div>
        }
        </div>
    )
}