import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="header">
      <p className="title">MicroBlog</p>
      <div className="tabs">
        <div className="tab">
          <Link to="/">Home</Link>
        </div>
        {isAuthenticated && (
          <div className="tab">
            <Link to="/myblog">MyBlogs</Link>
          </div>
        )}
        <div className="logout">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
