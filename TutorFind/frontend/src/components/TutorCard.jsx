import { Link } from "react-router-dom";

const TutorCard = ({ tutor }) => {
  return (
    <article className="tutor-card">
      <div className="tutor-card__header">
        <div>
          <h3>{tutor.name}</h3>
          <p className="hint">
            {tutor.city}, {tutor.district}
          </p>
          <p className="tutor-card__subjects">{tutor.subjects.join(", ")}</p>
        </div>
      </div>
      <div className="tutor-card__meta">
        <span className="rating">
          ★ {tutor.rating.toFixed(1)} <span className="hint">({tutor.reviews} reviews)</span>
        </span>
        <span className="price">{tutor.price} AZN/hr</span>
      </div>
      <Link className="btn btn--ghost btn--full" to={`/tutor/${tutor.id}`}>
        View Profile
      </Link>
    </article>
  );
};

export default TutorCard;
