## 目标

记录下自己公司和 js 友商的 APP 桥接的过程

## 代码展示

/more

```js
// 环境判断
const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;

// 初始化桥接
initBridge(callback) {
  if (isAndroid) {  /**安卓端创建桥接*/
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function () {
          callback(WebViewJavascriptBridge)
        },
        false
      );
    }
  } else { /**苹果端创建桥接*/
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
  }
}

initBridge(bridge => {
  // 调用Native方法
  bridge.callHandler(方法名, 参数, res => {
    ...执行对应操作
  })
  // 注册方法
  bridge.registerHandler(方法名, res => {
    ...执行对应操作
  })
})
```
