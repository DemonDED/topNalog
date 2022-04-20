const http = require('http');

const postgres = require('./pg');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': 'application/json'
};

const server = http.createServer(async(req, res)=> {
    console.log(`req: ${req.url}`);
    const url = req.url;
    
    if(url == '/createUser') {}

    if(url == '/login') {}

    if(url.match(/getUserInformation\/(.*)/) !== null) {
        const userName = url.match(/\b(?!getUserInformation\b)\w+/)[0];
        const userInformation = await postgres.getUserInformation(userName);
        

        res.writeHead(200, headers);
        res.end(JSON.stringify(userInformation));
    }

    if(url == '/createTaxReporting') {}

    if(req.url?.match(/getTaxReporting\/(.*)/) !== null) {}
});

server.listen(80, () => console.log(`Server listening on port: 80`));
