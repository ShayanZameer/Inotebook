import React from "react";
import { useNavigate } from "react-router-dom";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="">iNotebook</Link> */}
          <h5 className="my-3 mx-3">StickyNotes</h5>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link className="btn btn-primary mx-3" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-3" to="/signup" role="button">
                Signup
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
