const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true],
    },
    body: {
      type: String,
      required: true,
      //   default: 18,
    },
  },
  { timestamps: true }
);

const blogs = mongoose.model("blogs", blogsSchema);

module.exports = blogs;
