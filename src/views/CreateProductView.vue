<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h1>Ajouter un produit</h1>
      <div class="fields">
        <div class="categorys">
          <div v-for="(categorieItem, index) of categoriesTable" :key="index">
            <label :for="categorieItem">{{ categorieItem }}</label>
            <input type="checkbox" :id="categorieItem" :value="categorieItem" v-model="categorie"/>
          </div>
        </div>
        <label for="name">Nom du produit</label>
        <input type="text" id="name" name="name" v-model="name"/>
        <label for="description">Description</label>
        <input type="text" id="description" name="description" v-model="description"/>
        <label for="price">Prix</label>
        <input type="text" id="price" name="price" v-model="price"/>
        <label for="stock">Stock</label>
        <input type="text" id="stock" name="stock" v-model="stock"/>
        <label for="image">Image</label>
        <input type="file" id="image" name="image" @change="onFileChange"/>
        <button type="submit">Enregistrer</button>
        <RouterLink to="/products">Retour à la page des produits</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter();
const name = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");
const image = ref(null);
const categorie = ref([]);
const onFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    image.value = e.target.files[0];
  }
};
let categoriesTable = ref([]);
onMounted(async () => {
  const response = await fetch(`http://localhost:8000/api/v1/category`)
  const data = await response.json()
  const categorys = data.categories;
  console.log(categorys)
  categorys.forEach(function (category) {
    categoriesTable.value.push(category.categorie);
  })
  console.log(categoriesTable.value)
});
const submit = async () => {
  try {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('price', price.value);
    formData.append('stock', stock.value);
    formData.append('categorie', JSON.stringify(categorie.value));
    if (image.value) {
      formData.append('image', image.value);
    }
    console.log(formData)
    const response = await axios.post("http://localhost:8000/api/v1/products",
        formData
        , {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
          }
        });
    router.push({ name: "products" })
  } catch (error) {
    console.error(error)
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

h1 {
  text-align: center;
}

form {
  width: 20%;
}
.categorys {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.categorys label {
  display: inline;
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