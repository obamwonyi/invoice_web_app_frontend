<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="wrapper">
    <nav class = 'navbar is-dark'>
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Invoice Home</strong></router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <template>
            <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
          </template>
        </div>
      </div>
    </nav>


    <section>
      <RouterView />
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2024</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import { userState } from './router';

export default {
  name: 'App',
  
  beforeCreate()
  {

    const store = userState();

    store.initializeStore();

    const token = store.token;

    if (token)
    {
      axios.defaults.headers.common['Authorization'] = "Token" + token
    }
    else
    {
      axios.defaults.headers.common['Authorization'] = ""
    }
  }
}
</script>

<style >
@import url('../node_modules/bulma/bulma.sass');
</style>
