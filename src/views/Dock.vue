<template>
  <div class="flex flex-col h-screen bg-obs-primary text-white">
    <div class="mb-auto h-screen overflow-y-scroll p-4">
      <RouterView />
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from '../components/Footer.vue'
</script>