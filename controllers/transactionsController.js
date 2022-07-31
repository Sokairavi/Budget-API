const express = require("express");
const { redirect } = require("statuses");
const transactionsRoutes = express.Router();
const transactionsArr = require("../models/transactions");
 
// `/transactions` INDEX (same url also for: CREATE-POST)
transactionsRoutes.get("/", (req, res)=>{
   res.status(200).json(transactionsArr);
})
 
// `/transactions` CREATE-POST
transactionsRoutes.post("/", (req, res)=>{
   transactionsArr.push(req.body);
   res.json(transactionsArr[transactionsArr.length -1]);
})
 
// `/transactions/:id` SHOW (same url also for: DELETE, UPDATE-PUT)
transactionsRoutes.get(`/:id`, (req, res)=>{
   if (transactionsArr[req.params.id]) {
       res.status(200).json(transactionsArr[req.params.id]);
   } else {
       res.redirect(`/veggies`);
   }
})
 
// `/transactions/:id` DELETE
transactionsRoutes.delete(`/:id`, (req, res)=>{
   const { id } = req.params;
   if (transactionsArr[id]) {
       const deletedTransaction = transactionsArr.splice(id, 1)
       res.status(200).json(deletedTransaction);
   } else {
       res.status(404).json({ error: "Transaction Not Found. Can't delete." })
   }
})
 
// `/transactions/:id` UPDATE-PUT
transactionsRoutes.put(`/:id`, (req, res)=>{
   const { id } = req.params;
   let { date, name, amount, from, category } = req.body;
   if (!transactionsArr[id]){
       res.status(404).json({ error: "Not found. Can't update."});
       return;
   }
 
   if (date && name && amount !== undefined && from && category) {
       transactionsArr[id] = {
           date, name, amount, from, category
       }
       res.status(200).json(transactionsArr[id]);
   } else {
       res.status(422).json({ error: "Please provide all fields." });
   }
})
 
module.exports = transactionsRoutes;