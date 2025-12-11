import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const highlights = [
    {
      title: "Local-first search",
      copy: "Filter tutors by city or district to stay close to home or campus."
    },
    {
      title: "Subjects that fit",
      copy: "From STEM to language prep, browse tutors by expertise and style."
    },
    {
      title: "Clear pricing & time",
      copy: "Set your budget, pick time slots, and see availability instantly."
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <span className="pill pill--glow">City & District-Based Matching</span>
          <h1>Find the right tutor near you, fast.</h1>
          <p className="lede">
            Search by city, district, subject, price, and availability. Built
            for learners, tutors, and admins to connect effortlessly.
          </p>

          <div className="badge-row">
            <span className="chip chip--ghost">City / District</span>
            <span className="chip chip--ghost">Subject</span>
            <span className="chip chip--ghost">Price</span>
            <span className="chip chip--ghost">Availability</span>
          </div>

          <div className={`hero__actions ${user ? "hero__actions--single" : ""}`}>
            <Link
              className={`btn btn--primary ${user ? "btn--wide" : ""}`}
              to="/search"
            >
              Search tutors
            </Link>
            {!user && (
              <Link className="btn btn--ghost" to="/signup">
                Tutor or learner? Sign up
              </Link>
            )}
          </div>

          <div className="stat-row">
            <div className="stat">
              <strong>3m</strong>
              <span>Avg response time</span>
            </div>
            <div className="stat">
              <strong>1,200+</strong>
              <span>Active tutors</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>District coverage</span>
            </div>
          </div>
        </div>

        <div className="hero__panel">
          <div className="panel-header">
            <span className="pill">Search preview</span>
            <p className="hint">
              Jump into filters and find tutors near you in seconds.
            </p>
          </div>
          <div className="panel-form">
            <div className="field field--stack">
              <span>City</span>
              <div className="input-chip">e.g., New York</div>
            </div>
            <div className="field field--stack">
              <span>District</span>
              <div className="input-chip">e.g., Brooklyn</div>
            </div>
            <div className="panel-tags">
              <span className="chip">Math</span>
              <span className="chip">English</span>
              <span className="chip">Physics</span>
              <span className="chip">Evenings</span>
            </div>
            <Link className="btn btn--primary btn--full" to="/search">
              Open search
            </Link>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="highlights__header">
          <p className="eyebrow">Why TutorFind</p>
          <h2>Local-first tutor discovery with less friction</h2>
          <p className="hint">
            Pair learners and tutors quickly by location, price, and time that
            actually works.
          </p>
        </div>
        <div className="highlights__grid">
          {highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
