const mongoose = require("mongoose");

const MODELNAME = "user";

const Schema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    password: String,
    score: { type: Number, default: 0 },
    joined_the: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//...

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;