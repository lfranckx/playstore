const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // initialize express

// mount morgan and cors to app
app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore-data.js'); // import playstore-data

// Build an Express server with a GET endpoint /apps
// By default return the complete list of apps in the array
// The endpoint accepts the following optional query parameters:
// sort = 'rating' or 'app'
// genres = one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
app.get('/apps', (req, res) => {
    let { sort , genres } = req.query; // initialize sort and genres from query
    // validate that sort is equal to rating or app
    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res.status(400).send('Sort must be one of Rating or App')
        }
    }
    // validate that genres is one of given options above
    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }
    // if all validations are met run results
    // sort by app name or rating
    if (sort) {
        apps.sort((a, b) => {
            return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
        }) 
    }
    // filter the list to contain only given value
    if (genres) {
        // console.log(apps);
        console.log(genres);
        // had to use a new variable because apps is a const variable.  The 
        let filteredApps = apps.filter(app => 
            // console.log(app.Genres)
            app.Genres.includes(genres)
        )
        res.json(filteredApps)
    }
    // console.log(apps)
    res.json(apps)
});

module.exports = app;