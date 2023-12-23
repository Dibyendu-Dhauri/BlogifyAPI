const express = require("express");
const router = express.Router();
const {getBlogs,createBlog,updateBlog,deleteBlog} = require("../controller/blog.controller")
const verifyUser = require("../middleware/verifyUser")
// const rateLimiter = require("../middleware/rateLimiter")


router.get("/",getBlogs);
router.post("/",verifyUser,createBlog);
router.put("/:id",verifyUser,updateBlog);
router.delete("/:id",verifyUser,deleteBlog);

module.exports = router;