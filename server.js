// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server for the application.
//
// ******************************************************************************
// This section displays the dependencies used for this file.
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// This section sets up the Express App as well as the port for the application.
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// This section requires the models folder.
var db = require("./models");

// This section sets up the use of the Express app to handle data parsing.

// This section sets up the use of the body- parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// It also sets up the parse application/json.
app.use(bodyParser.json());

// This section sets up the use of the Static directory
app.use(express.static("public"));

// This section sets up the use of the Routes.
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// This section sets up the syncing of the sequelize models and also starts the Express app.
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

