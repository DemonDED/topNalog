const http = require('http');
const url = require('url');

const postgres = require('./pg');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': 'application/json'
};

const server = http.createServer(async(req, res)=> {

    const queryObject = url.parse(req.url, true);
    
    // if(url == '/createUser') {}
    // if(url == '/login') {}

    if(queryObject.pathname === '/getUserInformation') {
        const userName = queryObject.query.userName;
        const userInformation = await postgres.getUserInformation(userName);

        res.writeHead(200, headers);
        res.end(JSON.stringify(userInformation));
    }

    if(queryObject.pathname === '/createTaxReporting') {}

    if(queryObject.pathname === '/getTaxReporting') {}

});

server.listen(80, () => console.log(`Server listening on port: 80`));
