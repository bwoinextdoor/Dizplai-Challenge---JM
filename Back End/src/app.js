const express = require("express");
const cors = require("cors");
const pollsRouter = require("./routes/polls");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/polls", pollsRouter);

module.exports = app;
