import { useEffect, useState } from 'react';
import MovieCard from './MovieCard'

const MoviesList = ({ data }) => {
    const [favItems, setFavItems] = useState([]);

    const fetchFavItems = () => {
        const data = localStorage.getItem("favorites");
        return data ? JSON.parse(data) : [];
    };

    useEffect(() => {
        const fav = fetchFavItems()
        console.log("Fetching favourite movie ids on page load: ", fav)
        setFavItems(fav)
    }, [])

    return (
        <div className="flex gap-3.5 flex-wrap p-5 justify-center">
            {data?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} favItems={favItems} setFavItems={setFavItems} />
            ))}
        </div>
    )
}

export default MoviesList