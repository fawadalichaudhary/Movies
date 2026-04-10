import { Link } from "react-router";
import FallbackImage from "../assets/fallback_image.webp";
import { Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { buttoncount } from "./context";

const MovieCard = ({ movie }) => {
    const counter = useContext(buttoncount)
    const [isfav, setisfav] = useState(false);

    const favItems = () => {
        const data = localStorage.getItem("favorites");
        return data ? JSON.parse(data) : [];
    };

    const saveItems = (favorites) => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };
    useEffect(() => {
        let fav = favItems();
        setisfav(fav.includes(movie.id));

    }, [movie.id]);

    const handleClick = (e) => {
        e.preventDefault();

        let fav = favItems();

        if (fav.includes(movie.id)) {
            fav = fav.filter((id) => id !== movie.id);
            setisfav(false);
        } else {
            fav.push(movie.id);
            setisfav(true);
        }
        saveItems(fav);
        counter(fav.length)
    };

    return (
        <Link
            to={`movies/${movie.id}`}
            className="relative bg-blue-950 cursor-pointer w-43"
        >
            <img
                src={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : FallbackImage
                }
                alt={movie.title}
                className="w-full aspect-2/3 object-cover"
            />
            <div className="p-4 flex justify-between items-start gap-2">
                <h3 className="text-white font-bold text-sm leading-tight">
                    {movie.title}
                </h3>
            </div>
            <span
                className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${movie.vote_average >= 7 ? "bg-blue-600 text-white" : "bg-red-500 text-white"}`}
            >
                {movie.vote_average}
            </span>
            <span className="absolute top-1 left-2 text-white ">
                <Heart
                    className={`cursor-pointer ${isfav ? "fill-red-600 text-red-600" : "text-white fill-black"
                        }`}
                    onClick={handleClick}
                ></Heart>
            </span>
        </Link>
    );
};
export default MovieCard;
