import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

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

      <hr />
      <div className="mt-3 row g-3">
        {movies.map((movie) => (
          <div key={movie.id} className="col-3">
            <Card
              title={movie.title}
              subtitle={movie.director}
              image={`http://localhost:3000/movies_cover/${movie.image}`}
              link={`/movies/${movie.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
