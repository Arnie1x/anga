<template>
  <div class="flex flex-col flex-1 items-center px-6">
    <!-- Banner -->
    <div v-if="route.query.preview" class="text-white p-4 container text-center rounded-3xl">
      <p>You are currently previewing the city, click the "+" icon to start tracking this city</p>
    </div>
    <!-- Weather Overview -->
    <div>

    </div>
  </div>
</template>

<script setup>

import axios from 'axios';
import { useRoute } from 'vue-router';

const openWeatherAPIKey = 'ff44687c4aab2884ff50d39ba2bb14a7'
const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherAPIKey}&units=metric`)
    // console.log(weatherData)
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // // cal hourly weather offset
    // weatherData.data.hourly.forEach((hour) => {
    //   const utc = hour.dt * 1000 + localOffset;
    //   hour.currentTime =
    //     utc + 1000 * weatherData.data.timezone_offset;
    // });

    return weatherData.data;
  } catch (error) {
    console.log(error)
  }
}

const weatherData = await getWeatherData()
console.log(weatherData)

</script>