<script setup>
import { defineProps, ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import router from "@/router/index.js";

const route = useRoute();
const props = defineProps(["productName", "productDescription", "productPrice", "productStock", "productImage", "productCategories"]);
const getImageUrl = (imageName) => {
  return `http://localhost:8000/photos/${imageName}`;
}

// Define local data properties
const localProductName = ref(props.productName);
const localProductDescription = ref(props.productDescription);
const localProductPrice = ref(props.productPrice);
const localProductStock = ref(props.productStock);
const localProductImage = ref(props.productImage);
const localProductCategories = ref(props.productCategories);
console.log(localProductCategories.value)
console.log(localProductStock.value)

// Watch for changes in props and update local data properties
watchEffect(() => {
  localProductName.value = props.productName;
  localProductDescription.value = props.productDescription;
  localProductPrice.value = props.productPrice;
  localProductStock.value = props.productStock;
  localProductImage.value = props.productImage;
  localProductCategories.value = props.productCategories;
});

// Emit an event whenever the local data property changes
const updateProduct = () => {
  emit('update-product', {
    productName: localProductName.value,
    productDescription: localProductDescription.value,
    productPrice: localProductPrice.value,
    productStock: localProductStock.value,
    ProductCategories: localProductCategories.value
  });
}

// Function delete the product
const del = () => {
  axios.delete(`http://localhost:8000/api/v1/products/${route.params.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  router.push({name: "products"})
}

</script>

<template>

    <div>
      <img :src="getImageUrl(props.productImage)" alt="" width="300px">
      <h3>
        {{ localProductName }}
      </h3>
      <p>
        Categorie: <span v-for="cat of localProductCategories">{{cat.categorie}} - </span>
      </p>
      <p>
        Description:<br> {{ localProductDescription }}
      </p>
      <p>
        Prix: {{ localProductPrice }}
      </p>
      <p>
        Stock: {{ localProductStock }}
      </p>
      <div class="buttons">
        <button @click="del">Supprimer</button>
      </div>
    </div>
</template>

<style scoped>

</style>