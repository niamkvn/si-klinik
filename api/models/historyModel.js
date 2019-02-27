const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  magnitude:String
});

module.exports = mongoose.model("history", historySchema);
