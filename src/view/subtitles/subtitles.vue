<template>
  <div class="box">
    <div class="diamond"><span class="diamond-text">成步堂</span></div>
    <div class="subtitle-box">
      <div
        v-if="currentIndex < subtitles.length"
        :key="currentIndex"
        class="subtitle"
        :style="{ color: subtitles[currentIndex].color }"
        v-html="currentSubtitle"
      ></div>
      <div
        @click="nextSubtitle(false)"
        v-if="showButton"
        class="subtitle-next"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
// 文本
import { subtitles, updateIntervalDelay } from "@/assets/text/index";
// 字幕索引值
const currentIndex = ref(0);

// 活跃的要显示的文本
const currentSubtitle = ref(subtitles[currentIndex.value].value);
// 控制点击按钮显示
const showButton = ref(true);

// 下一个活跃文本
const nextSubtitle = (flag = false) => {
  // 超过文本最大值，索引不再增加
  if (currentIndex.value < subtitles.length - 1) {
    currentIndex.value++;
    // 触发点击音效
    // 触发有人不想要音效
    playSound("http://localhost:8080/点击查看.mp3", flag);
    showButton.value = false; // 隐藏按钮
  }
};

// 开启并使用音频
function playSound(src, close = false) {
  // 如果在某种情况下不要音效，请传入close = true
  if (!close) {
    const audio = new Audio(src); // 替换成你的音效文件路径
    audio.play();
  }
}

// 观察索引值的变化，使其切换活跃显示文本
watch(currentIndex, () => {
  // 切换下一个字幕
  currentSubtitle.value = subtitles[currentIndex.value].value;
  // 一字一字显示
  renderSubtitle();
});

// 一个定时器
let interval;
// 控制音乐播放
let closeMusic;
// 文本索引值
let index;
// 当前要修改的字幕
let subtitle = subtitles[currentIndex.value].value;
// 当前的字幕对象
let subtitleItem = subtitles[currentIndex.value];
// 标签后截取的文本
let newSubtitle = "";

// 检测html标签，延迟他让其渲染完成再继续打字机效果（目前只能一次）
function displayNextCharacter() {
  // 尝试正则
  const lessThanRegex = /</g;
  //   console.log( subtitle.substring(0, index).replace(newSubtitle, ""));

  // 判断成功即是匹配到了< 也就是标签的开头，之后，文本会经历停滞,通过.replace(newSubtitle,"")截取已经渲染的标签来复用效果
  if (
    lessThanRegex.test(subtitle.substring(0, index).replace(newSubtitle, ""))
  ) {
    // 不将这个字渲染上去,同时 匹配可能会出现的标签
    // 同时关闭音乐
    closeMusic = true;
    const brTagRegex = /<br>|<span.*?<\/span>/g;

    // 当出现匹配成功的标签时，结束停滞并且渲染,通过.replace(newSubtitle,"")截取已经渲染的标签防止重复调用渲染
    if (
      brTagRegex.test(subtitle.substring(0, index).replace(newSubtitle, ""))
    ) {
      // 记录之前的文本，不再检测
      newSubtitle = subtitle.substring(0, index);

      // 将文本渲染上去
      currentSubtitle.value = subtitle.substring(0, index);
      // 同时关闭音乐
      closeMusic = false;
    }
  }
  // 这里是没有<匹配成功的时候，正常渲染
  else {
    currentSubtitle.value = subtitle.substring(0, index);
  }
  // 每次字数加1
  index++;
  //   继续寻找下一个字
  doNextCharacter();
}
// 下一个字的显示与声音
function doNextCharacter() {
  // 当索引值比字幕长度还短时,继续执行方法,否则停止定时器并显示按钮
  if (index <= subtitle.length) {
    // 更新定时器的时间延迟,currentIntervalDelay是返回值
    let currentIntervalDelay;
    // 如果没有音效则不需要执行,没有音效就证明此打字不计入打字延迟效果
    if (closeMusic) {
      currentIntervalDelay = 0;
    } else {
      // 如果检测标点符号,定时器会减慢数据
      currentIntervalDelay = updateIntervalDelay(subtitle.charAt(index - 1));
    }
    // 清除当前定时器，为了重新提供新的定时器的值
    clearInterval(interval);

    // 重新创建一个定时器，这里其实算递归，没有 index <= subtitle.length 的话会一直执行
    interval = setTimeout(displayNextCharacter, currentIntervalDelay); // 根据新的时间间隔创建新的定时器

    // 同时根据布尔值决定播放音频
    playSound("http://localhost:8080/1_字幕弹出音.mp3", closeMusic);
  } else {
    // 显示按钮
    showButton.value = true;
    // 如果需要直接下一步，不再需要点击
    needNextSubtitle(subtitleItem.skip);
  }
}
// 点击后情况，一字一字显示,且遇到punctuationRegex匹配的情况时变化
function renderSubtitle() {
  // 更新数据
  // 当前要修改的字幕
  subtitle = subtitles[currentIndex.value].value;
  // 当前的字幕对象
  subtitleItem = subtitles[currentIndex.value];
  // 判断长度是否到头了
  if (currentIndex.value < subtitles.length) {
    // 清空当前字幕内容,防止显示之前的所有字体
    currentSubtitle.value = "";
    // 新的索引值
    index = 0;
    // 新的截取字幕
    newSubtitle = "";

    // 更新定时器的时间延迟
    updateIntervalDelay(subtitle.charAt(index - 1));
    // 让currentSubtitle活跃显示字幕的被subtitle赋值,从而当subtitle截取一个个字时动态显示

    // 调用打字机
    displayNextCharacter();
  }
}

// 假设当前有段文本需要自己跳转时
const needNextSubtitle = (flag) => {
  // 直接触发跳转
  if (flag) {
    nextSubtitle(flag);
  }
};
</script>

<style>
/* 定义字体 */
@font-face {
  font-family: "MyCustomFont";
  src: url("@/assets/font/SourceHanSerifCN-Regular-1.otf") format("woff2");
  /* 现代浏览器支持的格式 */
}

/* 定义动画*/
@keyframes swing {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-3px);
  }

  75% {
    transform: translateX(3px);
  }

  100% {
    transform: translateX(0);
  }
}

html,
body {
  font-family: "MyCustomFont", sans-serif;
  /* 使用自定义字体 */
  margin: 0;
  padding: 0;
  background-color: red;
}

.box {
  position: absolute;
  bottom: 40%;
  width: 100vw;
  height: 30vh;
  border-bottom: 4px solid #ffffff;
  border-top: 2px solid #ffffff;
  background-color: #14274c;
}

.subtitle-box {
  display: flex;
  align-items: center;
  padding: 4vh 0;
  height: 100%;
  color: #fff;
}

.subtitle {
  margin-left: 16vw;
  width: 65vw;
  height: 100%;

  font-size: 3rem;
}

.diamond {
  position: absolute;
  top: -7.8%;
  left: 7.8%;
  height: 10vh;
  width: 12vw;
  display: flex;
  justify-content: center;
  background-image: url("@/assets/png/titleBox.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.subtitle-next {
  position: absolute;
  right: 4%;
  top: 35%;
  width: 5vw;
  height: 8vh;
  animation: swing 1.5s ease-in-out infinite;
  /* 应用动画效果 */
  cursor: pointer;
  background-image: url("@/assets/png/arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.diamond-text {
  font-size: 1.4rem;
  color: #fff;
}
</style>
