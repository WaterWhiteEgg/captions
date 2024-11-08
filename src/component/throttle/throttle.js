
// 节流阀
let timer = null;
export function throttle(func, delay) {
  return function () {
    if (!timer) {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };}