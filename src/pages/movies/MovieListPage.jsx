import { useState, useEffect } from "react";
import { data } from "react-router-dom";

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/movies";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container pt-5">
      <h1>Movie list page</h1>
      <ul className="mt-3">
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
