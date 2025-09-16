const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const UsersSchema =new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true,
        enum:["admin","customer"],
        default:"customer"
    }

},{timestamps:true})

module.exports = mongoose.model('User',UsersSchema);