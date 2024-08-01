import { useEffect } from "react";
import "./MovieDetail.css"
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useContext } from "react";
import AppContext from "../AppContext";
import { deleteDoc, addDoc, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function MovieDetail() {
    const [movie, setMovie] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [voted, setVoted] = useState(false);
    const [rating, setRating] = useState("");
    const {id} = useParams();
    const { favorites, setFavorites, movieId, setMovieId, user} = useContext(AppContext)


    let genres = "";

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5b1a01294c6f0531b4cc62f154fa490f`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5b1a01294c6f0531b4cc62f154fa490f`)
            .then((res) => res.json())
            .then((data) => console.log(data))
  
    },[])

    if(movie) {
        for(let i = 0; i < movie.genres.length; i++) {
            genres += movie.genres[i].name.slice(0,1).toUpperCase() +  movie.genres[i].name.slice(1).toLowerCase() + "| ";
    }}

    async function addToFavorite() {
        try {
            if(movieId.includes(String(movie?.id).concat(user.displayName)) === false) {
                const docRef = await addDoc(collection(db, "Favorites"), {
                    user : user?.displayName,
                    movie: movie
                  });
            }
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    function addToFavorites() {
        setMovieId(oldId => {
            if(user) {
                if(movieId.includes(String(movie.id).concat(user?.displayName)) === false) {
                    return [
                        ...oldId,
                        String(movie.id).concat(user?.displayName)
                 ]
                } else {
                    return [
                        ...oldId
                    ]
                }
            }
        })
        addToFavorite()

        setFavorites(oldFavorites => {
            if(movieId.includes(movie.id+user) === false) {
                return [
                    ...oldFavorites,
                    movie
                ]
            } else {
                return [
                    ...oldFavorites
                ]
            }
        })
    }

    function handleSummary() {
        setShowSummary(true);
    }

    async function remove() {
        setMovieId(moviesId => moviesId.filter(film => film !== String(movie.id).concat(user?.displayName)))
        setFavorites(oldFavorites => oldFavorites.filter(film => film.id !== movie.id))
        const querySnapshot = await getDocs(collection(db, "Favorites"));
     
        querySnapshot.forEach((document) => {
            if(movie.original_title === document.data().movie.original_title && user.displayName === document.data().user) {
                deleteDoc(doc(db, "Favorites",document.id));
            }
        })
        
    }

    async function submitDada(event) {
        event.preventDefault();
        const inputElements = [...event.target.elements];
        const yourRating = inputElements[0].value > 0 && inputElements[0].value < 11 ? inputElements[0].value : undefined
       
        try {
            const docRef = await addDoc(collection(db, "UserRating"), {
              user : user?.displayName,
              rating: yourRating && yourRating,
              movie:movie.original_title
            });
            setVoted(true)
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }

    async function readData() {
        const querySnapshot = await getDocs(collection(db, "UserRating"));
     
        querySnapshot.forEach((doc) => {
            if(movie.original_title === doc.data().movie && user.displayName === doc.data().user) {
                setRating(doc.data().rating)
                setVoted(true)
            }
        })
        
    }


    if(movie && user) readData()
    console.log(movieId)

    return(
        <div className="movie-detail-container">
            <div className="movie-details">
                <img src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`} className="movie-detail-poster"></img>
                <div className="movie-information">
                    <div className="title-vote-cart">
                        <h1 className="movie-title">{movie && movie.original_title}</h1>
                        <div className="vote-cart">
                            <div className="cart">
                                <div className={movieId.includes(String(movie?.id).concat(user?.displayName)) ? "added" : "add"} onClick={addToFavorites}>{movieId.includes(String(movie?.id).concat(user?.displayName)) ? "Added" : "Favorites"}
                                    {movieId.includes(String(movie?.id).concat(user?.displayName)) && <i class="fa fa-solid fa-check mark"></i>}
                                    {movieId.includes(String(movie?.id).concat(user?.displayName)) === false && <i class="fa fa-solid fa-heart heart"></i>}
                                </div>
                                {movieId.includes(String(movie?.id).concat(user?.displayName)) && <div className="remove" onClick={remove}>Remove</div>}
                            </div>
                        </div>
                    </div>
                    <div className="review">
                        {voted ? 
                        <h2 className="movie-rating">Your rating: 
                            <div className="movie-rating-value">{String(rating)}
                                <i class="fa fa-solid fa-star star"></i>
                            </div>
                        </h2> :
                        <form onSubmit={submitDada}>
                            <input className="user-review"></input><span className="max-grade">/ 10 <i class="fa fa-solid fa-star black-star"></i></span>
                            <button className="add-review">Vote</button>
                        </form>
                        }
                    </div>
                    <div className="movie-overview-container">
                        <h2 className="movie-overview">{movie && movie?.overview.split(" ").length > 40 && showSummary === false ? 
                            movie?.overview.split(" ").slice(0, 40).join(" ")
                            : movie?.overview}
                        </h2>
                        <h2 className="extended-review" onClick={handleSummary}>{movie && movie?.overview.split(" ").length > 40 && showSummary === false ? " ...More" : ""}</h2>
                    </div>
                    <div className="flex-info">
                        <h2>Release Date:</h2>
                        <div className="right-side">
                            <h2>{movie && movie.release_date}</h2>
                        </div>
                    </div>
                    <div className="flex-info">
                        <h2>Language:</h2>
                        <div className="right-side">
                            <h2 className="movie-lang">{movie && movie.original_language}</h2>
                        </div>
                    </div>
                    <div className="flex-info">
                        <h2>Average Vote:</h2>
                        <div className="right-side">
                            <h2>{movie && String(Math.floor(movie.vote_average * 100) / 100)}</h2>
                        </div>
                    </div>
                    <div className="flex-info">
                        <h2>Status:</h2>
                        <div className="right-side">
                            <h2>{movie && String(movie.status)}</h2>
                        </div>
                    </div>
                    <div className="flex-info">
                        <h2>Genres:</h2>
                        <div className="right-side">
                            <h2>{movie && genres}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}