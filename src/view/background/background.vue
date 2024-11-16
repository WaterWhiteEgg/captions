<template>
  <div class="background">
    <subtitles></subtitles>
  </div>
</template>

<script setup>
import subtitles from "@/view/subtitles/subtitles.vue";

import { ref, reactive } from "vue";
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/png/ui/arrow.png");
}
</style>
