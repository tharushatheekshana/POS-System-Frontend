import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { useAuth } from "./utils/AuthContext";

function Menu() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div class="custom-menu">
      <nav className="d-flex flex-column flex-shrink-0 p-3 custom-menu vh-100 position-fixed">
        <div>
          <h2>{currentTime.toLocaleDateString()}</h2>

          <h3 className="text-center">
            {currentTime
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
              .toUpperCase()}
          </h3>
        </div>

        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item fs-4">
            <Link to="/items" className="nav-link active" aria-current="page">
              <i className="bi bi-table me-2"></i> Items
            </Link>
          </li>
          <li className="nav-item fs-4">
            <Link to="/orders" className="nav-link">
              <i className="bi bi-cart-check me-2"></i> Orders
            </Link>
          </li>
          {/* <li className="nav-item fs-4">
            <Link to="/categories" className="nav-link">
              <i className="bi bi-box me-2"></i> Categories
            </Link>
          </li> */}
          <li className="nav-item fs-4">
            <Link to="/stocks" className="nav-link">
              <i className="bi bi-box-seam me-2"></i> Stocks
            </Link>
          </li>
          <li className="nav-item fs-4">
            <Link to="/reports" className="nav-link">
              <i className="bi bi-file-earmark-text me-2"></i> Reports
            </Link>
          </li>

          <li className="nav-item fs-4">
            <Link to="/help" className="nav-link">
              <i className="bi bi-question-circle me-2"></i> Help
            </Link>
          </li>
          <li className="nav-item fs-4">
            <Link to="/about" className="nav-link">
              <i className="bi bi-info-circle me-2"></i> About
            </Link>
          </li>
          <li className="nav-item fs-4">
            <Link to="/contact" className="nav-link">
              <i className="bi bi-file-earmark-arrow-down me-2"></i> Contact Us
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item fs-4">
              <Link className="nav-link" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
