const Blog = require("../models/blog.models");
const createError = require("../utils/error");

const getBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    if (!blog) {
      return next(createError(500, "No Blog Found"));
    }
    res.status(200).json({
        message: "Success",
        data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { title, details } = req.body;
    if (!title || !details) {
      return next(createError(401, "All fields are required"));
    }
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(200).json({
      message: "Successfully created new Blog",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    if (!blogId) return next(createError(401, "Blog Id is required"));

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog)
      return next(createError(401, "Blog isn't existed, create a new one"));

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(200).json({
      message: "successfully updated Blog",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    if (!blogId) return next(createError(401, "Blog Id is required"));
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog)
      return next(createError(401, "Blog isn't existed, create a new one"));

    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    res.status(200).json({
      message: "successfully deleted Blog",
      data: deletedBlog,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
