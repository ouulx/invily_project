<script setup>
import { ref } from "vue"; // <--- [BARU] Wajib import 'ref' buat bikin status buka/tutup
import { useRoute } from "vue-router";
import { clients } from "../data/clients.js";
import Countdown from "../components/Countdown.vue";
import gift from "../components/gift.vue";
import rsvp from "../components/rsvp.vue";
import AudioButton from "../components/AudioButton.vue"; // <--- [BARU] Import tombol musiknya

const route = useRoute();
const data = clients[route.params.slug];

// <--- [BARU] Logic buat nyatet status: "Undangan udah dibuka belum?"
const isOpened = ref(false);

const bukaUndangan = () => {
  console.log("Tombol diklik!"); // Cek di console kalo ragu
  isOpened.value = true; // Ubah status jadi TERBUKA
};
</script>

<template>
  <div v-if="data" class="bg-gray-200 min-h-screen flex justify-center">
    <div
      class="w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative overflow-hidden font-serif text-gray-800 pb-20"
    >
      <AudioButton :file="data.musik" :autoPlay="isOpened" />

      <section
        class="h-screen flex flex-col justify-center items-center text-center p-6 relative bg-pink-50"
      >
        <div
          class="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-br-full opacity-50 blur-2xl"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-32 h-32 bg-orange-200 rounded-tl-full opacity-50 blur-2xl"
        ></div>

        <p class="text-sm tracking-[0.2em] mb-4 text-gray-500 uppercase">
          The Wedding of
        </p>

        <h1 class="text-5xl mb-2 text-pink-600 drop-shadow-sm handwriting">
          {{ data.groom }}
        </h1>
        <span class="text-2xl text-gray-400 my-2">&</span>
        <h1 class="text-5xl mt-2 mb-8 text-pink-600 drop-shadow-sm handwriting">
          {{ data.bride }}
        </h1>

        <div class="border-y border-gray-300 py-4 w-full max-w-xs">
          <p class="font-bold text-lg">{{ data.tanggal }}</p>
        </div>

        <button
          @click="bukaUndangan"
          class="mt-10 px-8 py-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-all transform hover:scale-105 z-10 cursor-pointer"
        >
          💌 Buka Undangan
        </button>
      </section>

      <div v-if="isOpened" class="animate-fade-in transition-all duration-1000">
        <div class="text-center mt-10 p-5">
          <h2 class="text-2xl font-bold mb-4 text-gray-700">Hitung Mundur</h2>
          <Countdown :target="data.waktu" />
        </div>

        <hr class="border-gray-200 my-5 mx-10" />

        <gift :items="data.amplop" />
        <hr class="border-gray-200 my-5 mx-10" />

        <rsvp :noWa="data.noHp" />
        <div
          class="h-40 bg-pink-50 m-5 rounded flex items-center justify-center text-gray-400"
        >
          Galeri Foto (Soon)
        </div>
      </div>
    </div>
  </div>

  <div v-else>404 Data Not Found</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital@0;1&display=swap");

.handwriting {
  font-family: "Great Vibes", cursive;
}
.font-serif {
  font-family: "Playfair Display", serif;
}

/* [BARU] Animasi biar munculnya pelan-pelan (fade in) */
.animate-fade-in {
  animation: fadeIn 1.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
