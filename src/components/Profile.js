import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import Header from "./Header";
import MovieCard from "./MovieCard";
import "./Profile.css"
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Profile() {
    const [fav, setFav] = useState([]);
    const {user, movieId, setMovieId} = useContext(AppContext);

    let movies;

    async function readData() {
        const querySnapshot = await getDocs(collection(db, "Favorites"));
     
        querySnapshot.forEach((doc) => {
            
            if(user.displayName === doc.data().user) {
                setFav(oldFav => {
                    return [
                        ...oldFav,
                        doc.data().movie
                    ]
                })
                setMovieId(oldId => {
                    return [
                        ...oldId,
                        String(doc.data().movie.id).concat(user?.displayName)
                 ]
                }) 
            }
        })
    }


    useEffect(() => {
        readData()
    },[])

    movies = fav.map((movie) => {
        if(movieId.includes(String(movie.id).concat(user?.displayName))) {
            return(
                <Link to={`/movie/${movie.id}`} className="movie-link">
                    <MovieCard 
                        key={movie.id}
                        title = {movie.original_title} 
                        poster={movie.poster_path}
                        vote={Math.floor(movie.vote_average * 10) / 10}
                    />
                </Link>
            )
        }    
    }
    )
    

    return(
        <div className="profile">
            <Header />
            <div className="favorite-movies">
                {movies[0] && movies}
            </div>
        </div>
    )
}