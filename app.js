//jshint esversion:6
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./model/product.model.js");
const env = require("dotenv").config();

const ejs = require("ejs");
const port = 1234;

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStringContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.URL)
  .then(function () {
    app.listen(1234, (req, res) => {
      console.log("Server on http://localhost:1234");
    });
  })
  .catch(function (e) {});

app.get("/", async (req, res) => {
  var item = [];
  try {
    const product = await Product.find({});
    product.forEach((element) => {
      item.push({ title: element.title, post: element.body });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }

  res.render("home", { homeContent: homeStartingContent, workList: item });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactStringContent });
});

app.get("/about", function (req, res) {
  res.render("about", { boutContent: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose", {});
});

app.post("/compose", async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.postTitle,
      body: req.body.postBody,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/blogs/:topic", async (req, res) => {
  var item = [];
  try {
    const product = await Product.find({});
    product.forEach((element) => {
      item.push({ title: element.title, post: element.body });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }

  item.forEach((x) => {
    if (_.lowerCase(x.title) == _.lowerCase(req.params.topic)) {
      res.render("post", { title: x.title, body: x.post });
    }
  });
});
