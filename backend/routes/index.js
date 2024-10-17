const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const cvRouter = require("./cv");
const commentRouter = require("./comment");
const app = express();
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/cv", cvRouter);
app.use("/comment", commentRouter);


module.exports = app;
