<template>
  <Navbar />
  <div class="home">
  <div v-for="product in productList" :key="product.id">
      <ProductCard :image="getImageUrl(product.image)">
        <template #title>{{ product.name }}</template>
        <template #description>{{ product.description }}</template>
        <template #price>Prix: {{ product.price }} €</template>
      </ProductCard>
  </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";
import ProductCard from "@/components/ProductCard.vue";
import Navbar from "@/components/Navbar.vue";
let datas = ref({});
let productList = ref([])
axios({
  method: "get",
  url: "http://localhost:8000/api/v1/products",
})
    .then((res) => {
      console.log(res.data);
      datas = res.data;
      productList.value = datas.products;
      console.log(productList.value);
    })
    .catch((err) => {
      console.log(err);
    });

const getImageUrl = (imageName) => {
  return `http://localhost:8000/photos/${imageName}`;
}

// headers: {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// },
</script>

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>