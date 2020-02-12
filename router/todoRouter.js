const express = require("express");

//importerar Todo-funktionen med sitt mongoose-schema från todo.js-filen
const Todo = require("../model/todo");
const router = express.Router();

//skapa todo-data och visa det sedan i todo router
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


//för att kunna se data
router.get("/todo", async (req, res) => {
    
    //sortera efter prio
    console.log(req.query)
    const sorted = req.query.sort;
    const todos = await Todo.find().sort({prio:sorted});
    //laddar min ejs-fil och kör tillsammans med objektet todos
    res.render("todo", {todos: todos});
});

//för att kunna ta bort kommentarer
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
    //updateOne för att kunna editera kommentarer
   await Todo.updateOne({_id:req.body.id}, 
    {$set: {text:req.body.text, prio:req.body.prio}},
    {runValidators:true}, (error) => error? res.send(error.message):res.redirect("/todo"))
    console.log(req.body);
    res.redirect("/todo")
});

//exporterar router ovan
module.exports = router;