import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MOCK_TUTOR_PROFILE = {
  id: "1",
  name: "Aysel Mammadova",
  title: "Experienced Math Tutor",
  bio: "I have 7+ years of experience helping learners excel in algebra, calculus, and exam prep. I focus on clear explanations, plenty of practice, and building confidence.",
  city: "Baku",
  districts: ["Yasamal", "Nasimi"],
  price: 20,
  rating: 4.9,
  reviewsCount: 15,
  subjects: ["Algebra", "Calculus", "SAT Math", "Physics"],
  photo: "https://i.pravatar.cc/200?img=47",
  qualifications: [
    "B.Sc. in Mathematics, Baku State University",
    "Certified SAT/ACT Math Coach",
    "5+ years at a private learning center"
  ],
  availability: [
    { day: "Monday", slots: ["16:00-17:00", "17:00-18:00"] },
    { day: "Wednesday", slots: ["10:00-11:00", "11:00-12:00"] },
    { day: "Friday", slots: ["15:00-16:00", "16:00-17:00"] }
  ],
  reviews: [
    {
      user: "Leyla R.",
      rating: 5,
      comment: "Explains tough concepts simply. My grades improved within weeks."
    },
    {
      user: "Farid A.",
      rating: 4.8,
      comment: "Very patient and structured. Great for exam preparation."
    },
    {
      user: "Nigar S.",
      rating: 4.9,
      comment: "Flexible with scheduling and provides helpful practice sets."
    }
  ]
};

const TutorProfile = () => {
  const { id } = useParams();
  const tutor = useMemo(() => MOCK_TUTOR_PROFILE, [id]);
  const { user } = useAuth();
  const isLearner = user?.role === "learner" || !user;

  const [selectedSlot, setSelectedSlot] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [booking, setBooking] = useState({
    subject: tutor.subjects[0],
    mode: "online",
    note: ""
  });

  const allSlots = useMemo(() => {
    return tutor.availability.flatMap((day) =>
      day.slots.map((slot) => `${day.day} ${slot}`)
    );
  }, []);

  const handleSlotSelect = (slotKey) => {
    setSelectedSlot(slotKey);
  };

  const openModal = () => {
    if (!isLearner) return;
    if (!selectedSlot && allSlots.length) {
      setSelectedSlot(allSlots[0]);
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking request:", {
      tutorId: tutor.id,
      slot: selectedSlot,
      ...booking
    });
    closeModal();
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header__left">
          <img
            src={tutor.photo}
            alt={tutor.name}
            className="profile-photo"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">Tutor profile</p>
            <h1>{tutor.name}</h1>
            <p className="hint">{tutor.title}</p>
          </div>
        </div>
        <div className="profile-header__right">
          <div className="profile-stat">
            <span className="label">Rate</span>
            <strong>{tutor.price} AZN/hr</strong>
          </div>
          <div className="profile-stat">
            <span className="label">Rating</span>
            <strong>
              ★ {tutor.rating.toFixed(1)}{" "}
              <span className="hint">({tutor.reviewsCount} reviews)</span>
            </strong>
          </div>
          <div className="profile-stat">
            <span className="label">Location</span>
            <strong>
              {tutor.city}, {tutor.districts[0]}
            </strong>
          </div>
        </div>
      </header>

      <section className="profile-main">
        <div className="profile-details">
          <div className="card">
            <h2>About me</h2>
            <p>{tutor.bio}</p>
          </div>

          <div className="card">
            <h3>Qualifications</h3>
            <ul className="list">
              {tutor.qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>Subjects</h3>
            <div className="tags">
              {tutor.subjects.map((subject) => (
                <span key={subject} className="chip">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Reviews</h3>
            <div className="reviews">
              {tutor.reviews.map((review) => (
                <div key={review.user} className="review">
                  <div className="review__header">
                    <strong>{review.user}</strong>
                    <span className="rating">★ {review.rating.toFixed(1)}</span>
                  </div>
                  <p className="review__comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="booking-column">
          <div className="card booking-card">
            <h3>Book a Session</h3>
            <p className="hint">
              Select a weekly slot and send a booking request.
            </p>
            <div className="availability">
              {tutor.availability.map((day) => (
                <div key={day.day} className="availability__day">
                  <strong>{day.day}</strong>
                  <div className="availability__slots">
                    {day.slots.map((slot) => {
                      const slotKey = `${day.day} ${slot}`;
                      const isActive = selectedSlot === slotKey;
                      return (
                        <button
                          key={slot}
                          type="button"
                          className={`slot ${isActive ? "is-active" : ""}`}
                          onClick={() => handleSlotSelect(slotKey)}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn--primary btn--full"
              disabled={!isLearner || allSlots.length === 0}
              onClick={openModal}
              title={
                isLearner
                  ? allSlots.length
                    ? "Send a booking request"
                    : "No slots available"
                  : "Only learners can request bookings"
              }
            >
              {isLearner ? "Request Booking" : "Bookings are for learners"}
            </button>
            {!isLearner && (
              <p className="hint mt-2">
                Log in as a learner to request a booking.
              </p>
            )}
          </div>
        </aside>
      </section>

      {showModal ? (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal__header">
              <h3>Request Booking</h3>
              <button className="close" onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>
            <form className="stacked-form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Select an available time</span>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  required
                >
                  {allSlots.length === 0 && (
                    <option value="">No availability listed</option>
                  )}
                  {allSlots.length > 0 && selectedSlot === "" && (
                    <option value="">Choose a slot</option>
                  )}
                  {allSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Subject</span>
                <select
                  name="subject"
                  value={booking.subject}
                  onChange={handleBookingChange}
                >
                  {tutor.subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>
              <div className="field">
                <span>Lesson mode</span>
                <div className="radio-row">
                  <label className="radio">
                    <input
                      type="radio"
                      name="mode"
                      value="online"
                      checked={booking.mode === "online"}
                      onChange={handleBookingChange}
                    />
                    <span>Online</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="mode"
                      value="in-person"
                      checked={booking.mode === "in-person"}
                      onChange={handleBookingChange}
                    />
                    <span>In-Person</span>
                  </label>
                </div>
              </div>
              <label className="field">
                <span>Note (optional)</span>
                <textarea
                  name="note"
                  rows="3"
                  placeholder="Add a short message for the tutor"
                  value={booking.note}
                  onChange={handleBookingChange}
                  required
                />
              </label>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={!selectedSlot}
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TutorProfile;
