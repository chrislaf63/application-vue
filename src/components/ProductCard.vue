<template>
  <div class="product-card">
    <img :src="props.image" alt="product.name" />
    <h3><slot name="title"></slot></h3>
    <p><slot name="categorie"></slot></p>
    <p><slot name="description"></slot></p>
    <p><slot name="price"></slot></p>
    <p><slot name="stock"></slot></p>
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
  width: 400px;
  border: 1px solid red;
  margin: 10px;
  height: 600px;
}

.product-card img {
  width: 100%;
}

.product-card h3 {
  margin: 10px 0;
}
</style>