<script setup>
import { ref } from 'vue'

const props = defineProps({
  noWa: String // Nerima nomor HP dari database
})

const nama = ref('')
const jumlah = ref(1)
const status = ref('Hadir')

const kirimPesan = () => {
  if (!nama.value) {
    alert("Isi nama dulu dong bestie!")
    return
  }

  // Ngerakit pesan text biar rapi
  const pesan = `Halo, saya ${nama.value}. \nSaya ingin konfirmasi ${status.value} di acara pernikahan kalian. \nJumlah tamu: ${jumlah.value} orang. \nTerima kasih.`

  // Encode biar spasi & enter bisa dibaca browser
  const url = `https://wa.me/${props.noWa}?text=${encodeURIComponent(pesan)}`

  // Buka WA di tab baru
  window.open(url, '_blank')
}
</script>

<template>
  <div class="p-6 pb-20 bg-pink-50">
    <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500">
      <h2 class="text-2xl font-serif font-bold text-center mb-6 text-gray-700">Konfirmasi Kehadiran</h2>

      <div class="space-y-4">
        
        <div>
          <label class="block text-sm text-gray-500 mb-1">Nama Tamu</label>
          <input 
            v-model="nama"
            type="text" 
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-pink-500 bg-gray-50"
            placeholder="Contoh: Budi Santoso"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-500 mb-1">Jumlah Orang</label>
          <select v-model="jumlah" class="w-full border border-gray-300 rounded-lg p-2 bg-gray-50">
            <option>1</option>
            <option>2</option>
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-500 mb-1">Konfirmasi</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="status" value="Hadir" class="text-pink-600 focus:ring-pink-500">
              <span>Hadir</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="status" value="Maaf Tidak Bisa Hadir" class="text-pink-600 focus:ring-pink-500">
              <span>Maaf Tidak Bisa</span>
            </label>
          </div>
        </div>

        <button 
          @click="kirimPesan"
          class="w-full bg-green-500 text-white font-bold py-3 rounded-lg mt-4 hover:bg-green-600 transition-colors flex justify-center items-center gap-2"
        >
          <span>💬 Kirim ke WhatsApp</span>
        </button>

      </div>
    </div>
    
    <p class="text-center text-xs text-gray-400 mt-10">
      © 2025 Undangan Cuan Project. All Rights Reserved.
    </p>
  </div>
</template>