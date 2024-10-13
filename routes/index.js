const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const cvRouter = require("./cv");
const app = express();
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cv", cvRouter);

module.exports = app;
