<script setup>
//   import router from '@/router';
// import axios from 'axios';
  
//   import { ref } from 'vue'

//   const team = ref({});
  
//   const getOrCreateTeam = async () => {
//     try {
//       const response = await axios.get('/api/v1/teams/');
//       team.value = response.data[0];
//     } catch (error) {
//       console.log(JSON.stringify(error));
//     }
//   };

//   //for use case error
//   let x = 2
//   if(1 == x)
//   {
//     getOrCreateTeam();
//   }

  
//   const logout = () => {
//     axios.post("/api/v1/token/logout/")
//       .then(response => {
//         axios.defaults.headers.common["Authorization"] = "";
//         //for use case error
//         response
  
//         localStorage.removeItem("username");
//         localStorage.removeItem("userid");
//         localStorage.removeItem("token");
  
//         const store = useStore();
//         store.commit('removeToken');
  
//         router.push('/');
//       })
//       .catch(error => {
//         if (error.response) {
//           console.log(JSON.stringify(error.response.data));
//         } else if (error.message) {
//           console.log(JSON.stringify(error.message));
//         } else {
//           console.log(JSON.stringify(error));
//         }
//       });
//   };
</script>
  

<template>
    <div class="page-my-account">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li class="is-active"><router-link to="/dashboard/my-account" aria-current="true">My account</router-link></li>
            </ul>
        </nav>

        <h1 class="title">My account</h1>

        <strong>Team: </strong>{{ team.name }}<br>
        <strong>Username: </strong>{{ $store.state.user.username }}

        <hr>

        <div class="buttons">
            <router-link to="/dashboard/my-account/edit-team" class="button is-light">Edit team</router-link>
            <button @click="logout()" class="button is-danger">Log out</button>
        </div>
    </div>
</template>