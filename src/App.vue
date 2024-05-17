<template>
  <header>
    <div>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>
    </div>
    <h1>Bienvenue sur votre application de gestion </h1>
  </header>

  <RouterView />

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {onMounted, ref} from 'vue'
import router from "@/router/index.js";
  const isLogged = false
  onMounted(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  });

const isLoggedIn = ref(localStorage.getItem('isLogged'))
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem('isLogged');
  isLoggedIn.value = ref(false);
  // localStorage.setItem('isLogged', false)
  router.push("/login");
};

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
}

.logo {
  margin: 10px;
}

a {
  text-decoration: none;
  color: black;
  font-size: 1.2em;
}

button {
  margin: 10px;
  padding-inline: 20px;
  padding-block: 10px;
  background-color: seagreen;
  border-radius: 7px;
}

#logout{
  font-size: 1.1em;
}

button:hover {
  background-color: darkgreen;
  color:white;
}

</style>
