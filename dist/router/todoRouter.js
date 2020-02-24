"use strict";

var express = require("express");

var Todo = require("../model/todo");
var router = express.Router();

router.post("/createtodo", async function (req, res) {
    var todos = new Todo({ text: req.body.text, prio: req.body.prio });
    var response = await todos.save(function (error, success) {
        if (error) {
            error ? res.send(error.message) : res.redirect("/todo");
        } else res.redirect("/todo");
    });
});

router.get("/todo", async function (req, res) {

    console.log(req.query);
    var sorted = req.query.sort;
    var todos = await Todo.find().sort({ prio: sorted });
    res.render("todo", { todos: todos });
});

router.get("/delete/:id", async function (req, res) {
    console.log(req.params.id);
    await Todo.deleteOne({ _id: req.params.id });
    res.redirect("/todo");
});

router.route("/update/:id").get(async function (req, res) {
    var response = await Todo.findById({ _id: req.params.id });
    console.log(response);
    res.render("edit", { response: response });
}).post(async function (req, res) {
    await Todo.updateOne({ _id: req.body.id }, { $set: { text: req.body.text, prio: req.body.prio } }, { runValidators: true }, function (error) {
        return error ? res.send(error.message) : res.redirect("/todo");
    });
});

router.get("/about", function (req, res) {
    res.send("This to do app was created by Josefin");
});

module.exports = router;