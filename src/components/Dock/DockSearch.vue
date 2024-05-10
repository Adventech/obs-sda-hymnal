<template>
  <div class="flex flex-col gap-4 relative">
    <div>
      <input v-model="keyword" placeholder="Search SDA Hymnal" type="text" class="font-mono rounded w-full border bg-obs-secondary border-obs-primary p-2 focus:outline-none" />
    </div>
    <div>
      <div @click="addSongToQueue(song)" class="hover:bg-slate-600 rounded p-1 hover:cursor-pointer relative flex justify-between" v-for="song of songs">
        <div class="flex-grow font-mono line-clamp-1">
          <span class="text-gray-400 ">{{ song.index }}</span> <span>{{ song.title }}</span>
        </div>
        <CheckCircle v-if="songInQueue(song)" class="flex-0 w-5"></CheckCircle>
      </div>
    </div>
  </div>
</template>

<script>
import hymnalDB from '/src/hymnal/sda-hymnal-db.json'
import CheckCircle from '/src/icons/check-circle.vue'
import { useQueueStore } from '/src/stores/queue.js'

export default {
  data () {
    return {
      keyword: null,
      hymnalDB,
    }
  },
  components: {
    CheckCircle
  },
  computed: {
    songs: function () {
      if (!this.keyword) { return hymnalDB }
      return hymnalDB.filter(song => {
        let found = false
        let keyword = this.keyword.toLowerCase()

        if (
            (song.title.toLowerCase().indexOf(keyword) >= 0)
            || (song.index.toLowerCase().indexOf(keyword) >= 0)
        ) {
          found = true
        }

        return found
      })
    }
  },
  methods: {
    addSongToQueue: function (song) {
      if (this.songInQueue(song)) {
        useQueueStore().removeFromQueue(song)
        return
      }
      useQueueStore().addToQueue(song)
    },
    songInQueue: function (song) {
      return useQueueStore().songInQueue(song)
    }
  }
}
</script>