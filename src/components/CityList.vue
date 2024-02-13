<template>
  <div class="mt-24">
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>
  </div>
  <p v-if="savedCities.length === 0">
    No Locations Added. To Start Adding a Location, search in the field above.</p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import AsyncCityView from './AsyncCityView.vue';
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';


const savedCities = ref([])
const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))

    const requests = []

    const openWeatherAPIKey = 'ff44687c4aab2884ff50d39ba2bb14a7'
    savedCities.value.forEach(city => {
      requests.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${openWeatherAPIKey}&units=metric`))
    });
    const weatherData = await Promise.all(requests)

    // Flicker Delay
    await new Promise((res) => setTimeout(res, 1000))

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data
    })
  }
}

await getCities()

const router = useRouter()
const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: {
      state: city.state,
      city: city.city
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    }
  })
}

</script>
