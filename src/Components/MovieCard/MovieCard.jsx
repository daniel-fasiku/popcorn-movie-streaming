import React from 'react';
import './MovieCard.css'

const MovieCard = ({image, title, releaseYear, item}) => {
  return (
    <div className='movie-card-container'>
        <img src={image} alt="movie-img" className="movie-card-image" />
        <div className="movie-card-text-wrapper">
            <h4 className="movie-card-text1">{title}</h4>
            <div className="movie-card-text2-wrapper">
                <span className="movie-card-text2">🗓️</span>
                <span className="movie-card-text2">{releaseYear}</span>
            </div>
        </div>
    </div>
  )
}

export default MovieCard