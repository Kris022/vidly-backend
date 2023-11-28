const mongoose = require("mongoose");

// Create schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
});

// Create the model, text then schema
const Genre = mongoose.model("Genre", genreSchema);

// Export model
module.exports = Genre;
