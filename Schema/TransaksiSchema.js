const mongoose = require("mongoose")

const TransaksiSchema = new mongoose.Schema({
    rekening : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Rekening",
        required : true
    },
    jenisTransaksi  : {
        type : String,
        enum : ["Pemasukan", "Pengeluaran"],
        required : true
    },
    jumlah : {
        type : Number, 
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserSchema",
        required : true
    }

},
    {timestamps : true}
)

module.exports = mongoose.model("Transaksi",TransaksiSchema)