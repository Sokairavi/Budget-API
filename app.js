//Dependencies
const express = require("express");
// const cors = require("cors");

//Configuration
const app = express();


//Middleware code 
// app.use(cors());
app.use(express.json());

//Controllers
const transactionsController = require("./controllers/transactionsController");
app.use("/transactions", transactionsController);

//Routes
app.get("/", (request, response) => {
    response.send("Welcome to Budget App")
})

app.get("*", (request, response)=> {
    response.status(404).json({error: "Page Not Found"})
})

//Export
module.exports = app;