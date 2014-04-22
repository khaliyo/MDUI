###MDUI
====

#明道三方集成框架使用说明


##基础框架调用方法

https://cdnfile.mingdao.com/js/jquery-md.js?u=用户ID&p=网络ID

引入以上js文件，参数说明：

*  u 当前登录者用户ID
*  p 当前登录用户所在的网络ID

可以通过调用以下方法获取顶部、左侧导航和底部信息

```javascript
md.api.getAppBaseFrame({
    top: "",
    right: "",
    bootom: "",
    left: "",
    logoutUrl: "",
    customHome : "",
    customHomeWidth : "",
    callbck:function(){
    }
});
```
参数说明：

*  top     顶部的容器名称，可以是id或者class类名  如：#top

*  right    右部的容器名称，可以是id或者class类名  如：#right

*  left     左部的容器名称，可以是id或者class类名  如：#left

*  bottom  底部的容器名称，可以是id或者class类名  如：#bottom

*  logoutUrl 设置退出地址，可以为空

*  customHome 自定义Home（左上角小房子），支持html


