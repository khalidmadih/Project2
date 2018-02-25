// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

  app.get("/addSale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addSale.html"));
  });

  // sale route loads sale.html
  app.get("/sale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/sale.html"));
  });

};
