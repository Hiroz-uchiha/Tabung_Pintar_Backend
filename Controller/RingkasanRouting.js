const express = require("express")
const rute = express.Router();
const RekeningSchema = require("../Schema/RekeningSchema")
const TransaksiSchema = require("../Schema/TransaksiSchema")

rute.get("/",async(req,res) => {
    try{
        //1. Hitung Total Uang
        const totalRekening = await RekeningSchema.aggregate([
            {
                $group : {
                    _id : null,
                    totalUang : {$sum: "$jumlahUang"}
                }
            }
        ])

        //2. Hitung Total pemasukan
        const totalPemasukan = await TransaksiSchema.aggregate([
            {$match : {jenisTransaksi: "Pemasukan"}},
            {
                $group : {
                    _id : null,
                    total : {$sum : "$jumlah"}
                }
            }
        ])

        //3. Hitung Total Pengeluaran
        const totalPengeluaran = await TransaksiSchema.aggregate([
            {$match : {jenisTransaksi : "Pengeluaran"}},
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

        res.status(200).json({
            totalUang, 
            totalPemasukan : pemasukan,
            totalPengeluaran : pengeluaran
        })

    }catch(err){
        res.status(500).json({"Terjadi kesalahan :" : err})
    }
})

module.exports = rute