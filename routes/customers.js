const Customer = require("../models/customer");
const Joi = require("joi");
const express = require("express");
const Genre = require("../models/genre");
const router = express.Router();

const validateCustomer = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
  });

  return schema.validate(customer);
};

router.get("/", async (req, res) => {
  const result = await Customer.find().sort("name");
  res.status(200).send(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Customer.find({ _id: id }).sort("name");
  if (!result) return res.status(400).send("Invalid ID.");

  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { isGold, name, phone } = req.body;
  const newCustomer = new Customer({ isGold, name, phone });

  const result = await newCustomer.save();

  res.status(200).send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!result) return res.status(200).send(result);

  res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const result = await Genre.findByIdAndRemove({ _id: req.params.id });
  if (!result) return res.status(400).send("Invalid ID.");
  res.status(200).send(result);
});

module.exports = router;