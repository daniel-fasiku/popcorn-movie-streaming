import React, { useState, useEffect } from 'react';
import { tempWatchedData } from "../../data";
import WatchedMovieCard from "../WatchedMovieCard/WatchedMovieCard";
import StarRating from "star-product-rating";
import Axios from "axios";
import './WatchedMovies.css'


const WatchedMovies = ({ selectedMovieId, apiKey, watchedMoviesList, movieList, setWatchedMoviesList, setSelectedMovieId }) => {
  const [watchedMovies, setWatchedMovies] = useState({});
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWatchedMovies, setShowWatchedMovies] = useState(true);
  const [storedRating, setStoredRating] = useState(0);


  useEffect(() => {
    setMovies(watchedMoviesList)
  }, [watchedMoviesList]);

  useEffect(() => {
    setLoading(true);
    setStoredRating(0);
    setWatchedMovies({});
    const fetchMovieDetails = async () => {
      try {
        const response = await Axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovieId}`)
        console.log(response)
        if (response.data.Response === "True") {
          setWatchedMovies(response.data);
        } else {
          setErrorMessage(`Error fetching movie details, ${response.data.Error}`)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails();
  }, [selectedMovieId]);

  const findSelectedMovieDetails = movieList.find((item) => item.imdbID === selectedMovieId);

  useEffect(() => {
    if (selectedMovieId) {
      document.title = `Movie | ${findSelectedMovieDetails?.Title}`;
    } else {
      document.title = "Popcorn Movies"
    }

    return () => {
      document.title = "Popcorn Movies"
    }
  }, [selectedMovieId])


  const addMovieToList = () => {
    const data = {
      imdbID: watchedMovies.imdbID,
      Poster: watchedMovies.Poster,
      Title: watchedMovies.Title,
      Year: watchedMovies.Released,
      runtime: watchedMovies.Runtime,
      imdbRating: watchedMovies.imdbRating,
      userRating: storedRating,
    }
    setWatchedMoviesList((prev) => [...prev, data]);
    setSelectedMovieId(null);
    setWatchedMovies({});
  }

  const handleBackButton = () => {
    setSelectedMovieId(null);
    setWatchedMovies({});
  }

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      event.code === "Escape" && setSelectedMovieId(null)
    })

    return () => {
      document.removeEventListener("keydown", (event) => {
        event.code === "Escape" && setSelectedMovieId(null)
      })
    }
  }, [setSelectedMovieId])


  const averageMovieRating = movies?.map((item) => item.userRating).reduce((acc, item) => acc + item / movies.length, 0);
  const averageImdbRating = movies?.map((item) => item.imdbRating).reduce((acc, item) => acc + item / movies.length, 0);
  const displaySelectedMovie = Object.keys(watchedMovies).length > 2
  console.log(averageMovieRating)

  return (
    <div className='watched-movies-container'>
      <button onClick={() => setShowWatchedMovies((prev) => !prev)} className="watched-movies-collapse-button">{showWatchedMovies ? '-' : '+'}</button>
      <button onClick={handleBackButton} className="back-button">-</button>
      {
        showWatchedMovies && (
          loading ? (
            <div className="loading-container">
              <p className="loading-text">Loading...</p>
            </div>
          ) : (
            selectedMovieId ? (
              displaySelectedMovie ? (
                <WatchedMovieCard key={watchedMovies?.imdbID} storedRating={storedRating} setStoredRating={setStoredRating} addMovieToList={addMovieToList} image={watchedMovies?.Poster} title={watchedMovies?.Title} releaseDate={watchedMovies?.Released} runTime={watchedMovies?.Runtime} filmType={watchedMovies?.Genre} imdbRating={watchedMovies?.imdbRating} moviePlot={watchedMovies?.Plot} actors={watchedMovies?.Actors} director={watchedMovies?.Director} />
              ) : (
                <>
                  <div className='error-message-container'>
                    <p className='error-message-text'>{errorMessage}</p>
                  </div>
                </>
              )
            ) : (
              <div className="total-watched-movies-container">
                <div className="total-watched-movies-stats-wrapper">
                  <h4 className="total-movies-text1">MOVIES YOU WATCHED</h4>
                  <div className="total-movies-stats">
                    <p className="stat-text">🎬 {movies.length} movies</p>
                    <p className="stat-text">⭐ {averageMovieRating.toFixed(1)}</p>
                    <p className="stat-text">🌟 {averageImdbRating.toFixed(1)}</p>
                    <p className="stat-text">⌛ 132 min</p>
                  </div>
                </div>
                <div className="watched-movies-list-wrapper">
                  {
                    movies.map(({ imdbID, Poster, Title, userRating, runtime }) => (
                      <div key={imdbID} className="watched-movie-wrapper">
                        <img src={Poster} alt="poster" className="watched-movie-poster" />
                        <div className="watched-movie-text-wrapper">
                          <h4 className="watched-movie-text1">{Title}</h4>
                          <div className="watched-movie-text2-wrapper">
                            <p className="watched-movie-text2">⭐ {userRating}</p>
                            <p className="watched-movie-text2">⌛ {runtime}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )

          )
        )
      }
    </div>
  )
}

export default WatchedMovies