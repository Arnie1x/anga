<template>
  <div class="flex flex-col flex-1 items-center px-6">
    <!-- Banner -->
    <div v-if="route.query.preview" class="mb-3 text-white p-4 container text-center rounded-3xl">
      <p>You are currently previewing the city, click the "+" icon to start tracking this city</p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-row container p-4 my-3 text-white rounded-3xl">
      <div class="flex-1">
        <img class="z-[-10px] w-[150px] h-auto absolute top-[-60px] left-[-50px]"
          :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          :alt="`${weatherData.weather[0].description}`">
        <p class=" text-3xl z-10">{{ weatherData.name }}</p>
        <p class=" text-2xl font-light capitalize">{{ weatherData.weather[0].description }}</p>
        <p class="text-sm mt-1">Last Updated: {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString(
              "en-us",
              {
                timeStyle: "short",
              }
            )
          }}</p>
      </div>
      <div class="text-left flex flex-col items-end font-light">
        <p class="text-[40px]">
          {{ Math.round(weatherData.main.temp) }}&deg;
        </p>
        <p class="text-xl mt-1">
          Feels Like: {{ Math.round(weatherData.main.feels_like) }}&deg;
        </p>
      </div>
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
    const localOffset = new Date().getTimezoneOffset() * 60;
    weatherData.data.currentTime = weatherData.data.dt + localOffset

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