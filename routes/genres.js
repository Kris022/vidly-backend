const Joi = require("joi");
// import genre model
const Genre = require("../models/genre");

const express = require("express");
const router = express.Router();

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
];

// Get all genres
router.get("/", async (req, res) => {
  // Add pagination?
  const result = await Genre.find().sort("name");

  res.status(200).send(result);
});

// Get single genere by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = Genre.findById({ _id: id });
  if (!result) return res.status(404).send("Genre not found!");

  res.status(200).send(result);
});

// Create a genre
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const newGenre = new Genre({
      name: req.body.name,
    });

    const result = await newGenre.save();

    res.status(200).send(result);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
    res.status(400).send("Database error.");
  }
});

// Update genre put
router.put("/:id", async (req, res) => {
  // valdiate name
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const result = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } }
  );

  if (!result) return res.status(400).send("Invalid ID given.");

  res.status(200).send(result);
});

// delete genre
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Genre.findByIdAndRemove({ _id: id });
  if (!result) return res.status(404).send("Invalid ID.");

  res.status(200).send(result);
});

module.exports = router;
