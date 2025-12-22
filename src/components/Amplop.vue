<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: Array // Nerima data rekening dari luar
})

const copyStatus = ref(null) // Buat nyimpen status "Berhasil Disalin"

const copyText = (text, id) => {
  navigator.clipboard.writeText(text).then(() => {
    copyStatus.value = id // Tandain kartu mana yang baru dicopy
    setTimeout(() => copyStatus.value = null, 2000) // Reset tulisan setelah 2 detik
  })
}
</script>

<template>
  <div class="px-6 py-10 bg-gray-50 text-center">
    <h2 class="text-3xl font-serif text-pink-600 mb-2 font-bold">Wedding Gift</h2>
    <p class="text-sm text-gray-500 mb-8">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.</p>

    <div class="space-y-4">
      <div v-for="gift in items" :key="gift.id" class="bg-white p-5 rounded-xl shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
        
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-gray-600">{{ gift.bank }}</span>
          <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Auto Check</span>
        </div>

        <div class="text-left">
          <p class="text-xl font-mono text-gray-800 tracking-wider">{{ gift.nomor }}</p>
          <p class="text-sm text-gray-400 uppercase mt-1">a.n {{ gift.nama }}</p>
        </div>

        <button 
          @click="copyText(gift.nomor, gift.id)"
          class="w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          :class="copyStatus === gift.id ? 'bg-green-100 text-green-700' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'"
        >
          <span v-if="copyStatus === gift.id">✅ Berhasil Disalin!</span>
          <span v-else>📋 Salin Nomor</span>
        </button>

      </div>
    </div>
  </div>
</template>