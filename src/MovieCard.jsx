import React from "react";

const IMG_PATH = "https://image.tmdb.org/t/p/w400";

const MovieCard = ({ movie, findGenre }) => {
  return (
    <div className="movie">
      <div>
        <p>{movie.release_date.slice(0, 4)}</p>
      </div>

      <div>
        <img
          src={
            movie.poster_path !== null
              ? `${IMG_PATH}${movie.poster_path}`
              : "https://via.placeholder.com/400"
          }
          alt={movie.title}
        />
      </div>

      <div>
        <span>{findGenre(movie.genre_ids[0])}</span>
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
