const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  itemsOrdered: [
    {
      productId:
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number
      }
    }
  ],
},
  {
    timestamps: true
  })


const Order = model("Order", orderSchema);

module.exports = Order;
