<script setup>
import {useRoute} from 'vue-router';
import {ref, onMounted } from 'vue';
import axios from "axios";
import router from "@/router/index.js";

const route = useRoute();
const user = ref();
onMounted(() => {
  fetch(`http://localhost:8000/api/v1/user/${route.params.id}`)
      .then(response => response.json())
      .then(data => {
        user.value = data[0]
      })
      .catch(error => console.error('Error:', error))
})

const del = () => {
  axios.delete(`http://localhost:8000/api/v1/user/${route.params.id}`)
      .then((res) => {
        console.log(res.data);

      })
      .catch((err) => {
        console.log(err);
      })
  router.push({name: "users"})
}
</script>

<template>
  <div>
  <h3>
    Id: {{ user?.id}}
  </h3>
  <p>
    Username: {{ user?.name}}
  </p>
  <p>
    Email: {{ user?.email}}
  </p>
  <p>
    Créé le: {{ user?.created_at}}
  </p>
  <div class="buttons">

    <button @click="del">Supprimer</button>
  </div>
  </div>
</template>

<style scoped>

</style>