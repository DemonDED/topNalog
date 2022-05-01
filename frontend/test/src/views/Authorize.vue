<template>
  <div class="hello">
    <div>
      <label for="">Авторизация</label>
      <input class="userName" type="text" placeholder="Имя пользователя">
      <input class="password" type="password" placeholder="Пароль">
      <button @click="loginUser">Войти</button>
        <div>
          <input type="button" value="Создать новый аккаунт" @click="goRegistration">
        </div>
    </div>
  </div>
</template>

<script scope>
import axios from 'axios';


export default {
  data() {
    return {
      goRegistrationCounter: false,
      goLoginCounter: true,
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
    .then(function (response) {
      if (response.length > 10) {
        window.location.href = '/'
      }
    })


   },
   goRegistration() {
     window.location.href = '/regisration'
   },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
