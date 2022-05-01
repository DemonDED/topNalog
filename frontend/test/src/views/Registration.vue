<template>
    <div>
      <div>
        <label for="">Регистарция</label>
        <input type="text" placeholder="Имя пользователя">
        <input type="email" placeholder="Почта">
        <input type="text" placeholder="Адрес">
        <input type="text" placeholder="Контакт">
        <input type="text" placeholder="ИНН">
        <input type="password" placeholder="Пароль">
        <button @click="registrationUser">Войти</button>
      </div>
      <div>
        <input type="text" value="Уже есть аккаунт?" @click="goLogin">
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        registrationUser() {

        },
        goLogin() {
          window.location.href = '/loginUser'
        },

    }
}
</script>