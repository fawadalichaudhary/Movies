import FallbackImage from "../assets/fallback_image.webp"

const MovieCard = ({ movie }) => {
    return (
        <div className="relative bg-blue-950 cursor-pointer w-43">
            <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : FallbackImage}
                alt={movie.title}
                className="w-full aspect-2/3 object-cover"
            />
            <div className="p-4 flex justify-between items-start gap-2">
                <h3 className="text-white font-bold text-sm leading-tight">{movie.title}</h3>
            </div>
            <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${movie.vote_average >= 7 ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'}`}>
                {movie.vote_average}
            </span>
        </div>
    );
};
export default MovieCard