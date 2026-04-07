import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

const Movie = () => {
  const [data, setdata] = useState([])
  const [search, setSearch] = useState("");

  const movies = "https://api.themoviedb.org/3/discover/movie?api_key=248bef0b9b0a772b3d5bc1933b433de1"

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(movies)
        setdata(res.data.results)

      } catch (error) {
        console.log(error);

      }

    }
    getdata()
  }, [])

  const filltered = data.filter((fillter) => fillter.title.toLowerCase().includes(search.toLowerCase()))


  return (
    <>
      <div className="bg-blue-900 min-h-screen">
        <div className="flex justify-between bg-blue-950 p-1.5">
          <h1 className="text-white">Movie Search</h1>

          <input type="text" placeholder="Search movie..." className="w-full max-w-80" value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-3.5 flex-wrap p-5 items-center justify-center">
          {filltered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Movie;