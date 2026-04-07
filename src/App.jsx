import { BrowserRouter, Routes, Route } from "react-router";
import Movie from "./component/Movie";
import MovieDetail from "./component/MovieDetail";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Movie />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;

// /movies/:id
