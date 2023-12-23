const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
 title:{
    type: String,
    require: true,
 },
 details:{
    type: String,
    require: true
 }
},{timestamps: true});

const Blog = mongoose.model("Blog",BlogSchema);
module.exports = Blog;