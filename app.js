require("dotenv").config();
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
    
  })
  .catch((err) => console.log(err));
