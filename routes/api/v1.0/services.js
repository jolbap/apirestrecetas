var express = require('express');
var router = express.Router();
var Comida = require("../../../database/collections/comida");

/*----------------RECETAS---------------*/

//Creacion de recetas
router.post("/comida", (req, res) => {
  if (req.body.name == "" && req.body.descripcion == "" && req.body.ingredients == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var comida = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredients : req.body.ingredients
  };
  var comidaData = new Comida(comida);

  comidaData.save().then( () => {
    res.status(200).json({
      "msn" : "receta registrado con exito "
    });
  });
});
module.exports = router;
