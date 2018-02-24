let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let adminSchema=new Schema({
    username: String,
    password: String,
    email: String,
    super: {type: Boolean, default: false},
    members:[String],
    admissions:[String]
});

module.exports=mongoose.model("Admin", adminSchema);