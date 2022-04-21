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

async function createUser(data) {
    console.log(data);
    const select = `SELECT * FROM users WHERE name=$1`;
    const insert = `INSERT INTO users(name, password, email, access_level, address, contact, tin)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const values = [data.userName, data.password, data.email, data.accessLevel, data.address, data.contact, data.tin];
    
    try {
        const selectResult = await client.query(select, [data.userName]);

        if (selectResult.rows.length > 0) {
            return 'User with this name already exist';
        } else {
            client.query(insert, values);

            return `Created user with name ${data.userName}`;
        }
    } catch(err) {
        return err.stack;
    }
}

exports.getUserInformation = getUserInformation;
exports.createUser = createUser;
