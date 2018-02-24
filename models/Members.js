let mongoose=require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');

let memberSchema=new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    ratings: Number,
    member: {type: Boolean, default: true},
    admissions:[String],
    admin:String
});

memberSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Member", memberSchema);