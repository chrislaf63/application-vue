<script setup>
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute, useRouter} from "vue-router";
import Product from "@/components/Product.vue";
import axios from "axios";


const getImageUrl = (imageName) => {
  return `http://localhost:8000/photos/${imageName}`;
}
const route = useRoute();
const router = useRouter()
let productName = ref()
let productDescription = ref()
let productPrice = ref()
let productStock = ref()
let productImage = ref()
let productCategories = ref([])
let categoriesTable = ref([]);
let productcategory = ref([]);
const image = ref(null);
const onFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    image.value = e.target.files[0];
  }
}
onMounted(async () => {
  const response = await fetch(`http://localhost:8000/api/v1/products/${route.params.id}`)
  const responseCategories = await fetch(`http://localhost:8000/api/v1/category`)
  const data = await response.json()
  const dataCategories = await responseCategories.json()
  const product = data.product;
  productName.value = product.name;
  productDescription.value = product.description;
  productPrice.value = product.price;
  productStock.value = product.stock;
  productImage.value = product.image;
  productCategories.value = product.categories;
  productCategories.value.forEach(function (productCategory) {
    productcategory.value.push(productCategory.categorie)
  })
  const categorys = dataCategories.categories;
  categorys.forEach(function (category) {
    categoriesTable.value.push(category.categorie);
  })
});

// Emit an event whenever the local data property changes
const updateProduct = () => {
  emit('update-product', {
    productName: localProductName.value,
    productDescription: localProductDescription.value,
    productPrice: localProductPrice.value,
    productStock: localProductStock.value,
    productCategories: localProductCategories.value
  });
}

 const submit = async (e) => {
   e.preventDefault();
   const formData = new FormData();
   formData.append('name', productName.value);
   formData.append('description', productDescription.value);
   formData.append('price', productPrice.value);
   formData.append('stock', productStock.value);
   formData.append('categorie', JSON.stringify(productcategory.value));
   if (image.value) {
     formData.append('image', image.value);
   }

   axios.post(`http://localhost:8000/api/v1/products/${route.params.id}?_method=PUT`, formData, {
     headers: {
       "Content-Type": "multipart/form-data",
       "Accept": "application/json"
     }
   })
       .then(response => {
         console.log(response);

       })
       .catch(error => {
         console.error(error);
       });
   router.push({ name: "products" });
 }
</script>

<template>
  <div class="container">
    <Product
        :productName="productName"
        :productDescription="productDescription"
        :productCategories="productCategories"
        :productPrice="productPrice"
        :productStock="productStock"
        :productImage="productImage"
        @update-product="updateProduct"
    />
    <div>
      <form enctype="multipart/form-data">
        <div class="fields">
          <div class="categorys">
            <div v-for="(categorieItem, index) of categoriesTable" :key="index">
              <label :for="categorieItem">{{ categorieItem }}</label>
              <input type="checkbox" :id="categorieItem" :value="categorieItem" v-model="productcategory" />
            </div>
          </div>
          <label for="name">Nom du produit</label>
          <input type="text" id="name" name="name" v-model="productName"/>
          <label for="description">Description</label>
          <input type="text" id="description" name="description" v-model="productDescription"/>
          <label for="price">Prix</label>
          <input type="text" id="price" name="price" v-model="productPrice"/>
          <label for="stock">Stock</label>
          <input type="text" id="stock" name="stock" v-model="productStock"/>
          <label for="image">Image</label>
          <input type="file" id="image" name="image" @change="onFileChange"/>
          <button @click="submit">Enregistrer</button>
        </div>
      </form>
      <RouterLink to="/products">Retour à la page des produits</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: block;
  margin-top: 1rem;
}
</style>