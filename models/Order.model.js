import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  itemsOrdered: [
    {

      productId:
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      quantity: {
        type: Number
      }
    }
  ],

  // shippingAddress: {
  //     address: { type: String, required: true},
  //     city: { type: String, required: true},
  //     postalCode: { type: String, required: true},
  //     country: { type: String, required: true},
  // },



}, {
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order