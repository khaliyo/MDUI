#明道三方应用集成框架

本框架主要面向明道扩展应用的开发者、开发商或者需要将企业自身IT应用集成到明道扩展应用中的IT团队，通过此框架的应用从而达到此应用与明道一致连续的UI布局与风格，使得应用更加专注于自身的内容。

##基础布局框架

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

例图：

![主框架](https://raw.githubusercontent.com/meihua-info/MDUI/master/UI/%E6%95%88%E6%9E%9C%E5%9B%BE/ui.png)

##公共组件

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

例图：

![提示弹层](https://raw.githubusercontent.com/meihua-info/MDUI/master/UI/%E6%95%88%E6%9E%9C%E5%9B%BE/alert.png)

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

例图：

![分页](https://raw.githubusercontent.com/meihua-info/MDUI/master/UI/%E6%95%88%E6%9E%9C%E5%9B%BE/pager.png)

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

例图：

![下拉框](https://raw.githubusercontent.com/meihua-info/MDUI/master/UI/%E6%95%88%E6%9E%9C%E5%9B%BE/select.png)

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

//关闭弹层
md.system.closeDialog();

```
参数说明：
*  *container*   	弹层内容

        内容模板的参数：
        header  弹出层的标题，并包含了关闭按钮，如果没有参数将不显示
        content 弹出层的内容，可以是HTML
        yesFn   确定按钮的回调函数
        noFn    取消按钮的回调函数
        yesText 确定按钮的文本，默认为“确定”
        noText  取消按钮的文本，默认为“取消”

*  *drag*	Boolean 是否支持拖拽
*  *fixed*	Boolean true：固定定位  false:绝对定位
*  *overlay*	Boolean 是否有遮罩层
*  *lock*		Boolean  true：ESC键不关闭弹层  false：ESC键关闭弹出层
*  *autoClose*	Number设置弹出层自动关闭，单位为ms，传参时无需带单位
*  *callback*	设置关闭弹出层后执行的回调函数

例图：

![弹层](https://raw.githubusercontent.com/meihua-info/MDUI/master/UI/%E6%95%88%E6%9E%9C%E5%9B%BE/dialog.png)


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
*  *showOn* 

        取值： 
        hover 默认，鼠标悬浮 
        focus 输入表单聚焦时

*  *showTimeout* 指定时间之后显示，单位为ms
*  *hideTimeout* 指定时间之后隐藏，单位为ms
*  *arrowLeft*	Number 三角图标距离左边距离
*  *arrowRight*	Number 三角图标距离右边距离
*  *alignTo* 

        取值：
        cursor：相对于鼠标位置
        target：相对于作用的元素
        
*  *alignX* 

        取值：
        'right', 'center', 'left', 'inner-left', 'inner-right'
        水平方向相对于鼠标光标（alignTo:cursor）或者目标元素（alignTo:target）的位置

*  *alignY* 

        取值：
        'bottom', 'center', 'top', 'inner-bottom', 'inner-top'
        垂直方向相对于鼠标光标（alignTo:cursor）或者目标元素（alignTo:target）的位置

*  *offsetX* Number 整个元素偏移水平方向的距离
*  *offsetY* Number 整个元素偏移垂直方向的距离
*  *allowTipHover*  Boolean 鼠标悬停上面是否隐藏
*  *fade*  Boolean  淡入淡出的效果
*  *slide* Boolean 滑动的效果
*  *showAniDuration* Number 单位ms，显示动画执行的时间
*  *hideAniDuration* Number 单位ms，隐藏示动画执行的时间
*  *content*

        设置值的方式：
        '[title]' 默认去当前元素的title属性值
        'string' 任意字符串，可以含html
        'function' 以函数的方式执行AJAX请求返回数据
        如：function(updateCallback){
            $.getJSON(url,function(data) {
                updateCallback(data);
            }
            return '数据加载中...';
        }

例图：

![提示浮层](https://raw.githubusercontent.com/meihua-info/MDUI/master/UI/%E6%95%88%E6%9E%9C%E5%9B%BE/tip.png)
  


