# html5多线程（Web Worker）
我们都知道JS是单线程的，如何实现多线程呢？我们可以在浏览器中实现多线程，HTML5提供了Web Worker api实现多线程。

# 多线程可以解决哪些问题呢？
* 对复杂算法或计算量大的代码块应用多线程。
* 可以实现轮询，改变某些状态；
* 页头消息状态更新，比如页头的消息个数通知；
* 高频用户交互，拼写检查，譬如：根据用户的输入习惯、历史记录以及缓存等信息来协助用户完成输入的纠错、校正功能等
* 加密：加密有时候会非常地耗时，特别是如果当你需要经常加密很多数据的时候（比如，发往服务器前加密数据）。
* 预取数据：为了优化网站或者网络应用及提升数据加载时间，你可以使用 Workers 来提前加载部分数据以备不时之需。

# 如何使用Web Worker
1、新建worker线程：
```js
const worker = new Worker('src/worker.js');
```
2、postMessage() 方法和 onmessage 事件处理函数是 Workers 的黑魔法，postMessage用于发送消息，onmessage用于监听消息。
```js
const worker = new Worker('src/worker.js');

worker.onmessage = e => {
  console.log(e.data);
};

worker.postMessage('发送消息；hello!');
```
注意：在主线程中使用时，onmessage 和 postMessage() 必须挂在 worker 对象上，而在 worker 中使用时不用这样做。原因是，在 worker 内部，worker 是有效的全局作用域。

3、异常处理
```js
worker.onerror = function(error) {
  console.log(error.message);
  throw error;
};
```

# 兼容性
![worker兼容性分析](https://raw.githubusercontent.com/chenfengyanyu/my-web-accumulation/master/images/webworker/hack.png)

# 局限性
* 1、不允许本地文件
Chrome doesn’t let you load web workers when running scripts from a local file.报错：
```js
Uncaught SecurityError: Failed to create a worker: 
script at '(path)/worker.js' 
cannot be accessed from origin 'null'.
```
解决办法：可以启动一个本地服务器，建议使用 http-server。

* 2、同源限制
* 3、文件限制
* 4、内容安全策略
* 5、workers 和主线程间的数据传递通过这样的消息机制进行：双方都使用 postMessage() 方法发送各自的消息，使用onmessage 事件处理函数来响应消息（消息被包含在 Message 事件的 data 属性中）。
* 6、在 worker 内，不能直接操作 DOM 节点，也不能使用 window 对象的默认方法和属性。然而我们可以使用大量window 对象之下的东西，包括 WebSockets，IndexedDB 以及 FireFox OS 专用的 Data Store API 等数据存储机制。

# 项目demo介绍：
demo目录结构：
├── index.html
└── src
    ├── main.js
    └── worker.js
    └── worker2.js

# 总结：
* demo中的两个线程worker和worker2可以实现多线程，互不干扰。

# 参考链接：
[浅谈webWorker](https://www.cnblogs.com/giggle/p/5350288.html)
[web-worker](http://jartto.wang/2018/12/26/web-worker/)
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
