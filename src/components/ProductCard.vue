<template>
  <div class="product-card">
    <img :src="props.image" alt="product.name" />
    <h3><slot name="title"></slot></h3>
    <p><slot name="description"></slot></p>
    <p><slot name="price"></slot></p>
    <button>Add to cart</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  image: String
})
</script>

<style scoped>
.product-card {
  max-width: 200px;
  border: 1px solid red;
  margin: 10px;
  height: 350px;
}

.product-card img {
  width: 100%;
}

.product-card h3 {
  margin: 10px 0;
}
</style>