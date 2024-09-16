import React, { useState } from 'react';
import { tempMovieData } from "../../data";
import MovieCard from "../MovieCard/MovieCard";
import './MovieList.css'

const MovieList = ({ movieList, loading, error, errorCheck }) => {
  const [showMovieList, setShowMovieList] = useState(true)

  return (
    <div className='movie-list'>
      <button onClick={() => setShowMovieList((prev) => !prev)} className="movie-list-collapse-button">{showMovieList ? '-' : '+'}</button>
      {
        loading ? (
          <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "16px", color: "#ffffff" }}>Loading...</p>
          </div>
        ) : (
          errorCheck ? (
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p style={{ fontSize: "16px", color: "#ffffff" }}>{error}</p>
            </div>
          ) : (
            showMovieList && (
              <>
                {
                  movieList?.map((item, index) => (<MovieCard key={index} item={item} image={item.Poster} title={item.Title} releaseYear={item.Year} />))
                }
              </>
            )
          )
        )
      }
    </div>
  )
}

export default MovieList