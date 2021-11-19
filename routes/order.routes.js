const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/isLoggedIn');
const Order = require("../models/Order.model");
const User = require("../models/User.model");

// create order
router.post('/orders', isLoggedIn, (req, res, next) => {
  console.log(req.body)
  const { itemsOrdered } = req.body;
  Order.create({
    owner: req.session.user,
    itemsOrdered,
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

// get the order from DB
router.get('/orders', (req, res, next) => {
  Order.find()
    .populate('owner')
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

  // Order.findById(orderId)
  //   .populate({
  //     path: 'itemsOrdered',
  //     populate: {
  //       path: 'productId'
  //     }
  //   })
  Order.findById(orderId)
    .populate({
      path: 'itemsOrdered.productId',
    })

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



