const mongoose = require("mongoose");

const DatabaseStatus = (req, res, next) => {
    if (mongoose.connection._readyState === 2)
        return res
            .status(500)
            .json({ message: "Connecting to database... try again later!" });
    else if (mongoose.connection._readyState != 1)
        return res.status(500).json({ message: "Database Not Connected" });
    next();
};

module.exports = { DatabaseStatus };
