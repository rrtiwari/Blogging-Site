import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "title";
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`https://blogging-app-wfut.onrender.com/?page=${page}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogsData);
          setTotalPages(data.pages);
        }
      });
  }, [page, sort]);

  return (
    <div className="main-myblog">
      <h1>All Blogs</h1>
      <div className="sort-section">
        <label>Sort By: </label>
        <select
          value={sort}
          onChange={(e) => setSearchParams({ page: 1, sort: e.target.value })}
        >
          <option value="title">Title</option>
          <option value="createdAt">Date</option>
        </select>
      </div>
      {blogs.map((blog) => (
        <div className="blog" key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.body}</p>
          <p>Date: {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      ))}

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setSearchParams({ page: i + 1, sort })}
            className={parseInt(page) === i + 1 ? "activePage" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Home;
