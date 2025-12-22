<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Nerima data 'target' dari luar (tanggal acara)
const props = defineProps({
  target: String
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer = null

const updateTime = () => {
  const targetTime = new Date(props.target).getTime()
  const now = new Date().getTime()
  const diff = targetTime - now

  if (diff <= 0) {
    // Kalau waktu dah lewat/habis
    clearInterval(timer)
    return
  }

  // Rumus matematika konversi milidetik ke hari/jam/menit
  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateTime() // Jalankan sekali pas baru muncul
  timer = setInterval(updateTime, 1000) // Update tiap 1 detik
})

onUnmounted(() => {
  clearInterval(timer) // Matiin mesin kalo pindah halaman biar gak boros memori
})
</script>

<template>
  <div class="flex justify-center gap-3 my-8">
    <div class="bg-pink-600 text-white p-3 rounded-lg shadow-md w-16 text-center">
      <div class="text-xl font-bold">{{ days }}</div>
      <div class="text-xs uppercase">Hari</div>
    </div>
    <div class="bg-pink-500 text-white p-3 rounded-lg shadow-md w-16 text-center">
      <div class="text-xl font-bold">{{ hours }}</div>
      <div class="text-xs uppercase">Jam</div>
    </div>
    <div class="bg-pink-400 text-white p-3 rounded-lg shadow-md w-16 text-center">
      <div class="text-xl font-bold">{{ minutes }}</div>
      <div class="text-xs uppercase">Mnt</div>
    </div>
    <div class="bg-pink-300 text-white p-3 rounded-lg shadow-md w-16 text-center">
      <div class="text-xl font-bold">{{ seconds }}</div>
      <div class="text-xs uppercase">Dtk</div>
    </div>
  </div>
</template>