import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  const isTutor = user?.role === "tutor";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark">TF</span>
          <span className="brand__name">TutorFind</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/search">Search Tutors</NavLink>
        </nav>

        <div className="auth-actions">
          {user ? (
            <div className="user-menu">
              <button
                className="user-trigger"
                onClick={toggleMenu}
                aria-expanded={open}
              >
                <span className="avatar">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="user-name">{user.name}</span>
              </button>
              {open && (
                <div className="dropdown" role="menu">
                  {isTutor ? (
                    <>
                      <Link to="/dashboard" onClick={closeMenu}>
                        Bookings
                      </Link>
                      <Link to="/settings/profile" onClick={closeMenu}>
                        Profile Settings
                      </Link>
                      <Link to="/settings/availability" onClick={closeMenu}>
                        My Availability
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/learner" onClick={closeMenu}>
                        My Sessions
                      </Link>
                      <Link to="/settings/profile" onClick={closeMenu}>
                        Profile Settings
                      </Link>
                    </>
                  )}
                  <button type="button" onClick={logout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="btn btn--ghost" to="/login">
                Log In
              </Link>
              <Link className="btn btn--primary" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
