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
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

//generating tokens
user_template.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, config.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};
module.exports = mongoose.model("registered_users", user_template);
