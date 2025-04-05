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

// Koneksi ke mongodb
mongoose.connect(mongoString);
const db = mongoose.connection;

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

const PORT = 3001;
app.listen(PORT, () => console.log("Server sudah berjalan di port : " + PORT))

module.exports = app