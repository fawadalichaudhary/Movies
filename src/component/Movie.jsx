import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

const Movie = () => {
  const [data, setdata] = useState([])
  const [search, setSearch] = useState("");

  const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=248bef0b9b0a772b3d5bc1933b433de1"
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=248bef0b9b0a772b3d5bc1933b433de1&query=${search}`


  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(discoverURL)
        setdata(res.data.results)
        console.log(res.data.results);

      } catch (error) {
        console.log(error);
      }
    }
    getdata()
  }, [])

  const searchfunct = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.get(searchURL)
      setdata(res.data.results)

    } catch (error) {
      console.log(error);

    }

  }


  return (
    <>
      <div className="bg-blue-900 min-h-screen">
        <div className="flex justify-between bg-blue-950 p-1.5">
          <h1 className="text-white">Movie Search</h1>
          <form onSubmit={searchfunct}>
            <input type="text" placeholder="Search movie..." className="w-full max-w-80 text-white" value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </form>
        </div>
        <div className="flex gap-3.5 flex-wrap p-5 justify-center">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Movie;