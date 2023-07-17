const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(
  "mongodb+srv://tejareddy9133:tejareddy9133@cluster0.aijr3ge.mongodb.net/sprintfour?retryWrites=true&w=majority"
);
module.exports = { connection };
