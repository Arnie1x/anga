<template>
  <div
    class="flex flex-col min-h-screen font-Open-Sans bg-gradient-to-br from-cyan-100 to-blue-900">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>

import { RouterView } from 'vue-router';
import SiteNavigation from "./components/SiteNavigation.vue"

</script>

<style lang="scss" scoped></style>
