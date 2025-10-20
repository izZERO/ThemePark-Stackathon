const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  lastSeen: {
    type: String,
  },
  description: {
    type: String,
  },
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item
