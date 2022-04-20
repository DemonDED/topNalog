const xhr = new XMLHttpRequest();
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const email = document.getElementById('email');
const addres = document.getElementById('addres');
const tin = document.getElementById('tin');

let data = `{"userName": "${FIO.value}", "password": "${password.value}", "email": "${email.value}", "addres": "${addres.value}", "tin": "${tin.value}"}`;

xhr.open('POST', '', true);
xhr.onload = () => {
    if (xhr.status == 200) {

    }
}
xhr.send(data);