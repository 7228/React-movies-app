import "./MovieCard.css"

export default function MovieCard(props) {
    return(
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/original/${props.poster}`} className="movie-poster"></img>
            <div className="movie-info">
                <h3>{props.title}</h3>
                <div className="vote">
                    <h3>{String(Math.round(props.vote *10) / 10)}</h3>
                </div>
            </div>
        </div>
    )
}