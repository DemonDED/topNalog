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
body {
  margin: 0;
  padding: 0;
  background: #E5E5E5;;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #797979;
}

</style>
