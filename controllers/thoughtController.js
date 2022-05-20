const thought_template = require("../models/thought");

const show_all_thoughts = async (request, response, next) => {
    thought_template.find({}, (err, data) => {
        if (!err) response.send(data);
        else console.log(err);
    });
};



module.exports = {
    show_all_thoughts,
};
