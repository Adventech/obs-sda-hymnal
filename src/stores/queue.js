import { defineStore } from 'pinia'

export const useQueueStore = defineStore({
    id: 'obs-sda-hymnal',
    persist: true,
    state: () => ({
      queue: [],
      iterator: 0,
    }),
    actions: {
        setQueue(queue) {
            this.queue = queue
        },
        clearQueue() {
            this.queue = []
        },
        addToQueue(song) {
            this.queue.push(song)
        },
        songInQueue(song) {
            return this.queue.find(s => s.index === song.index)
        },
        removeFromQueue(song) {
            this.queue = this.queue.filter(s => s.index !== song.index)
        },
        moveUp(song) {
            let songIndex = this.queue.findIndex(s => s.index === song.index)
            if (!songIndex) { return }
            this.queue.splice(songIndex-1, 0, this.queue.splice(songIndex, 1)[0])
        },
        moveDown(song) {
            let songIndex = this.queue.findIndex(s => s.index === song.index)
            if (songIndex >= this.queue.length) { return }
            this.queue.splice(songIndex+1, 0, this.queue.splice(songIndex, 1)[0])
        },
    },
    getters: {
      getQueue(state) {
        return state.queue
      }
    },
})
