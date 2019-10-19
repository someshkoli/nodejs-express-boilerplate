require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    authRoutes = require('./routes/authRoutes'),
    userRoutes = require('./routes/userRoutes'),
    ticketRoutes = require('./routes/ticketRoutes'),
    eventRoutes = require('./routes/eventRoutes'),
    volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();
// const doit = require('./seed');
//=======================
// MIDDLEWARE
//=======================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//=======================
// DATABASE CONFIG
//=======================

let mongo_uri;

if (process.env.LOCALDEV === 'true') {
    // mongo_uri = 'mongodb://localhost/perfest';
} else {
    mongo_uri = process.env.DATABASE_URL;
}

mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Database connected"))
    .catch(console.log);
// doit();
//=======================
// ALLOW-CORS
//=======================
// For development
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

//=======================
// ROUTES
//=======================


//=======================
// STARTING THE SERVER
//=======================

app.get('/', (req, res) => {
    res.send('Works')
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('App listening on port ' + port);
});