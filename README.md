# captions
逆转裁判，简易字幕网页版
## 下载依赖包
```
npm install
```

### 运行网页（本地测试）
```
npm run serve
```

### Tips
由于浏览器同源策略，媒体文件不可以直接应用于网页，如果需要使用assets的音频则需要将其放置在8080端口的本地服务器上面
_为什么要8080呢，因为我就写了8080，如果你优先 npm run serve 导致http-server端口是8081之类觉对会报错的。。。_
 - 使用 npm 全局安装 http-server：

 `npm install -g http-server`
 
- 切换到你的音频文件所在的目录，然后运行 http-server：

 `http-server`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
