const mongoose = require("../connect");
var ingredientsSchema = {
  name : String,
  kcal : Number,
  peso : Number
};
var ingredients = mongoose.model("ingredients", ingredientsSchema);
module.exports = ingredients;
