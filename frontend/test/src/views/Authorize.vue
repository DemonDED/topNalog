<template>
  <div class="hello">
    <div class="hello-content">
    <div>
      <h1>Авторизация</h1>
    </div>
      <input class="userName" type="text" placeholder="Имя пользователя">
      <input class="password" type="password" placeholder="Пароль">
      <button @click="loginUser">Войти</button>
        <div>
          <button @click="goRegistration">Создать новый аккаунт</button>
        </div>
    </div>
  </div>
</template>

<script scope>
import axios from 'axios';


export default {
  data() {
    return {
    }
  },
 methods: {
   loginUser() {
    const userName = document.querySelector('.userName');
    const password = document.querySelector('.password');

    axios.post('http://90.189.211.207/login', {
      userName: userName.value,
      password: password.value,
    })
    .then((response) => {
      if (response) {
        document.cookie = `userName=${userName.value};max-age=999999;`;
        window.location.href = '/';
      }
    })


   },
   goRegistration() {
     window.location.href = '/registration'
   },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .hello-content {
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
 }
 .hello {
   position: relative;
   top: 15em;
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
</style>
