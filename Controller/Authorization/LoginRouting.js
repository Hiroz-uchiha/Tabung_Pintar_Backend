const express = require("express")
const rute = express.Router()
const userSchema = require("../../Schema/Authorization/LoginSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Register
rute.post("/register", async(req,res) => {
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    console.log("Password",hashPassword)
    // Cek Email
    const emailExist = await userSchema.findOne({email : req.body.email})
    if(emailExist) return res.status(400).json({message : "Email sudah digunakan"})

    const user = new userSchema({
        username : req.body.username,
        email : req.body.email,
        password : hashPassword
    })
    try{
        const saveUser =  await user.save()
        res.status(201).json(saveUser)
    }catch(err){
        res.status(500).json(err)
    }
})

rute.post("/login",async(req,res) => {
    try{
        // if email exist
        const user = await userSchema.findOne({email : req.body.email})
        if(!user) return res.status(404).json({message : "Email salah"})
    
        // Cek password
        const validPwd = await bcrypt.compare(req.body.password, user.password)
        if(!validPwd) return res.status(400).json({
            status : res.statusCode,
            message : "Password salah"})
    
        // Membuat jwt token
        const token = jwt.sign({_id : user._id}, process.env.SECRET_KEY)
        res.header("nama-token",token).json({
            token : token
        })

        }catch(err){
        res.status(500).json("Terjadi kesalahan : ",err)
    }
})

module.exports = rute