import { useMemo, useState } from "react";

const INITIAL_SESSIONS = [
  {
    id: "l1",
    tutor: "Aysel M.",
    subject: "Algebra",
    time: "Monday 16:00-17:00",
    status: "Booked",
    note: "Review quadratic equations."
  },
  {
    id: "l2",
    tutor: "Kamran R.",
    subject: "Physics",
    time: "Wednesday 10:00-11:00",
    status: "Waiting",
    note: "Kinematics practice."
  }
];

const LearnerDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [sessions] = useState(INITIAL_SESSIONS);

  const filtered = useMemo(() => {
    if (filter === "all") return sessions;
    return sessions.filter(
      (item) => item.status.toLowerCase() === filter.toLowerCase()
    );
  }, [filter, sessions]);

  const statusClass = (status) => {
    switch (status) {
      case "Booked":
        return "badge badge--green";
      case "Waiting":
        return "badge badge--yellow";
      default:
        return "badge";
    }
  };

  return (
    <div className="dashboard dashboard--single">
      <section className="dashboard-content">
        <div className="card">
          <div className="requests-header">
            <div>
              <h3>My Sessions</h3>
              <p className="hint">
                View booked sessions or requests waiting for tutor confirmation.
              </p>
            </div>
            <div className="filter-tabs" role="tablist">
              {["all", "booked", "waiting"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`tab ${filter === opt ? "is-active" : ""}`}
                  onClick={() => setFilter(opt)}
                  role="tab"
                  aria-selected={filter === opt}
                >
                  {opt === "all"
                    ? "All"
                    : opt === "booked"
                    ? "Booked"
                    : "Waiting"}
                </button>
              ))}
            </div>
          </div>

          <div className="requests-list">
            {filtered.map((session) => (
              <article key={session.id} className="request-card">
                <div>
                  <div className="request-card__header">
                    <h4>{session.tutor}</h4>
                    <span className={statusClass(session.status)}>
                      {session.status}
                    </span>
                  </div>
                  <p className="hint">{session.subject}</p>
                  <p className="hint">{session.time}</p>
                  <p className="request-note">{session.note}</p>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="hint">No sessions in this view.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnerDashboard;
