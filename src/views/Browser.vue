<template>
  <div v-if="show && lowerThirds.length && lowerThirds[currentIterator] && lowerThirds[currentIterator].length" class="transition ease-in-out delay-150 duration-300 text-white text-7xl h-screen flex flex-col justify-end items-center">
    <div class="w-full flex items-center flex-col p-10">
        <div v-for="(line, i) in lowerThirds[currentIterator]" class="transition-opacity">
          <transition name="fade">
            <div class="block lower-third transition-opacity" :key="`${currentIterator}_${i}`">
              {{ line }}
            </div>
          </transition>
        </div>
    </div>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = `obs-sda-hymnal`
const channel = new BroadcastChannel('obs-sda-hymnal')

export default {
  data () {
    return {
      queue: [],
      currentIterator: 0,
      show: false,
    }
  },
  methods: {
    processQueue: function (queue) {
      try {
        this.queue = JSON.parse(queue).queue
      } catch (e) {}
    },
    chunkArray: function (array, chunkSize) {
      const chunks = []
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize))
      }
      return chunks
    },
    handleKeyPress(event) {
      if (event.key === 'ArrowLeft') {
        this.prev()
      } else if (event.key === 'ArrowRight') {
        this.next()
      } else if (event.key === ' ') {
        this.showHide()
      }
    },
    showHide: function () {
      this.show = !this.show
    },
    prev: function () {
      if (this.currentIterator >= 0 && this.show) {
        this.currentIterator--
      }
    },
    next: function () {
      if (this.currentIterator < this.lowerThirds.length-1 && this.show) {
        this.currentIterator++
      }
    }
  },
  created () {
    let state = localStorage.getItem(LOCAL_STORAGE_KEY)
    this.processQueue(state)

    let self = this
    window.addEventListener("storage", function(event) {
      if (event.key === LOCAL_STORAGE_KEY) {
        try {
          self.processQueue(event.newValue)
        } catch (e) {}
      }
    })

    channel.onmessage = (event) => {
      if (event.data.action === 'clear') {
        this.currentIterator = 0
      }

      if (event.data.action === 'next') {
        this.next()
      }

      if (event.data.action === 'prev') {
        this.prev()
      }

      if (event.data.action === 'showHide') {
        this.showHide()
      }
    };
  },
  mounted () {
    window.addEventListener('keydown', this.handleKeyPress)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.handleKeyPress)
  },
  computed: {
    lowerThirds: function () {
      let lyrics = []
      if (!this.queue.length) {
        this.currentIterator = 0
        return lyrics
      }

      for (let song of this.queue) {
        lyrics.push([`${song.index} - ${song.title}`, ''])

        for (let songLyrics of song.lyrics) {
          lyrics = lyrics.concat(this.chunkArray(songLyrics.lines, 2))
        }
        lyrics.push([''])
      }

      if (this.currentIterator > lyrics.length-1) {
        this.currentIterator = lyrics.length-1
      }

      return lyrics
    },
  }
}
</script>

<style>
.lower-third {
  @apply font-bold antialiased;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.9)
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active, .fade-leave-to {
  display: none;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>