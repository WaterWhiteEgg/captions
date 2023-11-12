<template>
  <div class="box">
    <div v-if="currentIndex < subtitles.length" :key="currentIndex">
      {{ currentSubtitle }}
    </div>
    <button @click="nextSubtitle" v-if="showButton">下一个</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// 索引值
const currentIndex = ref(0);
// 文本
const subtitles = ["", "第一句字幕第一句字 幕第 一句'fff'句 字幕第一句字幕第一句字幕第一句字幕，第一句字幕", "第二句字幕", "第三句字幕"]; // 字幕数组
// 活跃的要显示的文本
const currentSubtitle = ref(subtitles[currentIndex.value]);
// 控制点击按钮显示
const showButton = ref(true);

// 下一个活跃文本
const nextSubtitle = () => {
  // 超过文本最大值，索引不再增加
  if (currentIndex.value < subtitles.length - 1) {
    currentIndex.value++;
    // 触发点击音效
    playSound("http://localhost:8080/点击查看.mp3")
    showButton.value = false; // 隐藏按钮
  }
};

// 开启并使用音频
function playSound(src) {
  const audio = new Audio(src); // 替换成你的音效文件路径
  audio.play();
}


// 节流阀
function throttle(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}
// 观察索引值的变化，使其切换活跃显示文本
watch(currentIndex, (index) => {
  // 切换下一个字幕
  currentSubtitle.value = subtitles[currentIndex.value];
  // 一字一字显示
  renderSubtitle()


});
// 创建标点符号的正则表达式
const punctuationRegex = /[。,，\s]/;

// 更新定时器的时间延迟
function updateIntervalDelay(test) {
  return punctuationRegex.test(test) ? 200 : 60;
}
// 一字一字显示,且遇到punctuationRegex匹配的情况时变化
function renderSubtitle() {
  // 判断长度是否到头了
  if (currentIndex.value < subtitles.length) {
    // 清空当前字幕内容,防止显示所有字体
    currentSubtitle.value = '';
    // 当前要修改的字幕
    let subtitle = subtitles[currentIndex.value];
    // 新的索引值
    let index = 0;
    // 一个定时器
    let interval;
    // 更新定时器的时间延迟
    updateIntervalDelay(subtitle.charAt(index - 1))
    // 让currentSubtitle活跃显示字幕的被subtitle赋值,从而当subtitle截取一个个字时动态显示
    function displayNextCharacter() {
      currentSubtitle.value = subtitle.substring(0, index);
      index++;
      // 当索引值比字幕长度还小时,继续执行方法,否则停止定时器并显示按钮
      if (index <= subtitle.length) {
        // 更新定时器的时间延迟,currentIntervalDelay是返回值
        let currentIntervalDelay = updateIntervalDelay(subtitle.charAt(index - 1));
        // 清除当前定时器，为了重新提供新的定时器的值
        clearInterval(interval);
        // 重新创建一个定时器，这里其实算递归，没有 index <= subtitle.length 的话会一直执行 
        interval = setTimeout(displayNextCharacter, currentIntervalDelay); // 根据新的时间间隔创建新的定时器
        // 同时播放音频
        playSound("http://localhost:8080/1_字幕弹出音.mp3")

      } else {
        // 显示按钮
        showButton.value = true;
      }
    }

    // 别忘了这里的函数不是displayNextCharacter而是renderSubtitle，要使用还要调用它
    displayNextCharacter();
  }
}
</script>


<style>
/* 样式部分保持不变 */
.subtitle {
  height: 20px;
  overflow: hidden;
  animation: showSubtitle 6.3s steps(30, end) forwards;
  /* 3秒显示完整句子 */
}

@keyframes showSubtitle {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>

