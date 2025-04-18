require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const mongoString = process.env.DATABASE_URL
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

const RekeningRouting = require("./Controller/RekeningRouting")
const TransaksiRouting = require("./Controller/TransaksiRouting")
const RingkasanRouting = require("./Controller/RingkasanRouting")
const RegisterRouting = require("./Controller/Authorization/LoginRouting")

// Koneksi ke mongodb
mongoose.connect(mongoString);
const db = mongoose.connection;

app.get("/", (req,res) => {
    res.json({message : "API telah berhasil di-deploy di Vercel"})
})

// Koneksi ke mongodb
db.once("connected", () => {
    console.log("Connected to MongoDB")
})

db.on("error", (err) => {
    console.log(err)
})

app.use("/rekening",RekeningRouting)
app.use("/transaksi",TransaksiRouting)
app.use("/ringkasan",RingkasanRouting)
app.use("/user",RegisterRouting)


module.exports = app