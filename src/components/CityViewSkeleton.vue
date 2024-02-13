<template>
  <div class="flex flex-col flex-1 px-6">
    <!-- Overview -->
    <div class="flex flex-row container p-4 my-3 rounded-3xl">
      <div class="flex-1 flex flex-col gap-1">
        <AnimatedPlaceholder class="max-w-[300px] h-[40px] w-full" />
        <AnimatedPlaceholder class="max-w-[300px] h-[30px] w-full" />
        <AnimatedPlaceholder class="max-w-[300px] h-[20px] w-full" />

      </div>
      <div class="flex flex-col gap-1 items-end text-left">
        <AnimatedPlaceholder class="min-w-[80px] h-[65px]" />
        <AnimatedPlaceholder class="min-w-[150px] h-[25px] w-full" />
      </div>
    </div>
    <!-- Hourly -->
    <div class="flex flex-col container p-4 my-3 rounded-3xl">
      <AnimatedPlaceholder class="max-w-screen-md h-[205px] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>