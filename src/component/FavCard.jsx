import React, { useEffect, useState } from "react";
import FallbackImage from "../assets/fallback_image.webp";
import axios from "axios";
import MovieCard from "./MovieCard";

function FavCard() {
    const [movies, setMovies] = useState([]);
    const data = localStorage.getItem("favorites");
    const ids = data ? JSON.parse(data) : [];
    useEffect(() => {
        Promise.all(
            ids.map((id) =>
                axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=248bef0b9b0a772b3d5bc1933b433de1`,
                ),
            ),
        )
            .then((responses) => {
                const moviesData = responses.map((res) => res.data);
                setMovies(moviesData);
            })
            .catch((error) => {
                console.error("Failed to fetch movies:", error);
            });
    }, []);


    if (movies.length === 0)
        return (
            <p className="text-white bg-blue-900 h-screen flex items-center justify-center">
                No favorite movies found.
            </p>
        );

    return (
        <div className="bg-blue-900 min-h-screen">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default FavCard;
