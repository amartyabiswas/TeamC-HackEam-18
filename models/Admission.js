let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let admissionSchema=new Schema({
    name: String,
    month: Number,
    year: Number,
    gender: String,
    enrollment:String,
    locality: String,
    aadhar: Boolean,
    remarks: String,
    profile: String
});

let admission=mongoose.model("cool", admissionSchema);
module.exports=admission;