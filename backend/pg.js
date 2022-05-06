const { Client } = require('pg');

const connectionString = 'postgres://postgres:1234@localhost:5432/tax_inspection';
const client = new Client({
    connectionString: connectionString
});

client.connect();

async function createUser(data, response) {
    console.log(`createUser with data: ${JSON.stringify(data)}`);
    const select = `SELECT * FROM users WHERE name=$1`;
    const insert = `INSERT INTO users(name, password, email, access_level, address, contact, tin)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const values = [data.userName, data.password, data.email, data.accessLevel, data.address, data.contact, data.tin];

    if (data.userName === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствует имя пользователя"}));
    } else if (data.email === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствует почта"}));
    } else if (data.accessLevel === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствует уровень доступа"}));
    } else if (data.address === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствует адрес"}));
    } else if (data.contact === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствуют контакты"}));
    } else if (data.tin === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствует ИНН"}));
    } else if (data.password === '') {
        response.status(400).send(JSON.stringify({"result":"Отсутствует пароль"}));
    } else if (isNaN(data.tin)) {
        response.status(400).send(JSON.stringify({"result":"ИНН должен содержать только цифры"}));
    } else if (data.tin.length > 12) {
        response.status(400).send(JSON.stringify({"result":"ИНН не должен содержать больше 12 цифр"}));
    } else {
        try {
            const selectResult = await client.query(select, [data.userName]);
    
            if (selectResult.rows.length > 0) {
                response.status(400).send(JSON.stringify({"result": "Пользователь с таким именем уже существует"}));
            } else {
                const result = await client.query(insert, values);
                if (result.rowCount === 1) {
                    response.status(200).send(JSON.stringify({"result": "Пользователь создан"}));
                } else {
                    response.status(400).send(JSON.stringify({"result": "Пользователь не был создан. Проверьте отправляемые данные."}));
                }
                
            }
        } catch(err) {
            console.log(err);
            response.status(500).send(JSON.stringify({"result": "Ошибка на сервере"}));
        }
    }
}

async function login(data, response) {
    console.log(`login with data: ${JSON.stringify(data)}`);
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
        response.status(500).send(JSON.stringify({"result": "Ошибка сервера"}));
    }
}

async function getUserInformation(userName, response) {
    console.log(`getUserInformation with userName: ${userName}`);
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
        response.status(500).send(JSON.stringify({"result": "Ошибка сервера"}));
    }
}

async function createTaxReporting(data, response) {
    console.log(`createTaxReporting with data: ${JSON.stringify(data)}`);
    const insert = `INSERT INTO tax_reporting(name, type, text, date)
                    VALUES ($1, $2, $3, $4);`;
    try {
        const result = await (await client.query(insert, [data.userName, data.type, data.text, data.date]));

        if (result.rowCount === 1) {
            response.status(200).send(JSON.stringify({"result": "Декларация создана"}));
        } else {
            response.status(400).send(JSON.stringify({"result": "Декларация не создана. Проверьте отправляемые данные."}));
        }
    } catch(error) {
        console.log(error);
        response.status(500).send(JSON.stringify({"result": "Ошибка сервера"}));
    }
}

async function getTaxReporting(userName, response) {
    console.log(`getTaxReportiing with userName: ${userName}`);
    const select = `SELECT name, type, text, date FROM tax_reporting WHERE name=$1;`;
    try {
        const result = (await client.query(select, [userName])).rows;

        if(result === undefined) {
            response.status(400).send(JSON.stringify({"result": "Декларации у данного пользователя не найдены"}));
        } else {
            response.status(200).send(JSON.stringify(result));
        }
    } catch(error) {
        console.log(error);
        response.status(500).send(JSON.stringify({"result": "Ошибка сервера"}));
    }
}

async function createPayment(data, response) {
    console.log(`createPayment with data: ${JSON.stringify(data)}`);
    const insert = `INSERT INTO payments (name, sum, date) VALUES ($1, $2, $3);`;
    if (isNaN(data.sum)) {
        response.status(400).send(JSON.stringify({"result": "Сумма платежа должна содержать только цифры"}));
    } else if (isNaN(data.date)) {
        response.status(400).send(JSON.stringify({"result": "Дата должна быть в миллисекундах"}));
    } else {
        try {
            const result = await (await client.query(insert, [data.userName, data.sum, data.date]));
    
            if (result.rowCount === 1) {
                response.status(200).send(JSON.stringify({"result": "Платеж создан"}));
            } else {
                response.status(400).send(JSON.stringify({"result": "Платеж не создан. Проверьте отправляемые данные"}));
            }
        } catch(error) {
            console.log(error);
            response.status(500).send(JSON.stringify({"result": "Ошибка сервера"}));
        }
    }
}

async function getUserPayments(userName, response) {
    console.log(`getUserPayments with name: ${userName}`);
    const select = `SELECT name, sum, date FROM payments WHERE name=$1;`;

    try {
        const result = (await client.query(select, [userName])).rows;

        if(result === undefined) {
            response.status(400).send(JSON.stringify({"result": "Платежи данного пользователя не найдены"}));
        } else {
            response.status(200).send(JSON.stringify(result));
        }
    } catch(error) {
        console.log(error);
        response.status(500).send(JSON.stringify({"result": "Ошибка сервера"}));
    }
}

module.exports = {
    getUserInformation,
    createUser,
    login,
    createTaxReporting,
    getTaxReporting,
    createPayment,
    getUserPayments
}