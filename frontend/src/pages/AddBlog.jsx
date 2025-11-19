import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://blogging-app-wfut.onrender.com/createblog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) navigate("/myblog");
  };

  return (
    <div className="main-addblog">
      <h2>Add your Blog Here</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default AddBlog;
