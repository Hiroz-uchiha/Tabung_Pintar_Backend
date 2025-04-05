const mongoose = require("mongoose");

const RekeningSchema = new mongoose.Schema({
  namaRekening : {
    type : String,
    required : true
  },
  jumlahUang : {
    type : Number,
    required : true,
    default : 0
  }
},
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Rekening",RekeningSchema)