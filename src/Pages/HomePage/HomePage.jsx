import React, { useState, useEffect } from 'react';
import { tempMovieData } from "../../data";
import NavBar from "../../Components/NavBar/NavBar";
import MainContent from "../../Components/MainContent/MainContent";
import MovieList from "../../Components/MovieList/MovieList";
import WatchedMovies from "../../Components/WatchedMovies/WatchedMovies";
import axios from "axios";
import './HomePage.css'

const apiKey = "1a2a2ee7"

const HomePage = () => {
  const [movieList, setMovieList] = useState(tempMovieData);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("")

  const tempQuery = query || "interstellar"

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${tempQuery}`);
        console.log(response.data)
        if (response.data.Response === "False") {
          setLoading(false)
          const message = "⛔ Movie not found";
          setErrorCheck(true);
          setError(message);
        } else if (response.data.Response === "True") {
          setErrorCheck(false);
          const data = response.data.Search;
          setMovieList(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message)
        console.error(error.message)
      } finally {
        setLoading(false);
        setError("")
      }
    };
    fetchMoviesData();
  }, [tempQuery]);

  const handleStoreMovieId = (id) => {
    setSelectedMovieId((prev) => prev !== id ? id : null)
  }




  return (
    <div>
      <NavBar>
        <div className="nav-image-container">
          <span role='img' className="nav-image">🍿</span>
          <h1 className="nav-image-text">Popcorn</h1>
        </div>
        <input type="text" placeholder='Search movies...' value={query} onChange={(event) => setQuery(event.target.value)} className='nav-input' />
        <p className="nav-text">Found {movieList?.length} results</p>
      </NavBar>
      <MainContent>
        <MovieList movieList={movieList} loading={loading} error={error} errorCheck={errorCheck} handleStoreMovieId={handleStoreMovieId} />
        <WatchedMovies />
      </MainContent>
    </div>
  )
}

export default HomePage