import React, { useState, useEffect, useRef } from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import MainContent from "../../Components/MainContent/MainContent";
import MovieList from "../../Components/MovieList/MovieList";
import WatchedMovies from "../../Components/WatchedMovies/WatchedMovies";
import { useMovies } from '../../useMovies';
import './HomePage.css'



const HomePage = () => {
  const [query, setQuery] = useState("");
  const [watchedMoviesList, setWatchedMoviesList] = useState(() => {
    const data = localStorage.getItem("watchedMovies");
    return JSON.parse(data) || [];
  });

  const tempQuery = useRef(query || "interstellar");
  const { movieList, loading, error, errorCheck, apiKey, selectedMovieId, setSelectedMovieId } = useMovies(tempQuery);


  

  const inputElement = useRef(null);

  useEffect(() => {
    const clearSearchBar = (event) => {
      if (document.activeElement === inputElement.current) {
        return;
      }

      if (event.key === "Enter") {
        inputElement.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", clearSearchBar);
    return () => {
      document.removeEventListener("keydown", clearSearchBar);
    }
  }, [])


  const handleStoreMovieId = (id) => {
    setSelectedMovieId((prev) => prev !== id ? id : null)
  };










  return (
    <div>
      <NavBar>
        <div className="nav-image-container">
          <span role='img' className="nav-image">🍿</span>
          <h1 className="nav-image-text">Popcorn</h1>
        </div>
        <input type="text" placeholder='Search movies...' value={query} onChange={(event) => setQuery(event.target.value)} ref={inputElement} className='nav-input' />
        <p className="nav-text">Found {movieList?.length} results</p>
      </NavBar>
      <MainContent>
        <MovieList movieList={movieList} loading={loading} error={error} errorCheck={errorCheck} handleStoreMovieId={handleStoreMovieId} />
        <WatchedMovies selectedMovieId={selectedMovieId} setSelectedMovieId={setSelectedMovieId} apiKey={apiKey} movieList={movieList} watchedMoviesList={watchedMoviesList} setWatchedMoviesList={setWatchedMoviesList} />
      </MainContent>
    </div>
  )
}

export default HomePage