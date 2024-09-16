import React, { useState } from 'react';
import { tempWatchedData } from "../../data";
import WatchedMovieCard from "../WatchedMovieCard/WatchedMovieCard";
import StarRating from "star-product-rating";
import './WatchedMovies.css'


const WatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);
  const [showWatchedMovies, setShowWatchedMovies] = useState(true);

  const averageMovieRating = watchedMovies.map((item) => item.imdbRating).reduce((acc, item) => acc + item / watchedMovies.length, 0)

  return (
    <div className='watched-movies-container'>
      <button onClick={() => setShowWatchedMovies((prev) => !prev)} className="watched-movies-collapse-button">{showWatchedMovies ? '-' : '+'}</button>
      {showWatchedMovies && (
        <>
          <div className="total-watched-movies-container">
            <h4 className="total-movies-text1">MOVIES YOU WATCHED</h4>
            <div className="total-movies-stats">
              <p className="stat-text">🎬 {watchedMovies.length} movies</p>
              <p className="stat-text">⭐ {averageMovieRating}</p>
              <p className="stat-text">🌟 9.5</p>
              <p className="stat-text">⌛ 132 min</p>
            </div>
          </div>
          {
            watchedMovies.map((item) => (<WatchedMovieCard key={item.imdbID} image={item.Poster} title={item.Title} imbRating={item.imdbRating} userRating={item.userRating} watchTime={item.runtime} />))
          }
        </>
      )}
    </div>
  )
}

export default WatchedMovies