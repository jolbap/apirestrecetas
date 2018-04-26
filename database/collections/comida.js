const mongoose = require("../connect");
var comidaSchema = {
  name : String,
  descripcion : String,
  ingredients : String
};
var comida = mongoose.model("comida", comidaSchema);
module.exports = comida;
