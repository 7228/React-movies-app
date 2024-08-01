import { Link } from "react-router-dom";
import AppContext from "../AppContext"
import "./Navbar.css"
import { useContext, useState } from "react"
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
    const {user, setUser, search, setSearch, results, setResults, inputLength, setInputLength} = useContext(AppContext);
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();


    const logout = async () => {
        await signOut(auth);
        navigate("/home")
    }

    const location = useLocation();

   
    return(
        <div>
            <div className={location.pathname !== "/login" && location.pathname !== "/" ? "navbar" : "navbar-hidden"}>
                <h3 className="nav-icon"><span className="nav-icon-first-letter">M</span>ovies</h3>
                <div className="menu-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" className="menu" onClick={() => setSidebar(true)}><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </div>
                {sidebar && <div className="sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#ffffff" className="close" onClick={() => setSidebar(false)}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    <Link className="sidebar-link" to="/home"><h3 className="sidebar-tab">Home</h3></Link>
                    {user?.email ?
                        <div className="sidebar-authentication"> 
                            <Link className="sidebar-link" to="/profile" id="profile-tab"><h3 className="sidebar-tab">Profile</h3></Link>
                            <h3 className="sidebar-tab" onClick={logout}>Sign out</h3>
                        </div> :
                        <div className="sidebar-authentication">
                            <Link className="sidebar-link" to="/"><h3 className="sidebar-tab">Register</h3></Link>
                            <Link className="sidebar-link" to="/login"><h3 className="sidebar-tab">Login</h3></Link>
                        </div>}
                </div>}
                <Link className="nav-link" to="/home"><h3 className="nav-tab">Home</h3></Link>
                <Link className="nav-link-visible" to="/top-rated"><h3 className="nav-tab-visible about">Top Rated</h3></Link>
                <Link className="nav-link-visible" to="/upcoming"><h3 className="nav-tab-visible about">Upcoming</h3></Link>
            {user?.email ? 
                <div className="authentication"> 
                    <Link className="nav-link" to="/profile"><h3 className="nav-tab user">Profile</h3></Link>
                    <h3 className="nav-tab" onClick={logout}>Sign out</h3>
                </div> : 
                <div className="authentication">
                    <Link className="nav-link" to="/"><h3 className="nav-tab user">Register</h3></Link>
                    <Link className="nav-link" to="/login"><h3 className="nav-tab">Login</h3></Link>
                </div>
            }
            </div>
        </div>
    )
}