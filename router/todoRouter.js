const express = require("express");

const Todo = require("../model/todo");
const router = express.Router();

router.post("/createtodo", async (req, res) => {
    const todos = new Todo({text: req.body.text, prio: req.body.prio});
    const response = await todos.save((error, success)=>{
        if 
            (error){error? res.send(error.message): res.redirect("/todo")
        }
        else
        res.redirect("/todo");
        })
    });

router.get("/todo", async (req, res) => {
    
    console.log(req.query)
    const sorted = req.query.sort;
    const todos = await Todo.find().sort({prio:sorted});
    res.render("todo", {todos: todos});
});

router.get("/delete/:id", async (req, res)=>{
    console.log(req.params.id);
    await Todo.deleteOne({_id:req.params.id});
    res.redirect("/todo");
});

router.route("/update/:id")

.get(async (req, res)=>{
    const response = await Todo.findById({_id:req.params.id})
    console.log(response);
    res.render("edit", {response})
})

.post(async(req, res)=>{
   await Todo.updateOne({_id:req.body.id}, 
    {$set: {text:req.body.text, prio:req.body.prio}},
    {runValidators:true}, (error) => error? res.send(error.message):res.redirect("/todo"))
});

router.get("/about", (req, res) => {
    res.send("This to do app was created by Josefin")
});

module.exports = router;