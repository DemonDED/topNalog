const { Client } = require('pg');

const connectionString = 'postgres://postgres:1234@localhost:5432/tax_inspection';
const client = new Client({
    connectionString: connectionString
});

client.connect();

async function getUserInformation(userName) {
    const select = 'SELECT * FROM users WHERE name=$1';
    try {
        return (await client.query(select, [userName])).rows[0];
    } catch(err) {
        return err.stack;
    }
}

exports.getUserInformation = getUserInformation;
