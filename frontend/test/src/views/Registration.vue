<template>
    <div class="reg-main">
      <div class="reg">
      <div>
        <h1>Регистарция</h1>
      </div>
        <div class="blockInput">
        <input id="userName" type="text" placeholder="Имя пользователя">
        </div>
        <div class="blockInput">
        <input id="email" type="email" placeholder="Почта"> 
        </div>
        <div class="blockInput">
        <input id="address" type="text" placeholder="Адрес"> 
        </div>
        <div class="blockInput">
        <input id="contact" type="text" placeholder="Номер телефона"> 
        </div>
        <div class="blockInput">
        <input id="tin" type="text" placeholder="ИНН"> 
        </div>
        <div class="blockInput">
        <input id="password" type="password" placeholder="Пароль"> 
        </div>
        <button @click="registrationUser">Создать пользователя</button>
      </div>
      <div>
        <button @click="goLogin">Уже есть аккаунт?</button>
      </div>
      <div class="error">{{report}}</div>
      <div>{{dataTest}}</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
          report: null,
          dataTest: null,
        }
    },
    methods: {
        registrationUser() {
          const userName = document.querySelector('#userName');
          const password = document.querySelector('#password');
          const email = document.querySelector('#email');
          const address = document.querySelector('#address');
          const contact = document.querySelector('#contact');
          const tin = document.querySelector('#tin');

          axios.post('http://90.189.211.207/createUser', {
            userName: userName.value,
            password: password.value,
            email: email.value,
            accessLevel: '1',
            address: address.value,
            contact: contact.value,
            tin: tin.value
          })
          .then((response) => {
            this.dataTest = response
            this.report = JSON.parse(response.data);
            if (this.report.result === 'Пользователь создан') {
              document.cookie = `userName=${userName.value};max-age=9999999;`;
              window.location.href = '/';
            } else {
              alert('Ошибка сервера');
            }
          })
          .catch((error) => {
            this.report = error.response.data.result;
          })
        },
        goLogin() {
          window.location.href = '/loginUser'
        },

    }
}
</script>

<style scoped>

.blockInput {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 462px;
  height: 50px;
  background: #0072E5;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
input {
padding: 0px 0px 0px 10px;
width: 300px;
height: 50px;
border: 1px solid #BEB9B9;
box-sizing: border-box;
border-radius: 5px;
background: none;
font-size: 20px;
margin: 5px;
}
.reg-main {
  display: flex;
  justify-content: center;
  align-content: space-around;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 10em;
}
.reg {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  flex-direction: column;
}
.error { 
  color: red;
}
</style>