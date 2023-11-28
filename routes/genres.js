const Joi = require("joi");

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
router.get("/", (req, res) => {
  res.send(genres);
});

// Get genere by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("Genre not found!");

  res.status(200).send(genre);
});

// Create a genre
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(newGenre);

  res.status(200).send(newGenre);
});

// Update genre put
router.put("/:id", (req, res) => {
  // valdiate name
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === id);

  if (!genre) return res.status(400).send("Invalid ID given.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name;
  res.status(200).send(genre);
});

// delete genre
router.delete("/:id", (req, res) => {
  // Get id
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("Invalid id");

  // find genre index in array
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.status(200).send(genre);
});

module.exports = router;
