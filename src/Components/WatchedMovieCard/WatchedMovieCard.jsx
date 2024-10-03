import React, { useRef, useEffect } from 'react';
import { StarRating } from "star-product-rating";
import './WatchedMovieCard.css';

const WatchedMovieCard = ({ id, image, title, releaseDate, runTime, filmType, imdbRating, moviePlot, actors, director, addMovieToList, storedRating, setStoredRating, setRateAttempts}) => {
    const countRating = useRef(0);

    useEffect(() => {
        if (storedRating) {
            countRating.current = countRating.current++ ;
        }
        console.log(countRating.current)
        setRateAttempts.current = countRating.current;
    }, [storedRating]);


    return (
        <div className='wm-card-container' key={id}>
            <div className="wm-card-top">
                <img src={image} alt="wm-image" className="wm-card-top-image" />
                <div className="wm-card-top-text-wrapper">
                    <h3 className="wm-card-top-text1">{title}</h3>
                    <p className="wm-card-top-text2">{releaseDate} . {runTime}</p>
                    <p className="wm-card-top-text2">{filmType}</p>
                    <p className="wm-card-top-text2">⭐ {imdbRating} IMDb Rating</p>
                </div>
            </div>
            <div className="wm-card-rating">
                <StarRating defaultRating={storedRating} color='gold' starLength={10} starTextStyle={{display: 'none'}} newRating={setStoredRating} />
                <button onClick={() => addMovieToList()} className='wm-card-rating-button'>+ Add to list</button>
            </div>
            <div className="wm-card-bottom">
                <p className="wm-card-bottom-text1">{moviePlot}</p>
                <p className="wm-card-bottom-text2">{actors}</p>
                <p className="wm-card-bottom-text2">Directed by {director}</p>
            </div>
        </div>
    )
}

export default WatchedMovieCard