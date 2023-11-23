const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
];

// require('doteng').config();
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Working with nodemon')
})

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
