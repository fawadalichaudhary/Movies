import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Heart } from "lucide-react";
import MoviesList from "./MoviesList";
import { buttoncount } from "./context";

const Movie = () => {
  const favItems = () => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  };

  const navLocation = useNavigate()
  const [data, setdata] = useState([])
  const [search, setSearch] = useState("");
  const [count, setcount] = useState(favItems().length)

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

          <span onClick={() => { navLocation("fav") }} className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-md flex items-center gap-2">
            <Heart className="h-6 w-6 fill-white" />
            <span className="font-semibold text-lg">{count}</span>
          </span>
        </div>
      </buttoncount.Provider>
    </>
  );
};

export default Movie;