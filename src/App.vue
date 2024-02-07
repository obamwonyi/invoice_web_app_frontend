<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import axios from 'axios';
import { userState } from './router';

const store = userState();

store.initializeStore();

const token = store.token;

if (token) {
  axios.defaults.headers.common['Authorization'] = "Token" + token;
} else {
  axios.defaults.headers.common['Authorization'] = "";
}
</script>


<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Invoicely</strong></router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="store.isAuthenticated">
            <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
            <router-link to="/dashboard/clients" class="navbar-item">Clients</router-link>
            <router-link to="/dashboard/invoices" class="navbar-item">Invoices</router-link>

            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/dashboard/invoices/add" class="button is-success">Add invoice</router-link>
                <router-link to="/dashboard/my-account" class="button is-light">My account</router-link>
              </div>
            </div>      
          </template>

          <template v-else>
            <router-link to="/" class="navbar-item">Home</router-link>

            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/sign-up" class="button is-success"><strong>Sign up</strong></router-link>
                <router-link to="/log-in" class="button is-light">Log in</router-link>
              </div>
            </div> 
          </template>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>


<style >
@import url('../node_modules/bulma/bulma.sass');
</style>
