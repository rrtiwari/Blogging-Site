import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    const res = await fetch("https://blogging-app-wfut.onrender.com/myblog", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) setBlogs(data.blogData);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    // CHANGED: Added credentials: 'include' so the backend knows who you are
    const res = await fetch(`https://blogging-app-wfut.onrender.com/deleteblog?blogId=${id}`, {
      method: "GET",
      credentials: "include",
    });

    // Optional: Check if delete was successful before refreshing
    const data = await res.json();
    if (data.success) {
      fetchMyBlogs(); // Refresh list only if delete succeeded
    } else {
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="main-myblog">
      <Link to="/addblog" className="add-btn">
        Add Blog +
      </Link>
      {blogs.map((blog) => (
        <div className="blog" key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.body}</p>
          <div className="blog-actions">
            <Link to={`/editblog/${blog._id}`} className="edit-btn">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(blog._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyBlogs;
