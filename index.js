//skapa kopplingen till express och mongoose
const express = require("express");
const mongoose = require("mongoose");

//importera sass
const sassMiddleware = require("node-sass-middleware");

//importera router
const todoRouter = require("./router/todoRouter");

//importera config
const config = require("./config/config");
const path = require("path");

//anropa express-funktionen
const app = express();

//middleware
app.use(express.urlencoded({extended:true}));
app.use(sassMiddleware({src: path.join(__dirname, "scss"), dest: path.join(__dirname, "public")}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//använd skapad router från todoRouter.js
app.use(todoRouter);

//använd dynamisk port - molntjänst (t.ex. amazon), annars använd min egen 8001
const port = process.env.PORT || 8001;


//gammal inställning som orsakar error. 
//skickar med i mongoose-connection för att undvika error.
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true 
}


//skapa koppling till mongoDB atlas, glöm inte att skriva in lösenordet!
//nu är moongoDB atlas kopplat genom config.js för att dölja lösenordet.
mongoose.connect(config.databaseURL, options).then(()=> {
    console.log("Succesful")
    //lyssnar till lokal port 8001)
    app.listen(8001);
}); 

module.exports = app