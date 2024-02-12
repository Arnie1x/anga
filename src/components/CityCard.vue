<template>
  <div class="flex py-6 mb-5 container rounded-3xl cursor-pointer text-white">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3 class="font-light">{{ city.state }}</h3>
    </div>
    <div class="flex flex-col">
      <p class="text-3xl font-light self-end">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <p class="font-light self-end">
        Feels Like: {{ Math.round(city.weather.main.feels_like) }}&deg;
      </p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  city: {
    type: Object,
    default: () => { }
  }
})

</script>