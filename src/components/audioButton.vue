<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  file: String,    // Link lagunya
  autoPlay: Boolean // Perintah dari luar: "Woi nyala!"
})

const audioRef = ref(null)
const isPlaying = ref(false)

// Fungsi Play/Pause manual
const toggle = () => {
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// Mengawasi perintah dari "Buka Undangan"
watch(() => props.autoPlay, (nyala) => {
  if (nyala && audioRef.value) {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(e => console.log("Gagal autoplay:", e))
  }
})
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50">
    <audio ref="audioRef" :src="file" loop></audio>

    <button 
      @click="toggle"
      class="w-12 h-12 bg-white/80 backdrop-blur rounded-full border border-gray-300 shadow-lg flex items-center justify-center transition-all"
      :class="{ 'animate-spin-slow': isPlaying }"
    >
      <span v-if="isPlaying" class="text-xl">🎵</span>
      <span v-else class="text-xl text-gray-400">🔇</span>
    </button>
  </div>
</template>

<style scoped>
/* Animasi muter pelan kayak piringan hitam */
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>