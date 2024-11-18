<template>
  <div
    class="background"
    :style="{ backgroundImage: 'url(' + bgcUrl   + ')' }"
  >
    <subtitles ref="subtitlesRef"></subtitles>
  </div>
</template>

<script setup>
import subtitles from "@/view/subtitles/subtitles.vue";
import { subtitlesText } from "../../assets/text/index";
import { ref, reactive, onMounted, watch } from "vue";
// subtitles的ref
const subtitlesRef = ref();
// 当前页面的背景
const bgcUrl = ref("http://localhost:8080/png/background/逆转系列制作常规素材/法庭相关背景图1080P/法庭正面图.png");
// 监听页数变化
watch(
  () => subtitlesRef?.value?.currentIndex,
  (newV) => {}
);
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-size:  100% auto;  /* 高度填满，宽度自适应 */
  background-repeat: no-repeat; /* 不重复背景 */
  background-position: center center; /* 背景居中 */
}
</style>
