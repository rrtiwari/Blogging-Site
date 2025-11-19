const Blogs = require("../models/blogSchema");

const home = async (req, res) => {
  const perPage = 5;
  const page = req.query.page || 1;
  const sort = req.query.sort || "title";
  try {
    const blogs = await Blogs.find()
      .sort({ [sort]: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await Blogs.countDocuments();
    const totalPages = Math.ceil(count / perPage);

    // CHANGED: Send JSON instead of render
    res.json({
      success: true,
      blogsData: blogs,
      current: page,
      pages: totalPages,
      sort,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
};

const myBlog = async (req, res) => {
  try {
    const userId = req.session.userid;
    const myblogs = await Blogs.find({ userId });
    res.json({ success: true, blogData: myblogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// addBlog is handled by React frontend routing, no backend controller needed for GET

const editBlog = async (req, res) => {
  try {
    const { blogId } = req.query;
    const blogData = await Blogs.findOne({ _id: blogId });
    res.json({ success: true, blogData });
  } catch (err) {
    res.status(404).json({ success: false, message: "Blog not found" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newblog = new Blogs({
      title,
      body,
      userId: req.session.userid,
    });
    await newblog.save();
    res.json({ success: true, message: "Blog created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Cannot create blog" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.query;
    await Blogs.findByIdAndUpdate({ _id: blogId }, req.body);
    res.json({ success: true, message: "Blog updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Cannot update blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.query;
    await Blogs.findOneAndDelete({ _id: blogId });
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Cannot delete blog" });
  }
};

module.exports = { home, myBlog, createBlog, deleteBlog, editBlog, updateBlog };
