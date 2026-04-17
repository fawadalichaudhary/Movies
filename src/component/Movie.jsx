import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Heart } from "lucide-react";
import MoviesList from "./MoviesList";
import { buttoncount } from "./context";
import { useQuery } from "@tanstack/react-query";

const Movie = () => {
  const favItems = () => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  };

  const navLocation = useNavigate()
  const [search, setSearch] = useState("");
  const [count, setcount] = useState(favItems().length)

  const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=248bef0b9b0a772b3d5bc1933b433de1"
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=248bef0b9b0a772b3d5bc1933b433de1&query=${search}`


  const getdata = () => {
    return axios.get(discoverURL).then((res) => {
      console.log("before", res.data.results)
      return res.data.results
    })
  }

  const { data } = useQuery({
    queryKey: ['movies'],
    queryFn: getdata,
    staleTime: Infinity,
  })


  const searchfunct = async (e) => {
    e.preventDefault()
    const res = await axios.get(searchURL)
    return res.data.results
  }

  return (
    <>
      <buttoncount.Provider value={setcount}>
        <div className="bg-blue-900 h-full">
          <div className="flex justify-between bg-blue-950 p-1.5">
            <h1 className="text-white">Movie Search</h1>
            <form onSubmit={searchfunct}>
              <input type="text" placeholder="Search movie..." className="w-full max-w-80 text-white" value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
          <MoviesList data={data} />

          <span onClick={() => { navLocation("fav") }} className="fixed cursor-pointer bottom-4 right-4 bg-red-500 text-white p-3 rounded-md flex items-center gap-2">
            <Heart className="h-6 w-6 fill-white" />
            <span className="font-semibold text-lg">{count}</span>
          </span>
        </div>
      </buttoncount.Provider>
    </>
  );
};

export default Movie;