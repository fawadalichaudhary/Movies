import { Link } from "react-router";
import FallbackImage from "../assets/fallback_image.webp";
import { Heart } from "lucide-react";
import { buttoncount } from "./context";
import { useContext, useEffect, useState } from "react";


const MovieCard = ({ movie, favItems, setFavItems }) => {

    const counter = useContext(buttoncount)
    const [isfav, setisfav] = useState(false);

    const saveItems = (favorites) => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    useEffect(() => {
        if (favItems) {
            setisfav(favItems.includes(movie.id));
        }
    }, [movie.id, favItems]);

    const handleClick = () => {
        let updateFav;
        if (favItems.includes(movie.id)) {
            console.log("before filter", favItems);

            updateFav = favItems.filter((id) => id !== movie.id);
            console.log("after filter", favItems);

            setisfav(false);
            console.log("removing", favItems);

        } else {
            updateFav = [...(favItems || []), movie.id]; // ✅ no mutation
            setisfav(true);
            console.log("adding", favItems);

        }
        setFavItems(updateFav)
        saveItems(updateFav);
        counter(updateFav.length)
    };

    return (
        <span className="relative bg-blue-950 cursor-pointer w-43">
            <Link
                to={`movies/${movie.id}`}
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
            </Link>
            <Heart
                className={`cursor-pointer absolute top-1 left-2 ${isfav ? "fill-red-600 text-red-600" : "text-white fill-black"
                    }`}
                onClick={handleClick}
            />
        </span>
    );
};
export default MovieCard;
