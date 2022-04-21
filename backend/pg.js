const { Client } = require('pg');

const connectionString = 'postgres://postgres:1234@localhost:5432/tax_inspection';
const client = new Client({
    connectionString: connectionString
});

client.connect();

async function createUser(data, response) {
    const select = `SELECT * FROM users WHERE name=$1`;
    const insert = `INSERT INTO users(name, password, email, access_level, address, contact, tin)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const values = [data.userName, data.password, data.email, data.accessLevel, data.address, data.contact, data.tin];
    
    try {
        const selectResult = await client.query(select, [data.userName]);

        if (selectResult.rows.length > 0) {
            response.status(400).send(JSON.stringify({"result": "User already exist"}));
        } else {
            const result = await client.query(insert, values);
            if (result.rowCount === 1) {
                response.status(200).send(JSON.stringify({"result": "User created"}));
            } else {
                response.status(400).send(JSON.stringify({"result": "Не создался пользователь. Почему? Я хуй знает"}));
            }
            
        }
    } catch(err) {
        response.status(500).send(JSON.stringify({"result": "На сервере какая-то ошибка, я хуй знает"}));
    }
}

async function login(data, response) {
    const select = `SELECT password FROM users WHERE name=$1;`;
    try {
        const result = await (await client.query(select, [data.userName])).rows[0];

        if(result === undefined) {
            response.status(400).send(JSON.stringify({"result": "Пользователь с таким именем не найден"}));
        } else if (result.password === data.password) {
            response.status(200).send(JSON.stringify({"result": "Авторизация успешна"}));
        } else {
            response.status(400).send(JSON.stringify({"result": "Неверный пароль"}));
        }
    } catch(error) {
        response.status(500).send(JSON.stringify({"result": "На сервере какая-то ошибка, я хуй знает"}));
    }
}

async function getUserInformation(userName, response) {
    const select = 'SELECT * FROM users WHERE name=$1';
    try {
        const result =  await (await client.query(select, [userName])).rows[0];
        if(result === undefined) {
            response.status(400).send(JSON.stringify({"result": "Пользователь с таким именем не найден"}));
        } else {
            response.status(200).send(JSON.stringify(result));
        }
    } catch(error) {
        console.log(error);
        response.status(500).send(JSON.stringify({"result": "На сервере какая-то ошибка, я хуй знает"}));
    }
}


exports.getUserInformation = getUserInformation;
exports.createUser = createUser;
exports.login = login;