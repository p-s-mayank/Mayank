const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routesUrls = require("./routes");
const { DatabaseStatus } = require("./middleware/DatabaseState");
const cors = require("cors");
const config = require("./config");
const DB = config.DATABASE;
const PORT = 4000;

// Prevents app crash
process.on("uncaughtException", (err) => {
    console.error(err.stack);
});

mongoose
    .connect(DB)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("DB connection error: ", err));

app.use(express.json());
app.use(cors());
app.use("/", DatabaseStatus, routesUrls);

const ErrorHandler = (err, req, res, next) => {
    res.status(500).json({ message: "Server Error", stack: err.stack });
};
app.use(ErrorHandler);

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
