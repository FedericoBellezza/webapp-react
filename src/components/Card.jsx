import { Link } from "react-router-dom";

export default function Card({ title, subtitle, image, link }) {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
        <Link to={link} className="btn btn-primary">
          View details
        </Link>
      </div>
    </div>
  );
}
