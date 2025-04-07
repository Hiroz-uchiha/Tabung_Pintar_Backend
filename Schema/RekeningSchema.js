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
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "UserSchema",
    required : true
  }
},
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Rekening",RekeningSchema)