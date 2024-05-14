<template>
  <h1>Utilisateurs</h1>
  <nav>
    <RouterLink to="/create-user"><button>Ajouter un utilisateur</button></RouterLink>
    <RouterLink to="/dashboard"><button>Retour à l'accueil</button></RouterLink>
  </nav>
  <div class="users">
    <RouterLink v-for="user of usersList" :to="`/user/${user.id}`" >
      <UserCard >
        <template #id>Id: {{ user.id }}</template>
        <template #username>Username: {{ user.name }}</template>
        <template #email>Email: {{ user.email }}</template>
        <template #created>Created: {{ user.created_at }}</template>
      </UserCard>
    </RouterLink>
  </div>
</template>

<script setup>
import {RouterLink} from 'vue-router'
import UserCard from "@/components/UserCard.vue";
import axios from 'axios'
import {onMounted, ref} from 'vue'
let users = ref([])
let usersList = ref([])
onMounted(() => {
  axios({
    method: "get",
    url: "http://localhost:8000/api/v1/user",
  })
      .then((res) => {
        console.log(res.data);
        users = res.data;
        console.log(users)
        usersList.value = users[0];
        console.log(usersList.value);
      })
      .catch((err) => {
        console.log(err);
      });
})
// axios({
//   method: "get",
//   url: "http://localhost:8000/api/v1/user",
// })
//     .then((res) => {
//       console.log(res.data);
//       users = res.data;
//       console.log(users)
//       usersList.value = users[0];
//       console.log(usersList.value);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

</script>

<style scoped>
h1{
  text-align: center;
}

.users{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

nav {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

button {
  padding-inline: 20px;
  padding-block: 10px;
  font-size: 1em;
  margin-right: 20px;
}
</style>