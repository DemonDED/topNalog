<template>
    <div>
        <div>
            <h1>Информация о пользователе</h1>
            <div>
                <div>
                    <label for="">Имя: </label><label for="">{{this.userData.name}}</label>
                </div>
                <div>
                    <label for="">Электронная почта: </label><label for="">{{this.userData.email}}</label>
                </div>
                <div>
                    <label for="">Адрес: </label><label for="">{{this.userData.address}}</label>
                </div>
                <div>
                    <label for="">Номер телефона: </label><label for="">{{this.userData.contact}}</label>
                </div>
                <div>
                    <label for="">ИНН: </label><label for="">{{this.userData.tin}}</label>
                </div>
            </div>
        </div>
        <div>
            <h1>Декларации</h1>
            <div v-for="item in this.taxData" :key="item">
                <div>
                  <label for="">Имя: </label> <label for="">{{item.userName}}</label>
                </div>
                <div>
                  <label for="">Тип: </label> <label for="">{{item.type}}</label>
                </div>
                <div>
                  <label for="">Содержание: </label> <label for="">{{item.text}}</label>
                </div>
                <div>
                  <label for="">Дата: </label> <label for="">{{item.date}}</label>
                </div>
            </div>
            <div>
                <input id="typeTax" type="text" placeholder="Тип декларации">
                <input id="infoTax" type="text" placeholder="Информация об имуществе, облагаемом налогами">
                <button @click="createTaxReporting">Добавить декларацию</button>
            </div>
        </div>
        <div>
            <h1>Платежи</h1>
            <div v-for="item in this.paymentData" :key="item">
                <div>
                  <label for="">Имя: </label> <label for="">{{item.userName}}</label>
                </div>
                <div>
                  <label for="">Сумма: </label> <label for="">{{item.sum}}</label>
                </div>
                <div>
                  <label for="">Дата: </label> <label for="">{{item.date}}</label>
                </div>
            </div>
            <div>
                <input id="sumPay" type="text" placeholder="Сумма платежа">
                <button @click="createPayment">Добавить платеж</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{
            userData: [],
            taxData: [],
            paymentData: [],
        }
    },
    mounted() {
        if (!document.cookie) {
            window.location.href = '/loginUser'
        } else {
            this.getUserInformation()
            this.getTaxReport()
            this.getUserPayments()
        }
    },
    methods: {
        getUserInformation() {
            axios.get(`http://90.189.211.207/getUserInformation?${document.cookie}`, {

            })
            .then((response) => {
                this.userData = response.data
            })
        },
        getTaxReport() {
            axios.get(`http://90.189.211.207/getTaxReporting?${document.cookie}`, {

            })
            .then((response) => {
                this.taxData = response.data
            })
        },
        getUserPayments() {
            axios.get(`http://90.189.211.207/getUserPayments?${document.cookie}`, {

            })
            .then((response) => {
                this.paymentData = response.data
            })
        },
        createTaxReporting() {
            const typeTax = document.querySelector('#typeTax');
            const informTax = document.querySelector('#infoTax');

            axios.post(`http://90.189.211.207/createTaxReporting`, {
                userName: this.userData.name,
                type: typeTax.value,
                text: informTax.value,
                date: new Date().getTime()
            })
            .then((response) => {
                console.log(response.data);
                this.getTaxReport()
            })
        },
        createPayment() {
            const sumPay = document.querySelector('#sumPay');

            axios.post(`http://90.189.211.207/createPayment`, {
                userName: this.userData.name,
                sum: sumPay.value,
                date: new Date().getTime()
            })
            .then((response) => {
                console.log(response.data)
                this.getUserPayments()
            })
        },
    },
}
</script>