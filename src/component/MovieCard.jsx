const MovieCard = ({ movie }) => {
    return (
        <div className="bg-blue-950 cursor-pointer w-43">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-fill"
            />
            <div className="p-4 flex justify-between items-start gap-2">
                <h3 className="text-white font-bold text-sm leading-tight">{movie.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${movie.vote_average >= 7 ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'}`}>
                    {movie.vote_average}
                </span>
            </div>
        </div>
    );
};
export default MovieCard