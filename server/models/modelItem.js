const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
  },

  price: {
    type: Number,
  },

  stock: {
    type: Number,
  },

  tags: {
    type: Array,
  },
  user : { type: Schema.Types.ObjectId, ref: 'User' }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item