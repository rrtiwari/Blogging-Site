import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL (e.g., /editblog/123)

  // 1. Fetch the existing blog data when the component loads
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/editblog?blogId=${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setTitle(data.blogData.title);
          setBody(data.blogData.body);
        } else {
          setError("Could not load blog data");
        }
      } catch (err) {
        setError("Server error");
      }
    };
    fetchBlog();
  }, [id]);

  // 2. Handle the update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/updateblog?blogId=${id}`, {
        method: "POST", // Keeping POST as per your backend router
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        navigate("/myblog"); // Redirect back to list
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to update blog");
    }
  };

  return (
    <div className="main-addblog">
      <h2>Edit your Blog Here</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Blog title here"
          required
        />
        <br />
        <br />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter blog body here"
          required
        ></textarea>
        <br />
        <br />
        <button type="submit">Update</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default EditBlog;
