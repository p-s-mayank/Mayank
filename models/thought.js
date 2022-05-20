const mongoose = require("mongoose");

const thought_template = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    anonymous: {
        type : Boolean,
        default : true
    },
    by : {
        user_id: mongoose.Schema.Types.ObjectId,
        username: String
    },
    replies : [
        {
            anonymous : {
                type : Boolean,
                default : true
            },
            by : {
                user_id: mongoose.Schema.Types.ObjectId,
                username: String
            },
            content : {
                type: String,
                reqired : true
            }
        }
    ]
});

module.exports = mongoose.model("thought", thought_template);
