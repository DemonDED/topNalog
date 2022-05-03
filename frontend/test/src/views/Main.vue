<template>
    <div class="main">
        <header>
            <h1><span class="blue-text">Топ</span>Nalog</h1>
            <img src="../assets/Vector.png"  alt="Выйти из учетной записи" id="exit" @click="exit"/>
        </header>
        <div class="flex-center">
        <div  class='block-information-1'>
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
        </div>
        <div class="flex-row">
        <div class='block-information'>
            <h1>Декларации</h1>
            <div v-for="item in this.taxData" :key="item" class="content">
                <div>
                  <label for="">Тип: </label> <label for="">{{item.type}}</label>
                </div>
                <div>
                  <label for="">Информация: </label> <label for="">{{item.text}}</label>
                </div>
                <div>
                  <label for="">Дата: </label> <label for="">{{item.date}}</label>
                </div>
            </div>
            <div>
                <input id="typeTax" type="text" placeholder="Тип декларации">
                <input id="infoTax" type="text" placeholder="Информация">
                <button @click="createTaxReporting">Добавить декларацию</button>
            </div>
        </div>
        <div class='block-information'>
            <h1>Платежи</h1>
            <div v-for="item in this.paymentData" :key="item" class="content">
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
            publicPath: process.env.BASE_URL,
            // taxDate: null,
            // paymentDate: null,
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
                this.taxData = response.data;
                // this.taxDate = new Date(response.data.date);
            })
        },
        getUserPayments() {
            axios.get(`http://90.189.211.207/getUserPayments?${document.cookie}`, {

            })
            .then((response) => {
                this.paymentData = response.data
                // this.paymentDate = new Date(response.data.date);
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
        exit() {
            document.cookie = 'userName=;max-age=-1;';
            window.location.href = '/loginUser';
        },
    },
}
</script>

<style scoped>
    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        background: #0072E5;
        width: 100%;
    }
    header > h1 {
        color: white;
    }
    .blue-text {
        color: #81B9FB;;
    }
    .block-information {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: white;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        margin: 10px;
        width: 30%;
        padding: 3em;
    }
    .block-information-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: white;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        margin: 10px;
        width: 66%;
        padding: 3em;
    }
    button {
        display: flex;
        flex-direction: row;
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
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 0px 0px 10px;
        position: static;
width: 462px;
height: 50px;
border: 1px solid #BEB9B9;
box-sizing: border-box;
border-radius: 5px
    }
    .flex-row, .flex-center {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: row;
        width: 100%;
    }
    .content {
        border-bottom: 1px solid #BEB9B9;
        border-top: 1px solid  #BEB9B9;
        margin-bottom: 35px;
        padding: 10px;
        text-align: start;
    }
    #exit {
        cursor: pointer;
    }
</style>