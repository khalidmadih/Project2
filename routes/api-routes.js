// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/yardsales/", function(req, res) {
    db.Yardsale.findAll({})
    .then(function(dbYardsale) {
      res.json(dbYardsale);
    });
  });

  // Get route for returning posts of a specific category
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

  // Get rotue for retrieving a single post
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

  // POST route for saving a new post
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

  // DELETE route for deleting posts
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

  // PUT route for updating posts
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
