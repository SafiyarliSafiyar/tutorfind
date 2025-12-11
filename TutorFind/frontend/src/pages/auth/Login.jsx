import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameFromEmail = form.email.split("@")[0] || "Tutor";
    login({
      name: nameFromEmail,
      email: form.email,
      role: "tutor"
    });
    navigate("/");
  };

  return (
    <div className="page-card page-card--narrow">
      <header className="page-card__header">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in</h1>
      </header>
      <form className="stacked-form" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            Log In
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => console.log("Forgot password clicked for", form.email)}
          >
            Forgot Password?
          </button>
        </div>
      </form>
      <div className="grid gap-2 mt-2">
        <p className="hint">Quick test logins:</p>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              login({
                name: "Aysel M.",
                email: "tutor@example.com",
                role: "tutor"
              });
              navigate("/");
            }}
          >
            Tutor demo
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              login({
                name: "Leyla R.",
                email: "learner@example.com",
                role: "learner"
              });
              navigate("/");
            }}
          >
            Learner demo
          </button>
        </div>
      </div>
      <p className="hint">
        New to TutorFind? <Link to="/signup">Create an account</Link>.
      </p>
    </div>
  );
};

export default Login;
