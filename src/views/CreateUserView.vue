<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h1>Créer un utilisateur</h1>
      <div class="fields">
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" v-model="name"/>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email"/>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password"/>
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" id="password_confirmation" name="password_confirmation" v-model="password_confirmation"/>
        <button type="submit">Enregistrer</button>
        <RouterLink to="/users">Retour à la page des utilisateurs</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "@/router/index.js";
import { ref } from "vue";
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const submit = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/user/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    router.push("/users")
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

h1 {
  text-align: center;
}

form {
  width: 20%;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.1em;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: seagreen;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: darkgreen;
}

</style>