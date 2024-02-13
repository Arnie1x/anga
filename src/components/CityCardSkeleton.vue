<template>
  <div class="flex py-6 mb-5 container rounded-3xl mt-24">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-[50%]" />
      <AnimatedPlaceholder class="max-w-[40%]" />
    </div>

    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-[50px] w-full" />
      <AnimatedPlaceholder class="max-w-[100px] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';


</script>