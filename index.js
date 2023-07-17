const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/users.routes");
const { postRouter } = require("./routes/posts.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(5000, async () => {
  try {
    await connection;
    console.log("dbconnected");
  } catch (error) {
    console.log(error);
  }
});
