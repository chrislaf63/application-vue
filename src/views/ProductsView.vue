<template>
  <div>
    <h1>Produits</h1>
    <nav>
      <RouterLink to="/create-product">
        <button>Ajouter un produit</button>
      </RouterLink>
      <RouterLink to="/dashboard">
        <button>Retour à l'accueil</button>
      </RouterLink>
    </nav>
    <div class="products">
      <RouterLink v-for="product in productList" :key="product.id" :to="`/product/${product.id}`">
        <ProductCard :image="getImageUrl(product.image)">
          <template #title>{{ product.name }}</template>
          <template #categorie>Categorie: <span v-for ="cat of product.categories">{{cat.categorie}} - </span></template>
          <template #description>Description: <br>{{ product.description }}</template>
          <template #price>Prix: {{ product.price }} €</template>
          <template #stock>Stock: {{ product.stock }}</template>
        </ProductCard>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import {RouterLink} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import ProductCard from "@/components/ProductCard.vue";

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
</script>


<style scoped>
h1 {
  text-align: center;
}

.products {
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