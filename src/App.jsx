import { Routes, Route } from "react-router";
import Movie from "./component/Movie";
import MovieDetail from "./component/MovieDetail";
import FavCard from "./component/FavCard";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Movie />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="fav" element={<FavCard />} />
      <Route path="*" element={
        <div className="h-screen bg-blue-900 text-white flex justify-center items-center">
          404 Page Not Found
        </div>
      } />
    </Routes>
  );
}

export default App;

// /movies/:id
