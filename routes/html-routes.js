// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// This section states the Dependencies used in this file
// =============================================================
var path = require("path");

// This section outlines the Routes for the different html pages.
// =============================================================
module.exports = function(app) {

    // This section sets up the route which sends the user to the sale.html page when "/" is loaded.
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

  //This section sets up the route that sends the user to the addSale.html file when "/addSale" is loaded.
  app.get("/addSale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addSale.html"));
  });

  // This section sets up the sale route which loads the sale.html file.
  app.get("/sale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

};
