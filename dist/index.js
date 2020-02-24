"use strict";

var express = require("express");
var mongoose = require("mongoose");

var sassMiddleware = require("node-sass-middleware");

var todoRouter = require("./router/todoRouter");

var config = require("./config/config");
var path = require("path");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(sassMiddleware({ src: path.join(__dirname, "scss"), dest: path.join(__dirname, "public") }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(todoRouter);

var port = process.env.PORT || 8001;

var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(config.databaseURL, options).then(function () {
    console.log("Succesful");
    app.listen(8001);
});

module.exports = app;