import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const movieId = useParams().id;

  useEffect(() => {
    console.log(movieId);

    const url = `http://localhost:3000/movies/${movieId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.movie[0]);
        setReviews(data.reviews);
      });
  }, []);

  return (
    <div className="container pt-5">
      <h1>Movie details</h1>
      <ul>
        {movie && <li>Title: {movie.title}</li>}
        {movie && <li>Director: {movie.director}</li>}
        {movie && <li>Genre: {movie.genre}</li>}
        {movie && <li>Year: {movie.release_year}</li>}
        {movie && <li>Abstract: {movie.abstract}</li>}
      </ul>

      <h3>Reviews</h3>
      {reviews?.map((review) => {
        return (
          <ul key={review.id}>
            <li>User: {review.name}</li>
            <li>Vote: {review.vote}</li>
            <li>Review: {review.text}</li>
          </ul>
        );
      })}
    </div>
  );
}
