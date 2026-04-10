import React from 'react'
import MovieCard from './MovieCard'

const MoviesList = ({ data }) => {
    return (
        <div className="flex gap-3.5 flex-wrap p-5 justify-center">
            {data.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MoviesList