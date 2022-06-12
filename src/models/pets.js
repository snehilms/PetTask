const mongoose =require("mongoose")
const petSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})
//creating a collection
const Petinfo= new mongoose.model("Petinfo",petSchema);

module.exports = Petinfo;