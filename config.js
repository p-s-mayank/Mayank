const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const localhost = true;

const DATABASE = localhost
    ? "mongodb+srv://TJ10:TJ10@cluster0.t99ve.mongodb.net/?retryWrites=true&w=majority"
    : process.env.DATABASE;

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    DATABASE,
    SECRET_KEY,
};
