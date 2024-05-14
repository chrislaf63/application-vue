<script setup>
import axios  from "axios";
import { defineProps } from "vue";

</script>

<template>
  <div class="user-card">
    <h3>
      <slot name="id"></slot>
    </h3>
    <p>
      <slot name="username"></slot>
    </p>
    <p>
      <slot name="email"></slot>
    </p>
    <p>
      <slot name="created"></slot>
    </p>
  </div>
</template>

<style scoped>
.user-card {
  max-width: 200px;
  border: 1px solid red;
  margin: 10px;
  height: 300px;
  padding-inline: 10px;
}

.product-card img {
  width: 100%;
}

.product-card h3 {
  margin: 10px 0;
}

.buttons{
  display: flex;
  justify-content: space-around;

}

button{
  font-weight: 700;
  padding-inline: 10px;
  font-size: 0.9em;
}

button:first-child{
  color: royalblue;
}

button:last-child{
  color: skyblue;
  background-color: #f1f1f1;
}

button:hover {
  cursor: pointer;
}

button:last-child:hover {
  background-color: #e1e1e1;
  color: red;
}
</style>