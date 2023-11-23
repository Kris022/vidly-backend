const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
];

// require('dotenv').config();
const Joi = require("joi");

const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Working with nodemon");
});

// Get all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Create a genre
app.post("/api/genres/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(newGenre);

  res.status(200).send(newGenre);
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}
