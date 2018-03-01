# Yard-Sale Finder App

## Overview
The Yard Sailing app will help you find your next treasure and help you sail your way to upcoming yard sales.  The Yard Sailing app will also help you post your next yard sale for everyone to see.  You can also edit/update your post once you have already posted your yard sale.  The app will help you narrow your search according to the zipcode you enter.

## Functionality
Application is able to create a yard sale from user's input and post yard sale's heading, address, start and end times, and description of items selling.  Users are also able to edit their post and the app updates the user's post.  The user also can delete their yard sale post.  Users can search for yard sale posts when user enters a zip code.  Users can narrow their search based on the listed categories: yard sale, garage sale, and estate sale. 


## Technologies Used

- HTML and CSS (Front-end framework)
- Bootswatch: theme for Bootstrap
- Express.js (Server framework)
- Handlebars (Templating engine)
- Heroku (Cloud platform)
- JawsDB (Heroku database add-on)
- MySQL (RDBMS)
- Node.js (Javascript environment)
- Sequelize (ORM)

## Installation

To run the application locally, first clone this repository with the following commmand:
    
    git clone https://github.com/khalidmadih/Project2.git

Next, intall the application dependencies:
    
    npm install

Finally, run the node server locally:
    
    node server

Now, open the local application on port 8080 at the URL: 'http://localhost:8080/'

On Heroku app:

    go here: https://calm-eyrie-79069.herokuapp.com/

## Running the tests

Chai and Mocha are used to test the function and the function determines if the input are numbers.
