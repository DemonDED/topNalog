const userName = document.getElementById('userName');
const password = document.getElementById('password');
const contact = document.querySelector('#contact');
const email = document.getElementById('email');
const addres = document.getElementById('addres');
const tin = document.getElementById('tin');
const login = document.querySelector('#login');
const sendData = document.querySelector('#sendData');

async function createUser() {

    let createUserData = `{"userName": "${userName.value}", "password": "${password.value}", "email": "${email.value}","accessLevel": "1", "address": "${addres.value}", "contact": "${contact.value}", "tin": "${tin.value}"}`;
    let response = await fetch('http://90.189.211.207/createUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: createUserData
    });
    let result = await response.json();
    if (result) {
        window.location.href = '/userCabinet.html';
    } else {
        alert('Ошибка при создании пользователя');
    }
}

function loginEvent() {
    window.location.href = '/login.html';
}

sendData.addEventListener('click', createUser);
login.addEventListener('click', loginEvent);