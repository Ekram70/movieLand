import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import genre from "./lib/genre";
import MovieCard from "./MovieCard";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  const searchMovies = async (title) => {
    if (!title) return null;
    const response = await fetch(`${SEARCH_API}&query=${title}`);
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    !movies ? searchMovies("") : getMovies(API_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findGenre = (id) => {
    for (let i = 0; i < genre.genres.length; i++) {
      if (genre.genres[i].id === id) {
        return genre.genres[i].name;
      }
    }
  };

  console.log(movies);
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} findGenre={findGenre} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found.</h2>
        </div>
      )}
    </div>
  );
}

export default App;
