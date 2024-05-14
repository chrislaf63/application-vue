<template>
<nav>
  <router-link to="/users"><button>Gérer les utilisateurs</button></router-link>
  <router-link to="/products"><button>Gérer les produits</button></router-link>
  <router-link to="/category"><button>Gérer les catégories</button></router-link>
  <button @click="logout">Logout</button>
</nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import router from "@/router/index.js";
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
<style scoped>
nav {
  margin-block: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;

}

button{
  padding-inline: 20px;
  padding-block: 10px;
  font-size: 1em;
}
</style>