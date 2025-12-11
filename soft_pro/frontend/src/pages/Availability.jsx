import { useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const Availability = () => {
  const [slots, setSlots] = useState([
    { id: "s1", day: "Monday", start: "10:00", end: "12:00" },
    { id: "s2", day: "Wednesday", start: "14:00", end: "15:30" }
  ]);

  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    start: "",
    end: ""
  });

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.start || !newSlot.end) return;
    const slot = {
      id: crypto.randomUUID(),
      ...newSlot
    };
    setSlots((prev) => [...prev, slot]);
    setNewSlot((prev) => ({ ...prev, start: "", end: "" }));
  };

  const handleDeleteSlot = (id) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  return (
    <div className="page-narrow">
      <div className="card">
        <h2>Manage Availability</h2>
        <p className="hint">
          Add recurring weekly slots so learners can request times that work for you.
        </p>
        <form className="slot-form" onSubmit={handleAddSlot}>
          <label className="field">
            <span>Day</span>
            <select
              name="day"
              value={newSlot.day}
              onChange={(e) =>
                setNewSlot((prev) => ({ ...prev, day: e.target.value }))
              }
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Start</span>
            <input
              type="time"
              value={newSlot.start}
              onChange={(e) =>
                setNewSlot((prev) => ({ ...prev, start: e.target.value }))
              }
            />
          </label>
          <label className="field">
            <span>End</span>
            <input
              type="time"
              value={newSlot.end}
              onChange={(e) =>
                setNewSlot((prev) => ({ ...prev, end: e.target.value }))
              }
            />
          </label>
          <button type="submit" className="btn btn--primary">
            Add Slot
          </button>
        </form>

        <div className="slots-list">
          {slots.map((slot) => (
            <div key={slot.id} className="slot-row">
              <span>
                {slot.day}: {slot.start} - {slot.end}
              </span>
              <button
                type="button"
                className="icon-button"
                onClick={() => handleDeleteSlot(slot.id)}
                aria-label="Delete slot"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Availability;
