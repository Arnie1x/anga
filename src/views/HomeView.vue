<template>
  <main class="absolute flex flex-col w-full mt-32 px-5">
    <div class="container rounded-3xl text-white flex items-center mx-auto">
      <div class="py-4 w-full">
        <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for a City or State"
          class="py-2 px-1 w-full bg-transparent border-b placeholder:text-white placeholder:opacity-50 border-transparent focus:outline-none focus:border-white">
        <ul v-show="mapboxSearchResults" class="w-full">
          <p v-if="searchError">Sorry, something went wrong. Please try again.</p>
          <p v-if="!searchError && mapboxSearchResults.length === 0">
            No results match your query, try a different term.
          </p>
          <template v-else>
            <li v-if="searchQuery !== ''" v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
              class="cursor-pointer py-2 hover:font-medium duration-200">
              {{ searchResult.place_name }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios"

const mapboxAPIKey = "pk.eyJ1IjoiYXJuaWUxeCIsImEiOiJjbHM3Yjg2NWIxdHh3MmxydzRqNjkydmtxIn0.d2CODK03thfoLz40oI9o6w"
const searchQuery = ref("")
const queryTimeOut = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value)
  queryTimeOut.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const results = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
      )
      mapboxSearchResults.value = results.data.features;
      console.log(mapboxSearchResults.value);
      } catch (error) {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}

</script>
