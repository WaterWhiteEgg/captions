// 字幕数组，目前只支持使用一组标签，多组使用会渲染失误，想到了解决方法，不过不急
// color设置背景色 #5fa7d9蓝色 #0fb01d绿色
// 换行符 <br>
// 设置文字样式 <span style='color: red;'></span> 
export const subtitles = [
    { value: "" },
    { value: `一句字幕<br>第一wwwwwwww<br>wwwwwww2222222<br>2222222<br>22222222eee`, color: "#5fa7d9"},
    { value: `一  句  字  幕 <br>2<span style='color: red;'>幕第一</span>`, color: "#5fa7d9"},
    { value: "第一句<br>字幕第一句字 幕第 一句'fff'句 字幕第一句字幕第一句字幕第一句字幕，第一句字幕", color: "#0fb01d" },
    { value: "第一句字幕第一句字 幕第 一句'fff'", color: "#0fb01d" },
    { value: "第一句'fff'句<br>字幕第一句字<span style='color: red;'>幕第一</span>句字幕第一句字幕，第一句字幕", color: "#0fb01d" },

];

// 创建标点符号的正则表达式，有时会默认慢一点
 const punctuationRegex = /[。,，…\s\r]/;
 export function updateIntervalDelay(test) {
    return punctuationRegex.test(test) ? 200 : 60;
  }