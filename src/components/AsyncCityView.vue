<template>
  <div class="flex flex-col flex-1 items-center px-6">
    <!-- Banner -->
    <div v-if="route.query.preview" class="mb-3 text-white p-4 container text-center rounded-3xl">
      <p>You are currently previewing the city, click the "+" icon to start tracking this city</p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-row container p-4 my-3 text-white rounded-3xl z-0">
      <div class="flex-1 z-10">
        <p class=" text-3xl z-10">{{ weatherData.name }}</p>
        <div class="flex flex-row">
          <p class=" text-2xl font-light capitalize">{{ weatherData.weather[0].description }}</p>
          <div class="ml-1 mt-[-5px] static">
            <img class="absolute z-[-10px] w-[45px] h-auto opacity-50 filter blur-sm"
              :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
              :alt="`${weatherData.weather[0].description}`">
            <img class="absolute z-[-10px] w-[45px] h-auto opacity-90"
              :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
              :alt="`${weatherData.weather[0].description}`">
          </div>

        </div>
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

    <!-- 3-Hour Weather -->
    <div class="flex flex-col container p-4 my-3 rounded-3xl text-white text-xl font-semibold">
      <p class="mb-4">3-Hour Forecast</p>
      <div class="flex flex-row gap-10 overflow-x-scroll">
        <div v-for="hourData in weatherData.forecast" :key="hourData.dt" class="flex flex-col gap-4 items-center mb-4">
          <p class="whitespace-nowrap text-md font-light">
            {{
              new Date(hourData.dt).toLocaleTimeString("en-us", {
                hour: "numeric",
              })
            }}
          </p>
          <img :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
            :alt="`${hourData.weather[0].description}`" class="w-auto h-[50px] object-cover">
          <p class="font-light text-xl">
            {{ Math.round(hourData.main.temp) }}&deg;
          </p>
        </div>

      </div>
    </div>

    <div v-if="!route.query.preview" class="flex items-center gap-2 py-12 text-white cursor-pointer">
      <div
        class="container flex items-center gap-2 p-4 rounded-3xl duration-150 hover:bg-red-600 hover:bg-opacity-40 active:bg-opacity-100"
        @click="removeCity">
        <i class="fa-solid fa-trash"></i>
        <p>Remove City</p>
      </div>
    </div>

  </div>
</template>

<script setup>

import axios from 'axios';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const openWeatherAPIKey = 'ff44687c4aab2884ff50d39ba2bb14a7'
const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherAPIKey}&units=metric`)
    // console.log(weatherData)
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60;
    const utc = weatherData.data.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000

    // // cal hourly weather offset
    // weatherData.data.hourly.forEach((hour) => {
    //   const utc = hour.dt * 1000 + localOffset;
    //   hour.currentTime =
    //     utc + 1000 * weatherData.data.timezone_offset;
    // });

    const forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openWeatherAPIKey}&units=metric`)
    // console.log(forecastData)

    forecastData.data.list.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.dt = utc + 1000
      hour.dt = roundToNearestHour(new Date(hour.dt))
    })

    weatherData.data.forecast = forecastData.data.list

    return weatherData.data;
  } catch (error) {
    console.log(error)
  }
}

function roundToNearestHour(date) {
  date.setMinutes(date.getMinutes() + 30);
  date.setMinutes(0, 0, 0);

  return date;
}

const weatherData = await getWeatherData()

const router = useRouter()
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"))
  const updatedCities = cities.filter((city) => city.id !== route.query.id)
  localStorage.setItem("savedCities", JSON.stringify(updatedCities))
  router.push({
    name: 'home'
  })
}

</script>