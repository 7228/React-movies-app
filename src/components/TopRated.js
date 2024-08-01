import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./TopRated.css"
import { Link } from "react-router-dom";

export default function TopRated() {
    const [topRated, setTopRated] = useState([]);
    let top;

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=5b1a01294c6f0531b4cc62f154fa490f")
            .then((res) => res.json())
            .then((data) => setTopRated(data.results))
    },[])

    if(topRated) {
         top = topRated.map((movie) => {
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
            <div className="top-rated-movies">
                {top[0] && top}
            </div>
        </div>
    )
}