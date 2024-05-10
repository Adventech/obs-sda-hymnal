<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between">
      <span class="font-mono">Queue</span>
      <button @click="clearQueue()" class="font-mono">Clear all</button>
    </div>
    <div>
      <div class="rounded p-1 relative flex justify-between items-center" v-for="song of songs">
        <div class="flex-grow font-mono line-clamp-1">
          <span class="text-gray-400 ">{{ song.index }}</span> <span>{{ song.title }}</span>
        </div>
        <div class="flex items-center">
          <button @click="moveUp(song)" class="hover:bg-slate-600 w-6 h-6 rounded"><ChevronUp class="h-4 flex-0"></ChevronUp></button>
          <button @click="moveDown(song)" class="hover:bg-slate-600 w-6 h-6 rounded mr-5"><ChevronDown class="h-4 flex-0"></ChevronDown></button>
          <button @click="removeFromQueue(song)" class="hover:bg-slate-600 w-6 h-6 rounded"><XMark class="h-4 flex-0"></XMark></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQueueStore } from '@/stores/queue'
import ChevronUp from '/src/icons/chevron-up.vue'
import ChevronDown from '/src/icons/chevron-down.vue'
import XMark from '/src/icons/x-mark.vue'
import ListBars from '/src/icons/list-bars.vue'
const channel = new BroadcastChannel('obs-sda-hymnal');


export default {
  data () {
    return {
    }
  },
  components: {
    ChevronUp,
    ChevronDown,
    XMark,
    ListBars,
  },
  methods: {
    removeFromQueue: function (song) {
      useQueueStore().removeFromQueue(song)
    },
    clearQueue: function () {
      useQueueStore().clearQueue()
      channel.postMessage({ action: 'clear'})
    },
    moveUp: function (song) {
      useQueueStore().moveUp(song)
    },
    moveDown: function (song) {
      useQueueStore().moveDown(song)
    },
  },
  computed: {
    songs: function () {
      return useQueueStore().queue
    }
  }
}
</script>