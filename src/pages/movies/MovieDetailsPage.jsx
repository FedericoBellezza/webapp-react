import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import Form from "../../components/Form";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewVote, setReviewVote] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const movieId = useParams().id;

  reviewVote > 5 && setReviewVote(5);
  reviewVote < 0 && setReviewVote(0);
  // on form changing
  function formChange(params) {
    params.target.className.includes("fa-star") &&
      setReviewVote(params.target.id);

    params.target.id == "inputName" && setReviewName(params.target.value);
    params.target.id == "inputComment" && setReviewComment(params.target.value);
  }

  // on form submit
  function formSubmit(params) {
    const url = `http://localhost:3000/movies/${movieId}/reviews`;
    event.preventDefault();
    const form = {
      name: reviewName,
      vote: reviewVote,
      text: reviewComment,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then((res) => res.json);

    setReviewName("");
    setReviewVote("");
    setReviewComment("");
  }

  // on review delete
  function deleteReview(params) {
    const url = `http://localhost:3000/movies/${movieId}/reviews`;
    const reviewId = {
      reviewId: params.target.id,
    };
    console.log(reviewId);

    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewId),
    })
      .then((res) => res.json)
      .then((data) => {
        // aggiorna le reviews
      });
  }

  useEffect(() => {
    const url = `http://localhost:3000/movies/${movieId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.movie[0]);
        setReviews(data.reviews);
      });
  }, [reviews]);

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
                  <div className="row">
                    <div className="d-flex align-items-center col gap-3">
                      <div className="avatar">{review.name[0]}</div>
                      <div className="fs-5">{review.name}</div>
                      <div>{stars}</div>
                    </div>
                    <button
                      id={review.id}
                      onClick={deleteReview}
                      className="btn btn-danger delete-review col-1"
                    >
                      X
                    </button>
                    <div>{review.text}</div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <hr className="mt-5" />

          {/* review form */}
          <h1>Leave a review</h1>
          <Form />
          <form
            className="form-floating"
            onChange={formChange}
            onSubmit={formSubmit}
          >
            <div className="row d-flex align-items-center align-middle ">
              {/* review name form section */}
              <div className="col mb-4">
                <input
                  required
                  onChange={formChange}
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Name"
                  value={reviewName}
                />
              </div>

              {/* review star form section */}
              <div className="col mb-4">
                <i
                  onClick={formChange}
                  id="1"
                  className={`fa-${
                    (reviewVote >= 1 && "solid") || "regular"
                  } fa-star`}
                ></i>

                <i
                  onClick={formChange}
                  id="2"
                  className={`fa-${
                    (reviewVote >= 2 && "solid") || "regular"
                  } fa-star`}
                ></i>

                <i
                  onClick={formChange}
                  id="3"
                  className={`fa-${
                    (reviewVote >= 3 && "solid") || "regular"
                  } fa-star`}
                ></i>

                <i
                  onClick={formChange}
                  id="4"
                  className={`fa-${
                    (reviewVote >= 4 && "solid") || "regular"
                  } fa-star`}
                ></i>

                <i
                  onClick={formChange}
                  id="5"
                  className={`fa-${
                    (reviewVote >= 5 && "solid") || "regular"
                  } fa-star`}
                ></i>
              </div>
            </div>
            <div className="col mb-4">
              <input
                required
                type="text"
                className="form-control"
                id="inputComment"
                placeholder="Comment"
                value={reviewComment}
                onChange={formChange}
              />
            </div>
            <button className="btn btn-primary w-100 mb-5">Post review</button>
          </form>
        </div>
      </div>
    )
  );
}
