const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Order = require("../models/orderDetails");

module.exports = router;

// Get all
router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

// Creating one
router.post("/", async (req, res) => {
  const order = new Order({
    paperId: req.body.paperId,
    deadline: req.body.deadline,
    pages: req.body.pages,
    instructions: req.body.instructions,
    costPerPage: req.body.costPerPage,
    assigned: req.body.assigned,
    attachments: req.body.attachments,
    completed: req.body.completed,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Updating one
router.patch("/:id", getOrder, async (req, res) => {
  if (req.body.paperId != null) {
    res.order.paperId = req.body.paperId;
  }
  if (req.body.pages != null) {
    res.order.pages = req.body.pages;
  }
  if (req.body.instructions != null) {
    res.order.instructions = req.body.instructions;
  }
  if (req.body.costPerPage != null) {
    res.order.costPerPage = req.body.costPerPage;
  }
  if (req.body.deadline != null) {
    res.order.deadline = req.body.deadline;
  }
  if (req.body.assigned != null) {
    res.order.assigned = req.body.assigned;
  }
  if (req.body.completed != null) {
    res.order.completed = req.body.completed;
  }
  try {
    updatedOrders = await res.order.save();
    res.json(updatedOrders);
  } catch (e) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);

    if (order == null) {
      return res.status(404).json({
        message: "order not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  res.order = order;
  next();
}
