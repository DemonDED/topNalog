<template>
    <div>
      <div>
        <label for="">Регистарция</label>
        <input id="userName" type="text" placeholder="Имя пользователя">
        <input id="email" type="email" placeholder="Почта">
        <input id="address" type="text" placeholder="Адрес">
        <input id="contact" type="text" placeholder="Контакт">
        <input id="tin" type="text" placeholder="ИНН">
        <input id="password" type="password" placeholder="Пароль">
        <button @click="registrationUser">Создать пользователя</button>
      </div>
      <div>
        <input type="button" value="Уже есть аккаунт?" @click="goLogin">
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