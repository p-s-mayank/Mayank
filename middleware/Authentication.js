const jwt = require("jsonwebtoken");
const user_template_copy = require("../models/registered_users");
const config = require("../config");

const Authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, config.SECRET_KEY, (err, data) => {
        if (err)
            return res.status(401).json({ message: "Unable to authenticate" });
        else {
            user_template_copy
                .findOne({ _id: data._id })
                .then((data) => {
                    req.user = data;
                    next();
                })
                .catch((err) => console.log(err));
        }
    });
};

module.exports = {
    Authenticate,
};
