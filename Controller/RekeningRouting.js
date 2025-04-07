const express = require("express")
const rute = express.Router()
const RekeningSchema = require("../Schema/RekeningSchema")
const verifyToken = require("../Controller/Authorization/jwt")

//1. Get data 
rute.get("/",verifyToken, async(req,res) => {
    try{
        const userID = req.user._id
        rekening = await RekeningSchema.find({userId : userID});
        res.status(200).json(rekening)
    }catch(err){
        res.status(500).json("Error :" , err)
    }
})

// Post Data
rute.post("/",verifyToken, async(req,res) => {
    try{
        const userID = req.user._id
        const data = new RekeningSchema({
            ...req.body,
            userId : userID

        });
        const saveData = await data.save();
        res.status(201).json(saveData)
    }catch(err){
        res.status(500).json("Error :",err)
    }
})




module.exports = rute;