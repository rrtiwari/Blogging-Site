import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBlogs from "./pages/MyBlogs";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    fetch("http://localhost:3000/check-session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.isAuthenticated));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/myblog"
          element={
            isAuthenticated ? (
              <MyBlogs />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/addblog"
          element={
            isAuthenticated ? (
              <AddBlog />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Added EditBlog route with dynamic :id parameter */}
        <Route
          path="/editblog/:id"
          element={
            isAuthenticated ? (
              <EditBlog />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
