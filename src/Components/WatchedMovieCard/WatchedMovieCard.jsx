import React, {useState} from 'react';
import { StarRating } from "star-product-rating";
import './WatchedMovieCard.css';

const WatchedMovieCard = ({image, title, imbRating, userRating, watchTime}) => {
    const [storedRating, setStoredRating] = useState(2);

    return (
        <div className='wm-card-container'>
            <img src={image} alt="movie-img" className="wm-card-image" />
            <div className="wm-card-text-wrapper">
                <h4 className="wm-card-text1">{title}</h4>
                <div className="wm-card-text2-wrapper">
                    <StarRating size={16} starLength={5} disabled defaultRating={storedRating} newRating={setStoredRating} color='yellow'  />
                    <p className="wm-card-text2">🌟 {userRating}</p>
                    <p className="wm-card-text2">⌛ {watchTime} min</p>
                </div>
            </div>
        </div>
    )
}

export default WatchedMovieCard