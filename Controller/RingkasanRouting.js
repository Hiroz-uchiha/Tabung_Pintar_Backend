const express = require("express")
const mongoose = require("mongoose")
const rute = express.Router();
const RekeningSchema = require("../Schema/RekeningSchema")
const TransaksiSchema = require("../Schema/TransaksiSchema")
const verifyToken = require("../Controller/Authorization/jwt")

rute.get("/",verifyToken, async(req,res) => {
    try{
        const userID = req.user._id
        console.log("User ID dari token:", userID)
        
        // Konversi ke ObjectId untuk memastikan format yang benar
        const userObjectId = new mongoose.Types.ObjectId(userID)

        //1. Hitung Total Uang
        const totalRekening = await RekeningSchema.aggregate([
            {
                $match : {userId : userObjectId}
            },
            {
                $group : {
                    _id : null,
                    totalUang : {$sum: "$jumlahUang"}
                }
            }
        ])

        //2. Hitung Total pemasukan
        const totalPemasukan = await TransaksiSchema.aggregate([
            {$match : {jenisTransaksi: "Pemasukan", userId : userObjectId}},
            {
                $group : {
                    _id : null,
                    total : {$sum : "$jumlah"}
                }
            }
        ])

        //3. Hitung Total Pengeluaran
        const totalPengeluaran = await TransaksiSchema.aggregate([
            {$match : {jenisTransaksi : "Pengeluaran", userId : userObjectId}},
            {
                $group : {
                    _id : null,
                    total : {$sum : "$jumlah"}
                }
            }
        ])

        const totalUang = totalRekening[0]?.totalUang || 0;
        const pemasukan = totalPemasukan[0]?.total || 0
        const pengeluaran = totalPengeluaran[0]?.total || 0

        console.log("Total Rekening : ",totalRekening)
        console.log("Total Pemasukan : ",totalPemasukan)
        console.log("Total Pengeluaran : ",totalPengeluaran)

        res.status(200).json({
            totalUang, 
            totalPemasukan : pemasukan,
            totalPengeluaran : pengeluaran
        })

        const allRekening = await RekeningSchema.find({});
console.log("Semua rekening:", allRekening);

const allTransaksi = await TransaksiSchema.find({});
console.log("Semua transaksi:", allTransaksi);

    }catch(err){
        res.status(500).json({"Terjadi kesalahan :" : err})
    }
})

module.exports = rute