<template>
    <div>
        <div>
            <h1>Информация о пользователе</h1>
        </div>
        <div>
            <h1>Документы</h1>
        </div>
        <div>
            <h1>Платежи</h1>
        </div>
        <div>
            <h1>Добавить платеж</h1>
        </div>
        <div>
            <h1>Добавить документ</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    mounted() {
        if (!document.cookie) {
            window.location.href = '/loginUser'
        } else {
            getUserInformation()
        }
    },
    methods: {
        getUserInformation() {

        }
    },
}
</script>