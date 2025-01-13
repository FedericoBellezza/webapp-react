import { useState, useEffect } from "react";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const url = "http://localhost:3000/movies/3";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.movie[0]);
      });
  }, []);

  movie && console.log(movie);
  return (
    <div className="container pt-5">
      <h1>Movie details</h1>
      <ul>
        {movie && <li>Title: {movie.title}</li>}
        {movie && <li>Director: {movie.director}</li>}
        {movie && <li>Genre: {movie.genre}</li>}
        {movie && <li>Year: {movie.year}</li>}
        {movie && <li>Abstract: {movie.abstract}</li>}
      </ul>
    </div>
  );
}
