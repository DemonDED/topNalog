<template>
  <div>
    <router-view v-slot="{Component}">
      <component :is="Component"/>
    </router-view>
  </div>
</template>

<script>
import axios from 'axios';
import Auth from './views/Authorize.vue'

export default {
  name: 'App',
  components: {
    Auth
  },
  data() {
    return {
      cookie: null,
    }
  },
  methods: {
    authorization() {
      
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
