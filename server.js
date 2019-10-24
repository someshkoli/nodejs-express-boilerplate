const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    routes = require('./routes/routes');

const app = express();

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

// for local development
mongo_uri = 'mongodb://localhost/localdb';
// for production
// mongo_uri = process.env.DATABASE_URL;

mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(console.log);

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

app.use("/routes/", routes);

//=======================
// STARTING THE SERVER
//=======================

app.get('/', (req, res) => {
    res.send('Works')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('App listening on port ' + port);
});