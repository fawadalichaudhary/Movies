import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=248bef0b9b0a772b3d5bc1933b433de1`;

    useEffect(() => {
        axios.get(URL).then((response) => {
            setMovie(response.data);
            console.log(response.data)
        }).catch((error) => {
            console.log(`Error fetching: ${error}`)
        })
    }, []);

    if (!movie) {
        return <div className=" p-5 bg-blue-900 h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="bg-blue-900 min-h-screen text-white p-5 flex flex-col md:flex-row gap-6">

            {/* Poster */}
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 rounded"
            />

            {/* Details */}
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>

                <p className="mb-3 text-gray-300">{movie.overview}</p>

                <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
                <p><strong>📅 Release Date:</strong> {movie.release_date}</p>
                <p><strong>🔥 Popularity:</strong> {movie.popularity}</p>

                <p className="mt-3">
                    <strong>Genres:</strong>{" "}
                    {movie.genres.map((g) => g.name).join(", ")}
                </p>
            </div>
        </div>
    );
}

export default MovieDetail;