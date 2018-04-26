var express = require('express');
var router = express.Router();
var _ = require("underscore");
var Comida = require("../../../database/collections/comida");
var Ingredients = require("../../../database/collections/ingredients");

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

// muestra todas las recetas
router.get("/comida", (req, res, next) => {
  Comida.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

// lee solo una receta
router.get(/comida\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Comida.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }
    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});

//elimina recetas
router.delete(/comida\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Comida.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualiza todos los datos de la receta
router.put(/comida\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'descripcion', 'ingredients'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "no cambio todos los datos de la receta"
    });
    return;
  }
  var comida = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredients : req.body.ingredients
  };
  Comida.findOneAndUpdate({_id: id}, comida, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

//actualiza algunos datos de la receta
router.patch(/comida\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var comida = {};
  for (var i = 0; i < keys.length; i++) {
    comida[keys[i]] = req.body[keys[i]];
  }
  Comida.findOneAndUpdate({_id: id}, comida, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

/*----------------INGREDIENTS---------------*/

//Creacion de ingredientes
router.post("/ingredients", (req, res) => {
  if (req.body.name == "" && req.body.kcal == "" && req.body.peso == "" ) {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var ingredients = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };
  var ingredientsData = new Ingredients(ingredients);

  ingredientsData.save().then( () => {
    res.status(200).json({
      "msn" : "Ingrediente registrado con exito "
    });
  });
});

// muestra todos los ingredientes
router.get("/ingredients", (req, res, next) => {
  Ingredients.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

// lee solo un ingredientes
router.get(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredients.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }
    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});

//elimina ingrediente
router.delete(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredients.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualiza todos los datos de los ingredientes
router.put(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'kcal', 'peso'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "no cambio todos los datos de los ingredientes"
    });
    return;
  }
  var ingredients = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };
  Ingredients.findOneAndUpdate({_id: id}, ingredients, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

//actualiza algunos datos de los ingredientes
router.patch(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var ingredients = {};
  for (var i = 0; i < keys.length; i++) {
    ingredients[keys[i]] = req.body[keys[i]];
  }
  Ingredients.findOneAndUpdate({_id: id}, ingredients, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

module.exports = router;
