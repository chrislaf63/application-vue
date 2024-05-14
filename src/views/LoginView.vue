<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import {RouterLink} from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const submit = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/user/login", {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem("token", response.data.token)
    router.push("/dashboard")
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="container">

    <form @submit.prevent="submit">
      <h1>Connexion</h1>
      <div class="fields">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email"/>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password"/>
        <button type="submit">Submit</button>
        <p>Pas encore de compte ?</p>
        <RouterLink to="/register">S'enregistrer</RouterLink>
        <p> {{ error }}</p>
      </div>
    </form>
  </div>

</template>
<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

h1 {
  text-align: center;
}
form
{
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