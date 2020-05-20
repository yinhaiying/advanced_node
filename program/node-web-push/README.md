# 消息推送

## web push实现步骤
1. 客户端完成用户订阅请求
2. 服务端调用遵从webpush协议的请求，传送消息推送(push message)到推送服务器(service worker)
3. 推送服务器将该消息推送至对应的浏览器，用户收到该推送

## service worker
service worker 是独立于当前页面的一段运行在浏览器后台进程里的脚本。
service worker 不需要用户打开web界面，也不需要其他交互，异步地运行在一个完全独立的上下文环境，不会对主线程造成阻塞。基于
service worker可以实现消息推送，静默更新以及地理围栏等服务。

Service Worker简单理解：
一个介于客户端和服务器之间的一个代理服务器。