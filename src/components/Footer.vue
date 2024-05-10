<template>
  <footer class="flex gap-2 items-center justify-between p-2">
    <router-link :to="{name: 'dock-search'}" class="grow w-7 flex h-7 rounded bg-obs-control items-center justify-center hover:bg-obs-secondary">
      <MagnifyingGlass class="h-4"></MagnifyingGlass>
    </router-link>
    <router-link :to="{name: 'dock-queue'}" class="grow w-7 flex h-7 rounded bg-obs-control items-center justify-center hover:bg-obs-secondary">
      <ListBullet class="h-4"></ListBullet>
    </router-link>
    <button @click="prev()" class="grow w-7 flex h-7 rounded bg-obs-control items-center justify-center hover:bg-obs-secondary">
      <ChevronLeft class="h-4"></ChevronLeft>
    </button>
    <button @click="next()" class="grow w-7 flex h-7 rounded bg-obs-control items-center justify-center hover:bg-obs-secondary">
      <ChevronRight class="h-4"></ChevronRight>
    </button>
    <button @click="showHide()" class="grow w-7 flex h-7 rounded bg-obs-control items-center justify-center hover:bg-obs-secondary">
      <Eye class="h-4"></Eye>
    </button>
  </footer>
</template>

<script setup>
import MagnifyingGlass from '/src/icons/magnifying-glass.vue'
import ListBullet from '/src/icons/list-bullet.vue'
import ChevronLeft from '/src/icons/chevron-left.vue'
import ChevronRight from '/src/icons/chevron-right.vue'
import Eye from '/src/icons/eye.vue'
const channel = new BroadcastChannel('obs-sda-hymnal')

function next() {
  channel.postMessage({ action: 'next'})
}

function prev() {
  channel.postMessage({ action: 'prev'})
}

function showHide() {
  channel.postMessage({ action: 'showHide'})
}
</script>