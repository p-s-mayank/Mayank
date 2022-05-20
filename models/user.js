const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const user_template = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    thoughts: [mongoose.Schema.Types.ObjectId],
    replies: [mongoose.Schema.Types.ObjectId]
});

//generating tokens
user_template.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, config.SECRET_KEY);
        return token;
    } catch (error) {
        console.log(error);
    }
};
module.exports = mongoose.model("user", user_template);
