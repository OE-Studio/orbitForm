const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');


dotenv.config();
// create express app
const app = express();

//cors middleware
app.use(cors());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
app.use(express.urlencoded({
    extended: true
}))


// parse application/json
// app.use(bodyParser.json())
app.use(express.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "description": "signup form "
    });
});

require('./api/routes/routes.js')(app);

app.get('*', (req, res) => {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
})

const port = process.env.PORT || 3007;

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});