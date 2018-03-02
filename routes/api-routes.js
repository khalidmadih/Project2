// *********************************************************************************
// api-routes.js - this file sets up all of the api call routes to the database
// *********************************************************************************

// Dependencies
// =============================================================

// This section creates a variable and requires the models folder to access the files within that folder.
var db = require("../models");

// This section sets up all of the get routes used to pull and post information to the database.
// =============================================================
module.exports = function(app) {

  // This section creates the GET route for getting all information from the yardsale table.
  app.get("/api/yardsales/", function(req, res) {
    db.Yardsale.findAll({})
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  // This section creates a Get route for returning yardsale posts of the category column.
  app.get("/api/yardsales/category/:category", function(req, res) {
    db.Yardsale.findAll({
      where: {
        category: req.params.category
      }
    })
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  //This section creates a Get route for returning yardsale posts of the zip column.
  app.get("/api/yardsales/zip/:zip", function(req, res) {
    db.Yardsale.findAll({
      where: {
        zip: req.params.zip
      }
    })
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  // This section creates a Get rotue for retrieving single yardsale posts by id.
  app.get("/api/yardsales/:id", function(req, res) {
    db.Yardsale.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  //This section creates a POST route for saving a new yardsale post.
  app.post("/api/yardsales", function(req, res) {
    console.log(req.body);
    db.Yardsale.create({

      submitterName : req.body.submitterName,
      yardDate: req.body.yardDate,
      startTime : req.body.startTime,
      endTime : req.body.endTime,
      description : req.body.description,
      address: req.body.address,
      city : req.body.city,
      state : req.body.state,
      zip : req.body.zip,
      email : req.body.email,
      secretCode: req.body.secretCode,
      category: req.body.category
      
    })
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  // This section creates a DELETE route for deleting yardsale posts by id.
  app.delete("/api/yardsales/:id", function(req, res) {
    db.Yardsale.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  // This section creats a PUT route that allows the user to update a yardsale post.
  app.put("/api/yardsales", function(req, res) {
    db.Yardsale.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });
};