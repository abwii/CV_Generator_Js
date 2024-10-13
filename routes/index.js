const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const app = express();
app.use("/auth", authRouter);
app.use("/users", userRouter);

module.exports = app;
