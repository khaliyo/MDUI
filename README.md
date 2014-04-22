#明道三方集成框架使用说明

##基础框架调用方法

https://cdnfile.mingdao.com/js/jquery-md.js?u=用户ID&p=网络ID

引入以上js文件，参数说明：

*  *u* 当前登录者用户ID
*  *p* 当前登录用户所在的网络ID

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

*  *top*     顶部的容器名称，可以是id或者class类名  如：#top

*  *right*    右部的容器名称，可以是id或者class类名  如：#right

*  *left*     左部的容器名称，可以是id或者class类名  如：#left

*  *bottom*  底部的容器名称，可以是id或者class类名  如：#bottom

*  *logoutUrl* 设置退出地址，可以为空

*  *customHome* 自定义Home（左上角小房子），支持html

*  *customHomeWidth* 自定义Home（左上角小房子）宽度

*  *callback* 回调函数，此函数会在主框架加载完以后执行


**特别说明：**

1.  如果未指定相应的容器名称，那这一块对应的数据将不会呈现；

2.  如果希望呈现效果更好，建议加上 right 容器名称


##公开组件的使用方法

###md.system.alert  提示弹层

使用方法：
```javascript
md.system.alert({ 	
    msg: "", 
    type: "1", 
    timeout: 3000,
    callback:function(){}
});
```
参数说明：

*  *msg*	提示文字
*  *type*	取值1、2、3（ 1成功提示；2 错误提示；3 警告提示）
*  *timeout*	定时关闭提示层（默认为0，不自动关闭）
*  *callback*	提示层关闭后的回调函数

###md.system.pager  分页插件

使用方法：
```javascript
md.system.pager({
    elementID: "#pageDiv",
    pageIndex: 1,
    pageSize: 10,
    count: 100,
    align: "left",
    changePage: function (index) {
        md.system.alert({ msg: index});
    }
});
```
参数说明：

*  *elementID*	分页插件将要显示在哪个容器内
*  *pageIndex*	当前页
*  *pageSize*	每页显示数据数量
*  *count*	总记录数
*  *align*	对齐方式（left、right、center）
*  *changePage*	点击页码时的回调函数 返回当前页码


###md.system.select   下拉框插件

使用方法：
```javascript
md.system.select({
    elementID: "#hidden_GroupID",
    dataArr: [
        { name: 'iso认证小组', id: '1' },
        { name: '开发小组', id: '2' },
        { name: '实习生管理群', id: '3' },
        { name: '明道学院筹备', id: '4' },
        { name: '年度方案客户', id: '5' },
        { name: '腾讯广告项目组', id: '6' }
    ],
    imageType: 1,
    onChange: function (value, text) {
        md.system.alert({ msg: text, type: "3", autoClose: true });
    }
});
```
参数说明：

*  *elementID*	指定一个元素用于生成下拉框（使用隐藏类型的input，选中后的值会自动填充到value属性上）
*  *dataArr*	数据格式：({ name: '1', id: '1' }, { name: '2', id: '2' })
*  *defaultOptionText*	默认选中项显示的文字
*  *defaultOptionValue*	默认选中项对应的值
*  *defualtSelectedValue*	指定默认选中值
*  *url*	根据指定的url地址获取数据

        *  返回成功格式{result:'1',list:[{ name: '1', id: '1' }, { name: '2', id: '2' })]} 
        *  返回失败格式{result:'0',list:[{})]} 
*  *appendArr*	数据格式：({ name: '1', id: '1' }, { name: '2', id: '2' })
*  *imageType*	1 三角图标  2 上下箭头
*  *width*	设置宽度
*  *align*	文字对齐方式 (left、center、right)
*  *lineHeight*	行高
*  *fontSize*	指定字体大小
*  *zIndex*	指定css z-index值
*  *filterSelect*	布尔值，是否过滤以选择项
*  *positionDiretion*	top、bottom 下拉框呈现的位置
*  *onChange*	function (value, text) { }回调函数，value选择项的值，text选择项的文本


###md.system.dialog  弹层插件

使用方法：
```javascript
md.system.dialog({
 	container: {
        header: '弹出层标题',
        content: '弹出层内容',
        width: 500,
        yesFn: function () {
            alert("msg");
        },
        noFn: true
    }
});
```
更多参数说明请参考  http://www.lanrentuku.com/down/js/qita-862/


###md.system.tip  hover提示浮层
使用方法：
```javascript
md.system.tip({
     elementID: "#tip",
     showTimeout: 0,
     alignTo: 'target',
     alignX: 'center',
     alignY: 'bottom',
     offsetY: 8,
     content: "<div style='padding:10px;'>提示信息</div>"
 });
```
参数说明：

*  *elementID*   	作用到的元素
*  *arrowLeft*	三角图标距离左边距离（px）
*  *arrowRight*	三角图标距离右边距离（px）

更多参数说明请参考 http://vadikom.com/demos/poshytip/


  


