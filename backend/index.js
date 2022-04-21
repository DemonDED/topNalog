const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const postgres = require('./pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Content-Type', 'application/json')
    next();
});
app.use(cors());
// if(queryObject.pathname == '/login') {}

app.get('/getUserInformation', async (req, res) => {
    const userName = req.query.userName;
    const result = await postgres.getUserInformation(userName);

    res.status(200).send(result);
});

app.post('/createUser', async (req, res) => {
    console.log(req.body);
    if (req.body.userName === undefined) {
        res.status(200).send('Empty body');
    } else {
        const result = await postgres.createUser(req.body);
        res.status(200).send(result);
    }
});

// if(queryObject.pathname === '/createTaxReporting') {}

// if(queryObject.pathname === '/getTaxReporting') {}

app.listen(80, () => console.log(`Server listening on port: 80`));
