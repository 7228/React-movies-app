import React from "react";
import "./Home.css";
import { useContext } from "react";
import AppContext from "../AppContext";
import HomeHeader from "./HomeHeader";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default function Home() {
    const{ user, setUser, popular, setPopular, favorites, results, inputLength} = useContext(AppContext);
    let searchResults;

    const movies = popular.map((movie) => {
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

    if(results) {
        searchResults = results.map((movie) => {
            return (<Link to={`/movie/${movie.id}`} className="movie-link">
                        <MovieCard 
                            key={movie.id}
                            title = {movie.original_title} 
                            poster={movie.poster_path}
                            vote={Math.floor(movie.vote_average * 10) / 10}
                        />
                    </Link>
            )
        })
    }

    return(
        inputLength > 0 ? 
        <div className="movie-container">
            <HomeHeader />
            <div style={{marginTop:"200px"}}></div>
            <div className="popular-movies">
                {searchResults}
            </div>
        </div> :
        <div className="movie-container">
            <HomeHeader />
            <div style={{marginTop:"200px"}}></div>
            <div className="popular-movies">
                {movies}
            </div>
        </div>
    )
}
