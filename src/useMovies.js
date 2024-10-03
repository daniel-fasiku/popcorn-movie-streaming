import { useState, useEffect } from 'react';
import { tempMovieData } from './data';
import axios from 'axios'

export const useMovies = (tempQuery) => {
    const [movieList, setMovieList] = useState(tempMovieData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [errorCheck, setErrorCheck] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState("");

    const apiKey = "1a2a2ee7";


    useEffect(() => {
        setSelectedMovieId(null);
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchMoviesData = async () => {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${tempQuery.current}`, { signal });
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
                setError(error.message);
                console.error(error.message);
            } finally {
                setLoading(false);
                setError("")
            }
        };
        fetchMoviesData();

        return () => {
            controller.abort();
        }
    }, [tempQuery, apiKey]);

    return { movieList, loading, error, errorCheck, selectedMovieId, apiKey, setSelectedMovieId }
}