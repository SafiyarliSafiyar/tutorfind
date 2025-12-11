import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const initialProfile = {
  name: "Aysel Mammadova",
  title: "Experienced Math Tutor",
  city: "Baku",
  district: "Yasamal",
  rate: 20,
  bio: "I have 7+ years of experience helping learners excel in algebra, calculus, and exam prep. I focus on clear explanations, plenty of practice, and building confidence.",
  subjects: "Algebra, Calculus, SAT Math, Physics",
  qualifications:
    "B.Sc. in Mathematics, Baku State University\nCertified SAT/ACT Math Coach\n5+ years at a private learning center"
};

const ProfileSettings = () => {
  const [form, setForm] = useState(initialProfile);
  const { user } = useAuth();
  const isTutor = user?.role === "tutor";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", {
      ...form
    });
    alert("Profile Updated!");
  };

  return (
    <div className="page-narrow">
      <div className="card">
        <h2>Profile Settings</h2>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="field">
            <span>Full Name</span>
            <input
              name="name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

        {isTutor && (
          <div className="field">
            <span>Headline / Title</span>
            <input
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
        )}

          <div className="two-col">
            <label className="field">
              <span>City</span>
              <input
                name="city"
                value={form.city}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="e.g., Baku"
              />
            </label>
            <label className="field">
              <span>District</span>
              <input
                name="district"
                value={form.district}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, district: e.target.value }))
                }
                placeholder="e.g., Yasamal"
              />
            </label>
          </div>

          <div className="field">
            <span>Hourly Rate (AZN)</span>
            <input
              type="number"
              name="rate"
              min={0}
              value={form.rate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, rate: e.target.value }))
              }
            />
          </div>

          {isTutor && (
            <>
              <div className="field">
                <span>Bio</span>
                <textarea
                  name="bio"
                  rows="4"
                  value={form.bio}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                />
              </div>

              <div className="field">
                <span>Subjects (comma-separated)</span>
                <input
                  name="subjects"
                  value={form.subjects}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subjects: e.target.value }))
                  }
                  placeholder="Algebra, Calculus, SAT Math, Physics"
                />
              </div>

              <div className="field">
                <span>Qualifications (new line for each)</span>
                <textarea
                  name="qualifications"
                  rows="4"
                  value={form.qualifications}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      qualifications: e.target.value
                    }))
                  }
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn--primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
