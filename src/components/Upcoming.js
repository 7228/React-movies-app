import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Upcoming.css"

export default function Upcoming() {
    const [upcoming, setUpcoming] = useState([]);
    let upcomingMovies;

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=5b1a01294c6f0531b4cc62f154fa490f")
            .then((res) => res.json())
            .then((data) => setUpcoming(data.results))
    },[])

    if(upcoming) {
        upcomingMovies = upcoming.map((movie) => {
            return(
                <Link to={`/movie/${movie.id}`} className="movie-link">
                    <MovieCard 
                        key={movie.id}
                        title = {movie.original_title} 
                        poster={movie.poster_path}
                        vote={movie.vote_average}
                    />
                </Link>
            )
        })
    }
    return(
        <div className="movie-container">
            <div style={{marginTop:"200px"}}></div>
            <div className="upcoming-movies">
                {upcomingMovies[0] && upcomingMovies}
            </div>
        </div>
    )
    
}