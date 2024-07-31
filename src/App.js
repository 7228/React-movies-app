import React, { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import  AppContext  from "./AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import Profile from "./components/Profile";
import MovieDetail from "./components/MovieDetail";
import Testing from "./components/Testing";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomeHeader from "./components/HomeHeader";


export default function App() {
    const [user, setUser] = useState({});
    const [popular, setPopular] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [movieId, setMovieId] = useState([]);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [inputLength, setInputLength] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
 
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    useEffect(() => {
        fetch(api)
            .then((res)=> res.json())
            .then((data) => setPopular(data.results))

    },[])

    const location = useLocation();


    return(
        <div>
            <AppContext.Provider 
                    value={
                        {user, setUser, 
                        popular, setPopular, 
                        favorites, setFavorites,
                        movieId, setMovieId,
                        search, setSearch,
                        results, setResults,
                        inputLength, setInputLength,
                        showNavbar
                    }
                    }>
                {location.pathname === "/home" ? <HomeHeader />  : <Header />}
                <Routes>
                    <Route path="/" element={<Register />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/top-rated" element={<TopRated />}></Route>
                    <Route path="/upcoming" element={<Upcoming />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/movie/:id" element={<MovieDetail />}></Route>
                    <Route path="/testing" element={<Testing />}></Route>
                </Routes>
            </AppContext.Provider>
        </div>
    )
}