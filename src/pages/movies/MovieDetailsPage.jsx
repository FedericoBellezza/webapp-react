import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const movieId = useParams().id;

  useEffect(() => {
    const url = `http://localhost:3000/movies/${movieId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.movie[0]);
        setReviews(data.reviews);
      });
  }, []);

  return (
    movie && (
      <div className="container pt-5 mt-5">
        <div className="row">
          <div className="col-4">
            <img
              src={`http://localhost:3000/movies_cover/${movie.image}`}
              alt={movie.title}
              className="w-100"
            />
          </div>
          <div className="col-8">
            <h2>{movie.title}</h2>
            <h4>
              <i>"{movie.director}"</i>
            </h4>
            <p>{movie.release_year}</p>
            <p>{movie.abstract}</p>
            <hr />
            <h3>Reviews</h3>
            {reviews?.map((review) => {
              const stars = [];
              for (let i = 1; i <= 5; i++) {
                (i <= review.vote &&
                  stars.push(<i key={i} className="fa-solid fa-star"></i>)) ||
                  stars.push(<i key={i} className="fa-regular fa-star"></i>);
              }

              return (
                <div key={review.id}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar">{review.name[0]}</div>
                    <div className="fs-5">{review.name}</div>
                    <div>{stars}</div>
                  </div>
                  <div>{review.text}</div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
