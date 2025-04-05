const express = require("express")
const rute = express.Router()
const RekeningSchema = require("../Schema/RekeningSchema")


//1. Get data 
rute.get("/", async(req,res) => {
    try{
        rekening = await RekeningSchema.find();
        res.status(200).json(rekening)
    }catch(err){
        res.status(500).json("Error :" , err)
    }
})

// Post Data
rute.post("/", async(req,res) => {
    try{
        const data = new RekeningSchema(req.body);
        const saveData = await data.save();
        res.status(201).json(saveData)
    }catch(err){
        res.status(500).json("Error :",err)
    }
})




module.exports = rute;