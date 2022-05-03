<template>
    <div class="reg-main">
      <div class="reg">
      <div>
        <h1 >Регистарция</h1>
      </div>
        <input id="userName" type="text" placeholder="Имя пользователя">
        <input id="email" type="email" placeholder="Почта">
        <input id="address" type="text" placeholder="Адрес">
        <input id="contact" type="text" placeholder="Номер телефона">
        <input id="tin" type="text" placeholder="ИНН">
        <input id="password" type="password" placeholder="Пароль">
        <button @click="registrationUser">Создать пользователя</button>
      </div>
      <div>
        <button @click="goLogin">Уже есть аккаунт?</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {

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
            if (response) {
              document.cookie = `userName=${userName.value};max-age=9999999;`;
              window.location.href = '/';
            } else {
              alert('Ошибка сервера');
            }
          })
        },
        goLogin() {
          window.location.href = '/loginUser'
        },

    }
}
</script>

<style scoped>
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
</style>