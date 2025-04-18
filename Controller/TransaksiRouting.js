const express = require("express")
const rute = express.Router()
const TransaksiSchema= require("../Schema/TransaksiSchema")
const RekeningSchema = require("../Schema/RekeningSchema")
const verifyToken = require("../Controller/Authorization/jwt")

// Get smeua Transaksi
rute.get("/",verifyToken, async(req,res) => {
    try{
        const userID = req.user._id
        const transaksi = await TransaksiSchema.find({userId : userID}).populate("rekening")        
        res.status(200).json(transaksi)
    }catch(err){
        res.status(500).json("Error : ",err)
    }
})

// Buat Transaksi baru  + Update saldo Rekening
rute.post("/",verifyToken, async(req,res) => {
    const {rekening, jenisTransaksi, jumlah} = req.body;

    try{
        const userID = req.user._id
        const rekeningData = await RekeningSchema.findById(rekening);
        if(!rekeningData){
            res.status(404).json({error : "Rekening tidak ditemukan"})
        }

        const nominal = parseFloat(jumlah);
        if(jenisTransaksi === "Pengeluaran"){
            rekeningData.jumlahUang -= nominal;
        }else if(jenisTransaksi === "Pemasukan"){
            rekeningData.jumlahUang += nominal;
        }else {
            return res.status(400).json({error : "Jenis transaksi tidak valid"})
        }

        // Simpan saldo rekening baru
        await rekeningData.save();

        // Simpan transaksi
        const transaksiBaru = new TransaksiSchema({
            rekening,
            jenisTransaksi,
            jumlah : nominal,
            userId : userID
        })
        const saved = await transaksiBaru.save()

        res.status(201).json(saved)
    }catch(err){

    }
})

module.exports = rute