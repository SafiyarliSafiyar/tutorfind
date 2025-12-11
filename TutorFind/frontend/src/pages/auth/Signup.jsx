import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "learner"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRole = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", form);
  };

  return (
    <div className="page-card page-card--narrow">
      <header className="page-card__header">
        <p className="eyebrow">Join the community</p>
        <h1>Sign up</h1>
      </header>
      <div className="role-toggle">
        <button
          type="button"
          className={`role-card ${form.role === "learner" ? "is-active" : ""}`}
          onClick={() => handleRole("learner")}
        >
          <strong>Learner</strong>
          <span>Find tutors nearby and book easily.</span>
        </button>
        <button
          type="button"
          className={`role-card ${form.role === "tutor" ? "is-active" : ""}`}
          onClick={() => handleRole("tutor")}
        >
          <strong>Tutor</strong>
          <span>Show your expertise and manage availability.</span>
        </button>
      </div>

      <form className="stacked-form" onSubmit={handleSubmit}>
        <div className="two-col">
          <label className="field">
            <span>First name</span>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              required
            />
          </label>
          <label className="field">
            <span>Last name</span>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              required
            />
          </label>
        </div>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </label>
        <label className="field">
          <span>Confirm password</span>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </label>

        {form.role === "tutor" ? (
          <p className="hint">
            You will complete your profile details (Subjects, Price,
            Availability) after registration.
          </p>
        ) : null}

        <button type="submit" className="btn btn--primary">
          Create Account
        </button>
      </form>
      <p className="hint">
        Already have an account? <Link to="/login">Log in</Link>.
      </p>
    </div>
  );
};

export default Signup;
