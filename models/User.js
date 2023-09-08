const {Schema, model} = require("../db/connection")

const UserSchema = new Schema({
    username: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        require: true,
    }
})

const User = model("User", UserSchema)

module.exports = User