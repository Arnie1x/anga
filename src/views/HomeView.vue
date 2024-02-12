<template>
  <main>
    <div class="absolute flex flex-col w-full px-5">
      <div class="container rounded-3xl text-white flex items-center mx-auto">
        <div class="py-4 w-full">
          <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for a City or State"
            class="py-2 px-1 w-full bg-transparent border-b placeholder:text-white placeholder:opacity-50 border-transparent focus:outline-none focus:border-white">
          <ul v-show="mapboxSearchResults" class="w-full">
            <p v-if="searchError">Sorry, something went wrong. Please try again.</p>
            <p v-if="!searchError && mapboxSearchResults.length === 0 && searchQuery !== ''">
              No results match your query, try a different location.
            </p>
            <template v-else>
              <li v-if="searchQuery !== ''" v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
                @click="previewCity(searchResult)" class="cursor-pointer py-2 hover:font-medium duration-200">
                {{ searchResult.place_name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>

        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios"
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';

const mapboxAPIKey = "pk.eyJ1IjoiYXJuaWUxeCIsImEiOiJjbHM3Yjg2NWIxdHh3MmxydzRqNjkydmtxIn0.d2CODK03thfoLz40oI9o6w"
const searchQuery = ref("")
const queryTimeOut = ref(null)
const mapboxSearchResults = ref([])
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
        // console.log(mapboxSearchResults.value);
      } catch (error) {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = []
  }, 300)
}

const router = useRouter()

const previewCity = (searchResult) => {
  console.log(searchResult)
  const [city, state] = searchResult.place_name.split(",")
  router.push({
    name: "cityView",
    params: {
      state: state.replaceAll(" ", ""),
      city: city
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  })
}


</script>
