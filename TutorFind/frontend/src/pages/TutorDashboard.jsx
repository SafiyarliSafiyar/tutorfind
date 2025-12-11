import { useState } from "react";

const INITIAL_REQUESTS = [
  {
    id: "r1",
    learner: "Leyla R.",
    subject: "Algebra",
    time: "Monday 16:00-17:00",
    note: "Need help with quadratic equations.",
    status: "Pending",
    phone: "+994 50 111 22 33"
  },
  {
    id: "r2",
    learner: "Farid A.",
    subject: "Physics",
    time: "Wednesday 11:00-12:00",
    note: "Focus on kinematics and forces.",
    status: "Accepted",
    phone: "+994 55 222 33 44"
  },
  {
    id: "r3",
    learner: "Nigar S.",
    subject: "SAT Math",
    time: "Friday 15:00-16:00",
    note: "Looking for practice tests review.",
    status: "Pending",
    phone: "+994 70 333 44 55"
  },
  {
    id: "r4",
    learner: "Kamran R.",
    subject: "Calculus",
    time: "Tuesday 14:00-15:00",
    note: "Derivatives and integrals refresher.",
    status: "Accepted",
    phone: "+994 77 444 55 66"
  }
];

const AVAILABILITY_SLOTS = [
  "Monday 10:00-12:00",
  "Wednesday 14:00-15:30",
  "Friday 15:00-16:00",
  "Tuesday 14:00-15:00"
];

const TutorDashboard = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [acceptedSlotFilter, setAcceptedSlotFilter] = useState("all");

  const handleStatusChange = (id, status) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const statusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "badge badge--green";
      case "Declined":
        return "badge badge--red";
      default:
        return "badge badge--yellow";
    }
  };

  const [filter, setFilter] = useState("all");

  const filtered = requests.filter((req) => {
    if (filter === "all") return true;
    if (filter === "accepted") {
      if (acceptedSlotFilter !== "all") {
        const matchesSlot = req.time.includes(acceptedSlotFilter);
        if (!matchesSlot) return false;
      }
      return req.status.toLowerCase() === "accepted";
    }
    return req.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="dashboard dashboard--single">
      <section className="dashboard-content">
        <div className="card">
          <div className="requests-header">
            <div>
              <h3>Booking Requests</h3>
              <p className="hint">
                Choose a view: all, pending, or accepted.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="filter-tabs" role="tablist">
                {["all", "pending", "accepted"].map((opt) => (
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
                      : opt === "pending"
                      ? "Pending"
                      : "Accepted"}
                  </button>
                ))}
              </div>
              {filter === "accepted" && (
                <label className="field field--inline">
                  <span>Filter by slot</span>
                  <select
                    value={acceptedSlotFilter}
                    onChange={(e) => setAcceptedSlotFilter(e.target.value)}
                  >
                    <option value="all">All slots</option>
                    {AVAILABILITY_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          </div>

          <div className="requests-list">
            {filtered.map((req) => (
              <article key={req.id} className="request-card">
                <div>
                  <div className="request-card__header">
                    <h4>{req.learner}</h4>
                    <span className={statusClass(req.status)}>{req.status}</span>
                  </div>
                <p className="hint">{req.subject}</p>
                <p className="hint">{req.time}</p>
                <p className="hint">Phone: {req.phone}</p>
                <p className="request-note">{req.note}</p>
              </div>
                {req.status === "Pending" && (
                  <div className="request-actions">
                    <button
                      className="btn btn--ghost"
                      onClick={() => handleStatusChange(req.id, "Declined")}
                    >
                      Decline
                    </button>
                    <button
                      className="btn btn--primary"
                      onClick={() => handleStatusChange(req.id, "Accepted")}
                    >
                      Accept
                    </button>
                  </div>
                )}
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="hint">No requests in this view.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorDashboard;
