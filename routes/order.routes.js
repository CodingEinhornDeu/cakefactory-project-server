const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require("../models/Order.model");
const User = require("../models/User.model");

// create order
router.post('/orders', (req, res, next) => {

  const { owner, itemsOrdered, title } = req.body;
  Order.create({
    owner,
    itemsOrdered,
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

// get the order from DB
router.get('/orders', (req, res, next) => {
  Order.find()
    .then(allOrders => res.json(allOrders))
    .catch(err => res.json(err));
});

router.put("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(orderId, req.body)
    .then(() =>
      res.json({
        message: `Order with ${orderId} is updated successfully.`,
      })
    )
    .catch(err => res.status(500).json(err));
});
// get a specific order/ detailed view
router.get('/orders/:orderId', (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Order.findById(orderId)
    .then(order => res.status(200).json(order))
    .catch(err => res.status(500).json(err));
});

// delete 
router.delete('/orders/:orderId', (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: 'Specified order id is not valid' });
    return;
  }

  Order.findByIdAndRemove(orderId)
    .then(() => res.json({ message: `Order with ${orderId} is removed successfully.` }))
    .catch(error => res.json(error));
});


module.exports = router;



