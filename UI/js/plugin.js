/*
** alert插件
*/
(function ($) {
    $.fn.Alert = function (param) {
        var defaults = {
            msg: "",
            type: "1",
            timeout: 0,
            callback: function () { }
        };

        var options = $.extend(defaults, param);

        this.each(function () {
            var _this = $(this);

            _this.timer = null;
            _this.init=function(){
                _this.clearTimer();
                var alterDialog = $("<span/>").attr("id", "mdAlertDialog");
                if (options.type) {
                    if (options.type == 2)
                        alterDialog.addClass("errorDialog");
                    else if (options.type == 3)
                        alterDialog.addClass("warningDialog");
                }
                var message = $("<span/>").text(options.msg).appendTo(alterDialog);
                var close = $("<a/>").attr("href", "javascript:;").addClass("mdClose").text("×").click(function () {
                    _this.close();
                    _this.clearTimer();
                }).appendTo(alterDialog);
                $(document.body).append(alterDialog);
                var clientW = document.documentElement.clientWidth;
                var clientH = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
                var scrollH = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                $("#mdAlertDialog").css({ top: "30%", left: ($(window).width() - $("#mdAlertDialog").width()) / 2 + "px" });
                if (options.timeout != 0) {
                    _this.timer = setTimeout(function () {
                        _this.close();
                    }, options.timeout);
                }
            };
            _this.close = function (isInit) {
                $("#mdAlertDialog").remove();
                _this.callback();
            };
            _this.clearTimer = function () {
                if (_this.timer != null) {
                    clearTimeout(_this.timer);
                    _this.timer = null;
                }
            };
            _this.callback = function () {
                if (options.callback)
                    options.callback();
            };
            _this.init();
        });
    };  
})(jQuery);

/*
**分页插件
*/
(function ($) {
    $.fn.Pager = function (param) {
        new $Pager(this, param);
        return $(this);
    };
    var $Pager = function (el, settings) {
        var $this = this;

        var options = $.extend({
            pageIndex: 1,
            pageSize: 20, //每页显示多少条
            count: 0, //总共多少条数据
            pageCount: 5, //超过几页显示 ...
            align: 'center', //页码呈现的位置
            prev: '上一页',
            next: '下一页',
            changePage: function (pageIndex) { }
        }, settings);

        $this.init = function () {
            if ($(el).find("div.mdPager").length == 0) {
                var pagerObj = $('<div/>');
                if (options.className) {
                    pagerObj.addClass(options.className);
                }
                pagerObj.addClass("mdPager");
                $(el).append(pagerObj);
            }
            $this.create();
        }
        $this.showPages = options.pageCount; //最多展示几页
        $this.pageIndex = 1; //当前数据的第几页
        if (options.pageIndex)
            $this.pageIndex = options.pageIndex;
        $this.pageCount = options.pageCount;

        $this.create = function () {
            var pageParent = $('<div/>').attr("align", options.align);
            var totalPages = Math.ceil(options.count / options.pageSize)
            var pageItem = "";
            if ($this.pageIndex != 1) {
                pageItem = $('<a/>').addClass("pageBtn").attr("href", "javascript:void(0)").text(options.prev).click(function () {
                    $this.changePage(null, $this.pageIndex - 1);
                });
            } else
                pageItem = $('<span/>').addClass("pageBtnDisable").text(options.prev);
            pageParent.append(pageItem);

            if (totalPages > ($this.showPages + 1)) {
                if ($this.pageIndex < $this.pageCount - 1) {
                    for (var i = 1; i <= $this.showPages; i++) {
                        if ($this.pageIndex == i)
                            pageItem = $('<span/>').addClass("pageOn").text(i);
                        else
                            pageItem = $('<a/>').attr("href", "javascript:void(0)").text(i).click(function () {
                                $this.changePage(this);
                            });
                        pageParent.append(pageItem);
                    }
                    pageParent.append($('<span/>').text("..."));
                    pageItem = $('<a/>').attr("href", "javascript:void(0)").text(totalPages).click(function () {
                        $this.changePage(null, totalPages);
                    });
                    pageParent.append(pageItem);
                } else {
                    pageItem = $('<a/>').attr("href", "javascript:void(0)").text(1).click(function () {
                        $this.changePage(null, 1);
                    });
                    pageParent.append(pageItem);
                    if ($this.pageIndex > $this.pageCount - 1)
                        pageParent.append($('<span/>').text("..."));

                    if (totalPages < $this.pageIndex + $this.pageCount - 1) {
                        var startIndex = $this.pageIndex - 2;
                        if (totalPages - startIndex < $this.pageCount - 1)
                            startIndex = totalPages - ($this.pageCount - 1);
                        for (var i = startIndex; i <= totalPages; i++) {
                            if ($this.pageIndex == i)
                                pageItem = $('<span/>').addClass("pageOn").text(i);
                            else
                                pageItem = $('<a/>').attr("href", "javascript:void(0)").text(i).click(function () {
                                    $this.changePage(this);
                                });
                            pageParent.append(pageItem);
                        }
                    } else {
                        var currentLeftRightCount = (($this.pageCount - 1) / 2);
                        for (var i = $this.pageIndex - currentLeftRightCount; i <= $this.pageIndex + currentLeftRightCount; i++) {
                            if ($this.pageIndex == i) {
                                pageItem = $('<span/>').addClass("pageOn").text(i);
                            } else {
                                pageItem = $('<a/>').attr("href", "javascript:void(0)").text(i).click(function () {
                                    $this.changePage(this);
                                });
                            }
                            pageParent.append(pageItem);
                        }
                        pageParent.append($('<span/>').text("..."));
                        pageItem = $('<a/>').attr("href", "javascript:void(0)").text(totalPages).click(function () {
                            $this.changePage(null, totalPages);
                        });
                        pageParent.append(pageItem);
                    }
                }
            } else {
                for (var i = 1; i <= totalPages; i++) {
                    if ($this.pageIndex == i) {
                        pageItem = $('<span/>').addClass("pageOn").text(i);
                    } else {
                        pageItem = $('<a/>').attr("href", "javascript:void(0)").text(i).click(function () {
                            $this.changePage(this);
                        });
                    }
                    pageParent.append(pageItem);
                }
            }

            if ($this.pageIndex != totalPages) {
                pageItem = $('<a/>').addClass("pageBtn").attr("href", "javascript:void(0)").text(options.next).click(function () {
                    $this.changePage(null, (parseInt($this.pageIndex) + 1));
                });
            } else
                pageItem = $('<span/>').addClass("pageBtnDisable").text(options.next);
            pageParent.append(pageItem);

            if (options.count > options.pageSize) {
                $(el).find("div.mdPager").empty().append(pageParent).show();
            } else {
                $(el).find("div.mdPager").empty().hide();
            }
        }
        $this.changePage = function (obj, pIndex) {
            if (obj) {
                $this.pageIndex = Number($(obj).text());
            } else
                $this.pageIndex = pIndex;
            options.changePage($this.pageIndex);
            $this.create();
        }
        $this.init();
    }
})(jQuery);

/*
**下拉框
*/
(function ($) {
    $.fn.MDSelect = function (param) {
        $(this).each(function () {
            new $MDSelect(this, param);
        });
        return $(this);
    };

    var $MDSelect = function (el, param) {
        var $this = this; //当前类实例化对象
        $this.el = el; //input对象
        var settings = $.extend({
            defaultOptionText: "",
            defaultOptionValue: "",
            defualtSelectedValue: "", //默认选中值
            url: "", //根据URL地址直接获取符合数据 与dataArr格式一致 返回的变量名为 list { id,name}
            dataArr: [], //数据 格式({ name: 'iso20252认证小组', id: '1' }, { name: 'Workspace开发小组', id: '2' })  name和id固定
            appendArr: [], //附加数据 格式({ name: 'iso20252认证小组', id: '1' })
            imageType: "1", //1 三角图标  2 上下箭头
            width: 110,
            align: "left",
            lineHeight: 30,
            fontSize: 12,
            filterSelect: false, //是否过滤以选择项
            positionDiretion: "bottom",
            showType: "1", // "1":默认呈现方式 "2":没有hover效果的呈现方式 3 hover 出下划线
            style: "",
            zIndex: 10,
            onChange: function (value, text) { }
        }, param);
        var options = {
            linkStyle: "bgImageLink",
            clickStyle: "bgImageClick"
        };
        $this.init = function () {
            if (settings.imageType == "2") {
                options.linkStyle = "bgImageOrderByLink";
                options.clickStyle = "bgImageOrderByClick";
            }

            $this.clear();

            $(document).click(function (event) {
                if ($(event.target).parents("div.mdSelect").length == 0) {
                    $(".csList").hide();
                    $(el).next("div.mdSelect").find(".spanShow").removeClass("titleClick").addClass("titleLink");
                    $(el).next("div.mdSelect").find(".bgImage").removeClass(options.clickStyle).addClass(options.linkStyle);
                }
            });

            settings.style = "height:" + settings.lineHeight + "px;line-height:" + settings.lineHeight + "px;text-align:" + settings.align + ";";
            settings.style2 = "height:20px;line-height:20px;text-align:" + settings.align + ";";
            if ($(el).next("div.mdSelect").length == 0) {
                var view = $('<div/>').addClass("mdSelect").css("z-index", settings.zIndex);
                var top = settings.showType == 3 ? Number(28) + "px;" : (Number(settings.lineHeight) + 5) + "px;";
                var list = $("<div/>").attr("id", "csList").attr("scroll", "0").attr("style", "min-width:" + settings.width + "px;width:expression(this.width<" + settings.width + "?'" + settings.width + "px':true);top:" + top).addClass("csList");
                var ul = $("<ul/>").appendTo(list);
                var container = $('<span/>').addClass("spanShow").addClass("title").attr("style", settings.showType == 3 ? settings.style2 : settings.style + "font-size:" + settings.fontSize + "px;").appendTo(view).after(list).mouseover(function () {
                    if (settings.showType == "1") {
                        $(this).removeClass("titleLink").addClass("titleHover");
                    } else if (settings.showType == "3") {
                        $(this).find("span:first").addClass("Underline");
                    }
                }).mouseout(function () {
                    if (settings.showType == "1") {
                        $(this).removeClass("titleHover").addClass("titleLink");
                    } else if (settings.showType == "3") {
                        $(this).find("span:first").removeClass("Underline");
                    }
                }).click(function () {
                    $this.showList(this);
                });
                if (settings.showType == "2")
                    container.addClass("pAll0");

                if (settings.showType == 3) {
                    container.addClass("titleBorder mdThemeBorderColor4");
                } else {
                    container.addClass("borderRadius5");
                }

                if (settings.showType == 3) {
                    $("<span/>").addClass("txtBox mdThemeColor3").attr("first", "1").attr("style", settings.style2).attr("itemValue", settings.defaultOptionValue).text(settings.defaultOptionText).appendTo(container);
                    $("<span/>").addClass("icon-arrow-down Font12 mdThemeColor3").attr("style", settings.style2 + (settings.showType == "3" ? ";margin-left:5px" : "")).appendTo(container);
                } else {
                    $("<span/>").addClass("txtBox").attr("first", "1").attr("style", settings.style).attr("itemValue", settings.defaultOptionValue).text(settings.defaultOptionText).appendTo(container);
                    $("<span/>").addClass("bgImage").attr("style", (settings.showType == "2" ? "margin-left:5px;" : "")+(settings.imageType == "2" ? "margin-top:10px;" : "margin-top:12px;")).addClass(options.linkStyle).appendTo(container);
                }



                $("<span/>").addClass("clear").appendTo(container);

                $(el).after(view);
                if (settings.defualtSelectedValue != '' || settings.defaultOptionValue == '') {
                    $this.getData();
                } else {
                    $this.setValue(settings.defaultOptionValue, settings.defaultOptionText);
                }
            }
        };
        //创建下拉列表
        $this.createList = function (list) {
            $(el).next("div.mdSelect").find(".csList").hide();
            var ul = $(el).next("div.mdSelect").find(".csList ul");
            var newList = new Array();
            if (settings.defaultOptionText != '') {
                newList.push({ id: settings.defaultOptionValue, name: settings.defaultOptionText });
            }
            newList = newList.concat(settings.dataArr);
            newList = newList.concat(list);
            newList = newList.concat(settings.appendArr);

            for (var i = 0; i < newList.length; i++) {
                var item = newList[i];
                ul.append($this.createItem(item.id, item.name, item.disabled));
            }
            if (settings.appendArr.length > 0) {
                ul.find("li").eq(newList.length - settings.appendArr.length).addClass("topLine");
            }
            if (($(el).next("div.mdSelect").find(".txtBox").text() == "" || el.value == '') && newList.length > 0) {
                $this.setValue(newList[0].id, newList[0].name);
            }
        };
        $this.setValue = function (id, name) {
            $(el).val(id);
            var cur = $(el).next("div.mdSelect").find(".txtBox").attr("itemValue", id);
            cur.text($this.cutstring(name, 14)).attr("title", name);
        };
        //创建下拉列表项
        $this.createItem = function (id, name, disabled) {
            if (settings.defualtSelectedValue != "" && id == settings.defualtSelectedValue) {
                $this.setValue(id, name);
            }
            var li = $("<li/>").attr("style", settings.style).attr("itemValue", id);
            if (!disabled) {
                li.mouseover(function () {
                    $(this).addClass("listSpanHover").addClass("mdThemeBGColor3");
                }).mouseout(function () {
                    $(this).removeClass("listSpanHover").removeClass("mdThemeBGColor3");
                }).click(function () {
                    $this.onchange(this);
                });
            } else {
                li.addClass("Gray_a");
            }
            li.text(name);
            return li;
        };
        //获取数据
        $this.getData = function (callback) {
            if (settings.url != '') {
                $.ajax({
                    type: "POST",
                    url: settings.url,
                    success: function (data) {
                        if (data.result == "1") {
                            if (data.list != null) {
                                $(el).next("div.mdSelect").find(".csList ul").empty();
                                $this.createList(data.list);

                                if (callback) {
                                    callback.call(this);
                                }

                            }
                        }
                    }
                });
            } else {
                $this.createList([]);
                if (callback) {
                    callback.call(this);
                }
            }
        };
        //显示列表
        $this.showList = function (obj) {
            $(".csList").hide();
            /*还原原始状态*/
            if (settings.showType == "1") {
                $(".spanShow").removeClass("titleHover").removeClass("titleClick").addClass("titleLink");
                $(".bgImage").each(function () {
                    if ($(this).attr("class").indexOf("OrderBy") > -1) {
                        $(this).removeClass("bgImageOrderByClick").addClass("bgImageOrderByLink");
                    } else {
                        $(this).removeClass("bgImageClick").addClass("bgImageLink");
                    }
                });
                /*设置当前状态*/
                $(obj).removeClass("titleHover").removeClass("titleLink").addClass("titleClick");
                $(obj).find(".bgImage").removeClass(options.linkStyle).addClass(options.clickStyle);
            }
            if ($(el).next("div.mdSelect").find(".csList ul li").length == 0) {
                $this.getData(function () {
                    $this.show(obj);
                    $this.changewidth();
                });
            } else {
                $this.show(obj);
                $this.changewidth();
            }
        };
        $this.show = function (obj) {
            if (settings.filterSelect) {
                var selectedValue = $(el).val();
                $(el).next("div.mdSelect").find("li").show();
                $(el).next("div.mdSelect").find("li[itemvalue='" + selectedValue + "']").hide();
            }

            $(el).next("div.mdSelect").find(".csList").show();
            if ($(obj).attr("first") == "1") {
                $(obj).attr("first", "0");
            }
        };
        $this.cutstring = function (msg, cutLength) {
            if (!msg)
                return '';
            var strLength = 0;
            var cutStr = "";
            if (cutLength >= $this.countlength(msg)) {
                cutStr = msg;
            } else {
                for (var i = 0; i < msg.length; i++) {
                    if (msg.charAt(i) > '~') {
                        strLength += 2;
                    } else {
                        strLength += 1;
                    }
                    if (strLength > cutLength) {
                        cutStr = msg.substring(0, i) + "...";
                        break;
                    }
                }
            }
            return cutStr;
        };
        $this.countlength = function (msg) {
            var strLength = 0; 
            for (var i = 0; i < msg.length; i++) 
            { 
                if (msg.charAt(i) > '~') 
                    strLength += 2; 
                else 
                    strLength += 1; 
            } 
            return strLength; 
        };
        $this.onchange = function (obj) {
            var name = $(obj).text();
            var cur = $(el).next("div.mdSelect").find(".txtBox");
            cur.text($this.cutstring(name, 14)).attr("title", name);
            cur.parent().removeClass("titleClick").removeClass("titleHover").addClass("titleLink");
            //下拉箭头
            if (settings.showType != 3) {
                cur.next().removeClass(options.clickStyle).addClass(options.linkStyle);
            }
            $(el).next("div.mdSelect").find(".csList").hide();
            $(el).val($(obj).attr("itemValue"));
            if (settings.onChange) {
                settings.onChange.call(this, $(obj).attr("itemValue"), name);
            }
        };
        $this.changewidth = function () {
            if ($(el).next("div.mdSelect").find(".csList").height() >= 300 && $(el).next("div.mdSelect").find(".csList").attr("scroll") == "0") {
                $(el).next("div.mdSelect").find(".csList").width($(el).next("div.mdSelect").find(".csList").width() + 15);
                $(el).next("div.mdSelect").find(".csList").attr("scroll", "1");
            }

            if (settings.positionDiretion == "top") {
                var top = Number($(el).next("div.mdSelect").find(".csList").height()) + Number(settings.lineHeight) - 10;
                $(el).next("div.mdSelect").find(".csList").css("top", "-" + top + "px");
            }
        };
        $this.clear = function () {
            $(el).next().remove();
            $(el).val("");
        };
        $this.init();
    };
})(jQuery);

/** 
* 弹层
*/
(function (win, undefined) {

    var doc = win.document,
	docElem = doc.documentElement;

    var easyDialog = function () {

        var body = doc.body,
	isIE = ! -[1, ], // 判断IE6/7/8 不能判断IE9
	isIE6 = isIE && /msie 6/.test(navigator.userAgent.toLowerCase()), // 判断IE6
	uuid = 1,
	expando = 'cache' + (+new Date() + "").slice(-8),  // 生成随机数
	cacheData = {
	    /**
	    *	1 : {
	    *		eclick : [ handler1, handler2, handler3 ]; 
	    *		clickHandler : function(){ //... }; 
	    *	} 
	    */
	};

        var Dialog = function () { };

        Dialog.prototype = {
            // 参数设置
            getOptions: function (arg) {
                var i,
			options = {},
                // 默认参数
			defaults = {
			    container: null, 		// string / object   弹处层内容的id或内容模板
			    overlay: true, 		// boolean  		 是否添加遮罩层
			    drag: true, 		// boolean  		 是否绑定拖拽事件
			    fixed: true, 		// boolean  		 是否静止定位
			    follow: null, 		// string / object   是否跟随自定义元素来定位
			    followX: 0, 			// number   		 相对于自定义元素的X坐标的偏移
			    followY: 0, 			// number  		     相对于自定义元素的Y坐标的偏移
			    autoClose: 0, 			// number            自动关闭弹出层的时间
			    lock: false, 		// boolean           是否允许ESC键来关闭弹出层
			    callback: null			// function          关闭弹出层后执行的回调函数
			    /** 
			    *  container为object时的参数格式
			    *	container : {
			    *		header : '弹出层标题',
			    *		content : '弹出层内容',
			    *		yesFn : function(){},	    // 确定按钮的回调函数
			    *		noFn : function(){} / true,	// 取消按钮的回调函数
			    *		yesText : '确定',		    // 确定按钮的文本，默认为‘确定’
			    *		noText : '取消' 		    // 取消按钮的文本，默认为‘取消’		
			    *	}		
			    */
			};

                for (i in defaults) {
                    options[i] = arg[i] !== undefined ? arg[i] : defaults[i];
                }
                Dialog.data('options', options);
                return options;
            },

            // 防止IE6模拟fixed时出现抖动
            setBodyBg: function () {
                if (body.currentStyle.backgroundAttachment !== 'fixed') {
                    body.style.backgroundImage = 'url(about:blank)';
                    body.style.backgroundAttachment = 'fixed';
                }
            },

            // 防止IE6的select穿透
            appendIframe: function (elem) {
                elem.innerHTML = '<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>';
            },

            /**
            * 设置元素跟随定位
            * @param { Object } 跟随的DOM元素
            * @param { String / Object } 被跟随的DOM元素
            * @param { Number } 相对于被跟随元素的X轴的偏移
            * @param { Number } 相对于被跟随元素的Y轴的偏移
            */
            setFollow: function (elem, follow, x, y) {
                follow = typeof follow === 'string' ? doc.getElementById(follow) : follow;
                var style = elem.style;
                style.position = 'absolute';
                style.left = Dialog.getOffset(follow, 'left') + x + 'px';
                style.top = Dialog.getOffset(follow, 'top') + y + 'px';
            },

            /**
            * 设置元素固定(fixed) / 绝对(absolute)定位
            * @param { Object } DOM元素
            * @param { Boolean } true : fixed, fasle : absolute
            */
            setPosition: function (elem, fixed) {
                var style = elem.style;
                style.position = isIE6 ? 'absolute' : fixed ? 'fixed' : 'absolute';
                if (fixed) {
                    if (isIE6) {
                        style.setExpression('top', 'fuckIE6=document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"');
                    }
                    else {
                        style.top = '50%';
                    }
                    style.left = '50%';
                }
                else {
                    if (isIE6) {
                        style.removeExpression('top');
                    }
                    style.top = docElem.clientHeight / 2 + Dialog.getScroll('top') + 'px';
                    style.left = docElem.clientWidth / 2 + Dialog.getScroll('left') + 'px';
                }
            },

            /**
            * 创建遮罩层
            * @return { Object } 遮罩层 
            */
            createOverlay: function () {
                var overlay = doc.createElement('div'),
			style = overlay.style;

                style.cssText = 'margin:0;padding:0;border:none;width:100%;height:100%;background:black;opacity:0.1;filter:alpha(opacity=10);z-index:9999;position:fixed;top:0;left:0;';

                // IE6模拟fixed
                if (isIE6) {
                    body.style.height = '100%';
                    style.position = 'absolute';
                    style.setExpression('top', 'fuckIE6=document.documentElement.scrollTop+"px"');
                }

                overlay.id = 'overlay';
                return overlay;
            },

            /**
            * 创建弹出层
            * @return { Object } 弹出层 
            */
            createDialogBox: function () {
                var dialogBox = doc.createElement('div');
                dialogBox.style.cssText = 'margin:0;padding:0;border:none;z-index:10000;';
                dialogBox.id = 'easyDialogBox';
                return dialogBox;
            },

            /**
            * 创建默认的弹出层内容模板
            * @param { Object } 模板参数
            * @return { Object } 弹出层内容模板
            */
            createDialogWrap: function (tmpl) {

                // 弹出层标题
                var header = tmpl.header ?
			'<div class="easyDialog_title" id="easyDialogTitle"><a href="javascript:void(0)" title="关闭窗口" class="close_btn" id="closeBtn">&times;</a><span class="tag"></span>' + tmpl.header + '</div>' :
			'',
                // 确定按钮
			yesBtn = typeof tmpl.yesFn === 'function' ?
				'<button class="btn_highlight mdBtn mdBtn-enable" id="easyDialogYesBtn">' + (typeof tmpl.yesText === 'string' ? tmpl.yesText : '确定') + '</button>' :
				'',
                // 取消按钮	
			noBtn = typeof tmpl.noFn === 'function' || tmpl.noFn === true ?
				'<a class="btn_normal mdBtn-cancle" id="easyDialogNoBtn" href="javascript:;">' + (typeof tmpl.noText === 'string' ? tmpl.noText : '取消') + '</a>' :
				'',
                // footer
			footer = yesBtn === '' && noBtn === '' ? '' :
				'<div class="easyDialog_footer">' + yesBtn + noBtn + '</div>',

			dialogTmpl = [
			'<div class="easyDialog_content">',
				header,
				'<div class="easyDialog_text">' + tmpl.content + '</div>',
				footer,
			'</div>'
			].join(''),

			dialogWrap = doc.getElementById('easyDialogWrapper'),
			rScript = /<[\/]*script[\s\S]*?>/ig;
                if (!dialogWrap) {
                    dialogWrap = doc.createElement('div');
                    dialogWrap.id = 'easyDialogWrapper';
                    dialogWrap.className = 'easyDialog_wrapper';
                }
                dialogWrap.innerHTML = dialogTmpl.replace(rScript, '');
                return dialogWrap;
            }
        };

        /**
        * 设置并返回缓存的数据 关于缓存系统详见：http://stylechen.com/cachedata.html
        * @param { String / Object } 任意字符串或DOM元素
        * @param { String } 缓存属性名
        * @param { Anything } 缓存属性值
        * @return { Object } 
        */
        Dialog.data = function (elem, val, data) {
            if (typeof elem === 'string') {
                if (val !== undefined) {
                    cacheData[elem] = val;
                }
                return cacheData[elem];
            }
            else if (typeof elem === 'object') {
                // 如果是window、document将不添加自定义属性
                // window的索引是0 document索引为1
                var index = elem === win ? 0 :
				elem.nodeType === 9 ? 1 :
				elem[expando] ? elem[expando] :
				(elem[expando] = ++uuid),

			thisCache = cacheData[index] ? cacheData[index] : (cacheData[index] = {});

                if (data !== undefined) {
                    // 将数据存入缓存中
                    thisCache[val] = data;
                }
                // 返回DOM元素存储的数据
                return thisCache[val];
            }
        };

        /**
        * 删除缓存
        * @param { String / Object } 任意字符串或DOM元素
        * @param { String } 要删除的缓存属性名
        */
        Dialog.removeData = function (elem, val) {
            if (typeof elem === 'string') {
                delete cacheData[elem];
            }
            else if (typeof elem === 'object') {
                var index = elem === win ? 0 :
				elem.nodeType === 9 ? 1 :
				elem[expando];

                if (index === undefined) return;
                // 检测对象是否为空
                var isEmptyObject = function (obj) {
                    var name;
                    for (name in obj) {
                        return false;
                    }
                    return true;
                },
                // 删除DOM元素所有的缓存数据
			delteProp = function () {
			    delete cacheData[index];
			    if (index <= 1) return;
			    try {
			        // IE8及标准浏览器可以直接使用delete来删除属性
			        delete elem[expando];
			    }
			    catch (e) {
			        // IE6/IE7使用removeAttribute方法来删除属性(document会报错)
			        elem.removeAttribute(expando);
			    }
			};

                if (val) {
                    // 只删除指定的数据
                    delete cacheData[index][val];
                    if (isEmptyObject(cacheData[index])) {
                        delteProp();
                    }
                }
                else {
                    delteProp();
                }
            }
        };

        // 事件处理系统
        Dialog.event = {

            bind: function (elem, type, handler) {
                var events = Dialog.data(elem, 'e' + type) || Dialog.data(elem, 'e' + type, []);
                // 将事件函数添加到缓存中
                events.push(handler);
                // 同一事件类型只注册一次事件，防止重复注册
                if (events.length === 1) {
                    var eventHandler = this.eventHandler(elem);
                    Dialog.data(elem, type + 'Handler', eventHandler);
                    if (elem.addEventListener) {
                        elem.addEventListener(type, eventHandler, false);
                    }
                    else if (elem.attachEvent) {
                        elem.attachEvent('on' + type, eventHandler);
                    }
                }
            },

            unbind: function (elem, type, handler) {
                var events = Dialog.data(elem, 'e' + type);
                if (!events) return;

                // 如果没有传入要删除的事件处理函数则删除该事件类型的缓存
                if (!handler) {
                    events = undefined;
                }
                // 如果有具体的事件处理函数则只删除一个
                else {
                    for (var i = events.length - 1, fn = events[i]; i >= 0; i--) {
                        if (fn === handler) {
                            events.splice(i, 1);
                        }
                    }
                }
                // 删除事件和缓存
                if (!events || !events.length) {
                    var eventHandler = Dialog.data(elem, type + 'Handler');
                    if (elem.addEventListener) {
                        elem.removeEventListener(type, eventHandler, false);
                    }
                    else if (elem.attachEvent) {
                        elem.detachEvent('on' + type, eventHandler);
                    }
                    Dialog.removeData(elem, type + 'Handler');
                    Dialog.removeData(elem, 'e' + type);
                }
            },

            // 依次执行事件绑定的函数
            eventHandler: function (elem) {
                return function (event) {
                    event = Dialog.event.fixEvent(event || win.event);
                    var type = event.type,
				events = Dialog.data(elem, 'e' + type);

                    for (var i = 0, handler; handler = events[i++]; ) {
                        if (handler.call(elem, event) === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }
            },

            // 修复IE浏览器支持常见的标准事件的API
            fixEvent: function (e) {
                // 支持DOM 2级标准事件的浏览器无需做修复
                if (e.target) return e;
                var event = {}, name;
                event.target = e.srcElement || document;
                event.preventDefault = function () {
                    e.returnValue = false;
                };
                event.stopPropagation = function () {
                    e.cancelBubble = true;
                };
                // IE6/7/8在原生的window.event中直接写入自定义属性
                // 会导致内存泄漏，所以采用复制的方式
                for (name in e) {
                    event[name] = e[name];
                }
                return event;
            }
        };

        /**
        * 首字母大写转换
        * @param { String } 要转换的字符串
        * @return { String } 转换后的字符串 top => Top
        */
        Dialog.capitalize = function (str) {
            var firstStr = str.charAt(0);
            return firstStr.toUpperCase() + str.replace(firstStr, '');
        };

        /**
        * 获取滚动条的位置
        * @param { String } 'top' & 'left'
        * @return { Number } 
        */
        Dialog.getScroll = function (type) {
            var upType = this.capitalize(type);
            return docElem['scroll' + upType] || body['scroll' + upType];
        };

        /**
        * 获取元素在页面中的位置
        * @param { Object } DOM元素
        * @param { String } 'top' & 'left'
        * @return { Number } 
        */
        Dialog.getOffset = function (elem, type) {
            var upType = this.capitalize(type),
		client = docElem['client' + upType] || body['client' + upType] || 0,
		scroll = this.getScroll(type),
		box = elem.getBoundingClientRect();

            return Math.round(box[type]) + scroll - client;
        };

        /**
        * 拖拽效果
        * @param { Object } 触发拖拽的DOM元素
        * @param { Object } 要进行拖拽的DOM元素
        */
        Dialog.drag = function (target, moveElem) {
            // 清除文本选择
            var clearSelect = 'getSelection' in win ? function () {
                win.getSelection().removeAllRanges();
            } : function () {
                try {
                    doc.selection.empty();
                }
                catch (e) { };
            },

		self = this,
		event = self.event,
		isDown = false,
		newElem = isIE ? target : doc,
		fixed = moveElem.style.position === 'fixed',
		_fixed = Dialog.data('options').fixed;

            // mousedown
            var down = function (e) {
                isDown = true;
                var scrollTop = self.getScroll('top'),
			scrollLeft = self.getScroll('left'),
			edgeLeft = fixed ? 0 : scrollLeft,
			edgeTop = fixed ? 0 : scrollTop;

                Dialog.data('dragData', {
                    x: e.clientX - self.getOffset(moveElem, 'left') + (fixed ? scrollLeft : 0),
                    y: e.clientY - self.getOffset(moveElem, 'top') + (fixed ? scrollTop : 0),
                    // 设置上下左右4个临界点的位置
                    // 固定定位的临界点 = 当前屏的宽、高(下、右要减去元素本身的宽度或高度)
                    // 绝对定位的临界点 = 当前屏的宽、高 + 滚动条卷起部分(下、右要减去元素本身的宽度或高度)
                    el: edgeLeft, // 左临界点
                    et: edgeTop,  // 上临界点
                    er: edgeLeft + docElem.clientWidth - moveElem.offsetWidth,  // 右临界点
                    eb: edgeTop + docElem.clientHeight - moveElem.offsetHeight  // 下临界点
                });

                if (isIE) {
                    // IE6如果是模拟fixed在mousedown的时候先删除模拟，节省性能
                    if (isIE6 && _fixed) {
                        moveElem.style.removeExpression('top');
                    }
                    target.setCapture();
                }

                event.bind(newElem, 'mousemove', move);
                event.bind(newElem, 'mouseup', up);

                if (isIE) {
                    event.bind(target, 'losecapture', up);
                }

                e.stopPropagation();
                e.preventDefault();

            };

            event.bind(target, 'mousedown', down);

            // mousemove
            var move = function (e) {
                if (!isDown) return;
                clearSelect();
                var dragData = Dialog.data('dragData'),
			left = e.clientX - dragData.x,
			top = e.clientY - dragData.y,
			et = dragData.et,
			er = dragData.er,
			eb = dragData.eb,
			el = dragData.el,
			style = moveElem.style;

                // 设置上下左右的临界点以防止元素溢出当前屏
                style.marginLeft = style.marginTop = '0px';
                style.left = (left <= el ? el : (left >= er ? er : left)) + 'px';
                style.top = (top <= et ? et : (top >= eb ? eb : top)) + 'px';
                e.stopPropagation();
            };

            // mouseup
            var up = function (e) {
                isDown = false;
                if (isIE) {
                    event.unbind(target, 'losecapture', arguments.callee);
                }
                event.unbind(newElem, 'mousemove', move);
                event.unbind(newElem, 'mouseup', arguments.callee);
                if (isIE) {
                    target.releaseCapture();
                    // IE6如果是模拟fixed在mouseup的时候要重新设置模拟
                    if (isIE6 && _fixed) {
                        var top = parseInt(moveElem.style.top) - self.getScroll('top');
                        moveElem.style.setExpression('top', "fuckIE6=document.documentElement.scrollTop+" + top + '+"px"');
                    }
                }
                e.stopPropagation();
            };
        };

        var timer, // 定时器
        // ESC键关闭弹出层
	escClose = function (e) {
	    if (e.keyCode === 27) {
	        extend.close();
	    }
	},
        // 清除定时器
	clearTimer = function () {
	    if (timer) {
	        clearTimeout(timer);
	        timer = undefined;
	    }
	};

        var extend = {
            open: function () {
                var $ = new Dialog(),
			options = $.getOptions(arguments[0] || {}), // 获取参数
			event = Dialog.event,
			docWidth = docElem.clientWidth,
			docHeight = docElem.clientHeight,
			self = this,
			overlay,
			dialogBox,
			dialogWrap,
			boxChild;

                clearTimer();

                // ------------------------------------------------------
                // ---------------------插入遮罩层-----------------------
                // ------------------------------------------------------

                // 如果页面中已经缓存遮罩层，直接显示
                if (options.overlay) {
                    overlay = doc.getElementById('overlay');
                    if (!overlay) {
                        overlay = $.createOverlay();
                        body.appendChild(overlay);
                        if (isIE6) {
                            $.appendIframe(overlay);
                        }
                    }
                    overlay.style.display = 'block';
                }

                if (isIE6) {
                    $.setBodyBg();
                }

                // ------------------------------------------------------
                // ---------------------插入弹出层-----------------------
                // ------------------------------------------------------

                // 如果页面中已经缓存弹出层，直接显示
                dialogBox = doc.getElementById('easyDialogBox');
                if (!dialogBox) {
                    dialogBox = $.createDialogBox();
                    body.appendChild(dialogBox);
                }

                if (options.follow) {
                    var follow = function () {
                        $.setFollow(dialogBox, options.follow, options.followX, options.followY);
                    };

                    follow();
                    event.bind(win, 'resize', follow);
                    Dialog.data('follow', follow);
                    if (overlay) {
                        overlay.style.display = 'none';
                    }
                    options.fixed = false;
                }
                else {
                    $.setPosition(dialogBox, options.fixed);
                }
                dialogBox.style.display = 'block';

                // ------------------------------------------------------
                // -------------------插入弹出层内容---------------------
                // ------------------------------------------------------

                // 判断弹出层内容是否已经缓存过
                dialogWrap = typeof options.container === 'string' ?
			doc.getElementById(options.container) :
			$.createDialogWrap(options.container);

                boxChild = dialogBox.getElementsByTagName('*')[0];

                if (!boxChild) {
                    dialogBox.appendChild(dialogWrap);
                }
                else if (boxChild && dialogWrap !== boxChild) {
                    boxChild.style.display = 'none';
                    body.appendChild(boxChild);
                    dialogBox.appendChild(dialogWrap);
                }

                dialogWrap.style.display = 'block';
                if(options.container.width)
                    dialogWrap.style.width = (options.container.width+"").replace("px","")+"px";

                var eWidth = dialogWrap.offsetWidth,
			eHeight = dialogWrap.offsetHeight,
			widthOverflow = eWidth > docWidth,
			heigthOverflow = eHeight > docHeight;

                // 强制去掉自定义弹出层内容的margin	
                dialogWrap.style.marginTop = dialogWrap.style.marginRight = dialogWrap.style.marginBottom = dialogWrap.style.marginLeft = '0px';

                // 居中定位
                if (!options.follow) {
                    dialogBox.style.marginLeft = '-' + (widthOverflow ? docWidth / 2 : eWidth / 2) + 'px';
                    dialogBox.style.marginTop = '-' + (heigthOverflow ? docHeight / 2 : eHeight / 2) + 'px';
                }
                else {
                    dialogBox.style.marginLeft = dialogBox.style.marginTop = '0px';
                }

                // 防止select穿透固定宽度和高度
                if (isIE6 && !options.overlay) {
                    dialogBox.style.width = eWidth + 'px';
                    dialogBox.style.height = eHeight + 'px';
                }

                // ------------------------------------------------------
                // --------------------绑定相关事件----------------------
                // ------------------------------------------------------
                var closeBtn = doc.getElementById('closeBtn'),
			dialogTitle = doc.getElementById('easyDialogTitle'),
			dialogYesBtn = doc.getElementById('easyDialogYesBtn'),
			dialogNoBtn = doc.getElementById('easyDialogNoBtn');

                // 绑定确定按钮的回调函数
                if (dialogYesBtn) {
                    event.bind(dialogYesBtn, 'click', function (event) {
                        if (options.container.yesFn.call(self, event) !== false) {
                            self.close();
                        }
                    });
                }

                // 绑定取消按钮的回调函数
                if (dialogNoBtn) {
                    var noCallback = function (event) {
                        if (options.container.noFn === true || options.container.noFn.call(self, event) !== false) {
                            self.close();
                        }
                    };
                    event.bind(dialogNoBtn, 'click', noCallback);
                    // 如果取消按钮有回调函数 关闭按钮也绑定同样的回调函数
                    if (closeBtn) {
                        event.bind(closeBtn, 'click', noCallback);
                    }
                }
                // 关闭按钮绑定事件	
                else if (closeBtn) {
                    event.bind(closeBtn, 'click', self.close);
                }

                // ESC键关闭弹出层
                if (!options.lock) {
                    event.bind(doc, 'keyup', escClose);
                }
                // 自动关闭弹出层
                if (options.autoClose && typeof options.autoClose === 'number') {
                    timer = setTimeout(self.close, options.autoClose);
                }
                // 绑定拖拽(如果弹出层内容的宽度或高度溢出将不绑定拖拽)
                if (options.drag && dialogTitle && !widthOverflow && !heigthOverflow) {
                    dialogTitle.style.cursor = 'move';
                    Dialog.drag(dialogTitle, dialogBox);
                }

                // 确保弹出层绝对定位时放大缩小窗口也可以垂直居中显示

                if (!options.follow && !options.fixed) {
                    var resize = function () {
                        $.setPosition(dialogBox, false);
                    };
                    // 如果弹出层内容的宽度或高度溢出将不绑定resize事件
                    if (!widthOverflow && !heigthOverflow) {
                        event.bind(win, 'resize', resize);
                    }
                    Dialog.data('resize', resize);
                }

                // 缓存相关元素以便关闭弹出层的时候进行操作
                Dialog.data('dialogElements', {
                    overlay: overlay,
                    dialogBox: dialogBox,
                    closeBtn: closeBtn,
                    dialogTitle: dialogTitle,
                    dialogYesBtn: dialogYesBtn,
                    dialogNoBtn: dialogNoBtn
                });
            },

            close: function () {
                var options = Dialog.data('options'),
			elements = Dialog.data('dialogElements'),
			event = Dialog.event;

                clearTimer();
                //	隐藏遮罩层
                if (options.overlay && elements.overlay) {
                    elements.overlay.style.display = 'none';
                }
                // 隐藏弹出层
                elements.dialogBox.style.display = 'none';
                // IE6清除CSS表达式
                if (isIE6) {
                    elements.dialogBox.style.removeExpression('top');
                }

                // ------------------------------------------------------
                // --------------------删除相关事件----------------------
                // ------------------------------------------------------
                if (elements.closeBtn) {
                    event.unbind(elements.closeBtn, 'click');
                }

                if (elements.dialogTitle) {
                    event.unbind(elements.dialogTitle, 'mousedown');
                }

                if (elements.dialogYesBtn) {
                    event.unbind(elements.dialogYesBtn, 'click');
                }

                if (elements.dialogNoBtn) {
                    event.unbind(elements.dialogNoBtn, 'click');
                }

                if (!options.follow && !options.fixed) {
                    event.unbind(win, 'resize', Dialog.data('resize'));
                    Dialog.removeData('resize');
                }

                if (options.follow) {
                    event.unbind(win, 'resize', Dialog.data('follow'));
                    Dialog.removeData('follow');
                }

                if (!options.lock) {
                    event.unbind(doc, 'keyup', escClose);
                }
                // 执行callback
                if (typeof options.callback === 'function') {
                    options.callback.call(extend);
                }
                // 清除缓存
                Dialog.removeData('options');
                Dialog.removeData('dialogElements');
            }
        };

        return extend;

    };

    // ------------------------------------------------------
    // ---------------------DOM加载模块----------------------
    // ------------------------------------------------------
    var loaded = function () {
        win.easyDialog = easyDialog();
    },

	doScrollCheck = function () {
	    if (doc.body) return;

	    try {
	        docElem.doScroll("left");
	    } catch (e) {
	        setTimeout(doScrollCheck, 1);
	        return;
	    }
	    loaded();
	};

    (function () {
        if (doc.body) {
            loaded();
        }
        else {
            if (doc.addEventListener) {
                doc.addEventListener('DOMContentLoaded', function () {
                    doc.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    loaded();
                }, false);
                win.addEventListener('load', loaded, false);
            }
            else if (doc.attachEvent) {
                doc.attachEvent('onreadystatechange', function () {
                    if (doc.readyState === 'complete') {
                        doc.detachEvent('onreadystatechange', arguments.callee);
                        loaded();
                    }
                });
                win.attachEvent('onload', loaded);
                var toplevel = false;
                try {
                    toplevel = win.frameElement == null;
                } catch (e) { }

                if (docElem.doScroll && toplevel) {
                    doScrollCheck();
                }
            }
        }
    })();

})(window, undefined);

/*tip*/
(function ($) {

    var tips = [],
		reBgImage = /^url\(["']?([^"'\)]*)["']?\);?$/i,
		rePNG = /\.png$/i,
		ie6 = !!window.createPopup && document.documentElement.currentStyle.minWidth == 'undefined';

    // make sure the tips' position is updated on resize
    function handleWindowResize() {
        $.each(tips, function () {
            this.refresh(true);
        });
    }
    $(window).resize(handleWindowResize);

    $.Poshytip = function (elm, options) {
        this.$elm = $(elm);
        this.opts = $.extend({}, $.fn.poshytip.defaults, options);
        var style = "";
        if (this.opts.maxWidth)
            style += "max-width:" + this.opts.maxWidth + "px;";
        if (this.opts.zIndex)
            style += "z-index:" + this.opts.zIndex + ";";


        var arrowStyle = "";
        if (this.opts.arrowLeft)
            arrowStyle = "left:" + this.opts.arrowLeft + "px;";
        if (this.opts.arrowRight)
            arrowStyle = "left:auto!important;right:" + this.opts.arrowRight + "px";

        this.$tip = $(['<div class="', this.opts.className, '" style="' + style + '">',
				'<div class="tip-inner tip-bg-image"></div>',
				'<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left" style="' + arrowStyle + '"></div>',
			'</div>'].join('')).appendTo(document.body);
        this.$arrow = this.$tip.find('div.tip-arrow');
        this.$inner = this.$tip.find('div.tip-inner');
        this.disabled = false;
        this.content = null;
        this.init();
    };

    $.Poshytip.prototype = {
        init: function () {
            tips.push(this);

            // save the original title and a reference to the Poshytip object
            var title = this.$elm.attr('title');
            this.$elm.data('title.poshytip', title !== undefined ? title : null)
				.data('poshytip', this);

            // hook element events
            if (this.opts.showOn != 'none') {
                this.$elm.bind({
                    'mouseenter.poshytip': $.proxy(this.mouseenter, this),
                    'mouseleave.poshytip': $.proxy(this.mouseleave, this)
                });
                switch (this.opts.showOn) {
                    case 'hover':
                        if (this.opts.alignTo == 'cursor')
                            this.$elm.bind('mousemove.poshytip', $.proxy(this.mousemove, this));
                        if (this.opts.allowTipHover)
                            this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.mouseleave, this));
                        break;
                    case 'focus':
                        this.$elm.bind({
                            'focus.poshytip': $.proxy(this.showDelayed, this),
                            'blur.poshytip': $.proxy(this.hideDelayed, this)
                        });
                        break;
                }
            }
        },
        mouseenter: function (e) {
            if (this.disabled)
                return true;

            this.$elm.attr('title', '');
            if (this.opts.showOn == 'focus')
                return true;

            this.showDelayed();
        },
        mouseleave: function (e) {
            if (this.disabled || this.asyncAnimating && (this.$tip[0] === e.relatedTarget || jQuery.contains(this.$tip[0], e.relatedTarget)))
                return true;

            if (!this.$tip.data('active')) {
                var title = this.$elm.data('title.poshytip');
                if (title !== null)
                    this.$elm.attr('title', title);
            }
            if (this.opts.showOn == 'focus')
                return true;

            this.hideDelayed();
        },
        mousemove: function (e) {
            if (this.disabled)
                return true;

            this.eventX = e.pageX;
            this.eventY = e.pageY;
            if (this.opts.followCursor && this.$tip.data('active')) {
                this.calcPos();
                this.$tip.css({ left: this.pos.l, top: this.pos.t });
                if (this.pos.arrow)
                    this.$arrow[0].className = this.opts.side + ' tip-arrow tip-arrow-' + this.pos.arrow;
            }
        },
        show: function () {
            if (this.disabled || this.$tip.data('active'))
                return;

            this.reset();
            this.update();

            // don't proceed if we didn't get any content in update() (e.g. the element has an empty title attribute)
            if (!this.content)
                return;

            this.display();
            if (this.opts.timeOnScreen)
                this.hideDelayed(this.opts.timeOnScreen);
        },
        showDelayed: function (timeout) {
            this.clearTimeouts();
            this.showTimeout = setTimeout($.proxy(this.show, this), typeof timeout == 'number' ? timeout : this.opts.showTimeout);
        },
        hide: function () {
            if (this.disabled || !this.$tip.data('active'))
                return;

            this.display(true);
        },
        hideDelayed: function (timeout) {
            this.clearTimeouts();
            this.hideTimeout = setTimeout($.proxy(this.hide, this), typeof timeout == 'number' ? timeout : this.opts.hideTimeout);
        },
        reset: function () {
            this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
            this.$inner.find('*').poshytip('hide');
            if (this.opts.fade)
                this.$tip.css('opacity', this.opacity);
            this.$arrow[0].className = 'tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left';
            this.asyncAnimating = false;
        },
        update: function (content, dontOverwriteOption) {
            if (this.disabled)
                return;

            var async = content !== undefined;
            if (async) {
                if (!dontOverwriteOption)
                    this.opts.content = content;
                if (!this.$tip.data('active'))
                    return;
            } else {
                content = this.opts.content;
            }

            // update content only if it has been changed since last time
            var self = this,
				newContent = typeof content == 'function' ?
					content.call(this.$elm[0], function (newContent) {
					    self.update(newContent);
					}) :
					content == '[title]' ? this.$elm.data('title.poshytip') : content;
            if (this.content !== newContent) {
                this.$inner.empty().append(newContent);
                this.content = newContent;
            }

            this.refresh(async);
        },
        refresh: function (async) {
            if (this.disabled)
                return;

            if (async) {
                if (!this.$tip.data('active'))
                    return;
                // save current position as we will need to animate
                var currPos = { left: this.$tip.css('left'), top: this.$tip.css('top') };
            }

            // reset position to avoid text wrapping, etc.
            this.$tip.css({ left: 0, top: 0 }).appendTo(document.body);

            // save default opacity
            if (this.opacity === undefined)
                this.opacity = this.$tip.css('opacity');

            // check for images - this code is here (i.e. executed each time we show the tip and not on init) due to some browser inconsistencies
            var bgImage = this.$tip.css('background-image').match(reBgImage),
				arrow = this.$arrow.css('background-image').match(reBgImage);

            if (bgImage) {
                var bgImagePNG = rePNG.test(bgImage[1]);
                // fallback to background-color/padding/border in IE6 if a PNG is used
                if (ie6 && bgImagePNG) {
                    this.$tip.css('background-image', 'none');
                    this.$inner.css({ margin: 0, border: 0, padding: 0 });
                    bgImage = bgImagePNG = false;
                } else {
                    this.$tip.prepend('<table class="tip-table" border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>')
						.css({ border: 0, padding: 0, 'background-image': 'none', 'background-color': 'transparent' })
						.find('.tip-bg-image').css('background-image', 'url("' + bgImage[1] + '")').end()
						.find('td').eq(3).append(this.$inner);
                }
                // disable fade effect in IE due to Alpha filter + translucent PNG issue
                if (bgImagePNG && !$.support.opacity)
                    this.opts.fade = false;
            }
            // IE arrow fixes
            if (arrow && !$.support.opacity) {
                // disable arrow in IE6 if using a PNG
                if (ie6 && rePNG.test(arrow[1])) {
                    arrow = false;
                    this.$arrow.css('background-image', 'none');
                }
                // disable fade effect in IE due to Alpha filter + translucent PNG issue
                this.opts.fade = false;
            }

            var $table = this.$tip.find('> table.tip-table');
            if (ie6) {
                // fix min/max-width in IE6
                this.$tip[0].style.width = '';
                $table.width('auto').find('td').eq(3).width('auto');
                var tipW = this.$tip.width(),
					minW = parseInt(this.$tip.css('min-width')),
					maxW = parseInt(this.$tip.css('max-width'));
                if (!isNaN(minW) && tipW < minW)
                    tipW = minW;
                else if (!isNaN(maxW) && tipW > maxW)
                    tipW = maxW;
                this.$tip.add($table).width(tipW).eq(0).find('td').eq(3).width('100%');
            } else if ($table[0]) {
                // fix the table width if we are using a background image
                // IE9, FF4 use float numbers for width/height so use getComputedStyle for them to avoid text wrapping
                // for details look at: http://vadikom.com/dailies/offsetwidth-offsetheight-useless-in-ie9-firefox4/
                $table.width('auto').find('td').eq(3).width('auto').end().end().width(document.defaultView && document.defaultView.getComputedStyle && parseFloat(document.defaultView.getComputedStyle(this.$tip[0], null).width) || this.$tip.width()).find('td').eq(3).width('100%');
            }
            this.tipOuterW = this.$tip.outerWidth();
            this.tipOuterH = this.$tip.outerHeight();

            this.calcPos();

            // position and show the arrow image
            if (arrow && this.pos.arrow) {
                this.$arrow[0].className = this.opts.side + ' tip-arrow tip-arrow-' + this.pos.arrow;
                this.$arrow.css('visibility', 'inherit');
            }

            if (async && this.opts.refreshAniDuration) {
                this.asyncAnimating = true;
                var self = this;
                this.$tip.css(currPos).animate({ left: this.pos.l, top: this.pos.t }, this.opts.refreshAniDuration, function () { self.asyncAnimating = false; });
            } else {
                this.$tip.css({ left: this.pos.l, top: this.pos.t });
            }
        },
        display: function (hide) {
            var active = this.$tip.data('active');
            if (active && !hide || !active && hide)
                return;

            this.$tip.stop();
            if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (hide && this.opts.hideAniDuration || !hide && this.opts.showAniDuration)) {
                var from = {}, to = {};
                // this.pos.arrow is only undefined when alignX == alignY == 'center' and we don't need to slide in that rare case
                if (this.opts.slide && this.pos.arrow) {
                    var prop, arr;
                    if (this.pos.arrow == 'bottom' || this.pos.arrow == 'top') {
                        prop = 'top';
                        arr = 'bottom';
                    } else {
                        prop = 'left';
                        arr = 'right';
                    }
                    var val = parseInt(this.$tip.css(prop));
                    from[prop] = val + (hide ? 0 : (this.pos.arrow == arr ? -this.opts.slideOffset : this.opts.slideOffset));
                    to[prop] = val + (hide ? (this.pos.arrow == arr ? this.opts.slideOffset : -this.opts.slideOffset) : 0) + 'px';
                }
                if (this.opts.fade) {
                    from.opacity = hide ? this.$tip.css('opacity') : 0;
                    to.opacity = hide ? 0 : this.opacity;
                }
                this.$tip.css(from).animate(to, this.opts[hide ? 'hideAniDuration' : 'showAniDuration']);
            }
            hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
            if (active) {
                var title = this.$elm.data('title.poshytip');
                if (title !== null)
                    this.$elm.attr('title', title);
            }
            this.$tip.data('active', !active);
        },
        disable: function () {
            this.reset();
            this.disabled = true;
        },
        enable: function () {
            this.disabled = false;
        },
        destroy: function () {
            this.reset();
            this.$tip.remove();
            delete this.$tip;
            this.content = null;
            this.$elm.unbind('.poshytip').removeData('title.poshytip').removeData('poshytip');
            tips.splice($.inArray(this, tips), 1);
        },
        clearTimeouts: function () {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = 0;
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = 0;
            }
        },
        calcPos: function () {
            var pos = { l: 0, t: 0, arrow: '' },
				$win = $(window),
				win = {
				    l: $win.scrollLeft(),
				    t: $win.scrollTop(),
				    w: $win.width(),
				    h: $win.height()
				}, xL, xC, xR, yT, yC, yB;
            if (this.opts.alignTo == 'cursor') {
                xL = xC = xR = this.eventX;
                yT = yC = yB = this.eventY;
            } else { // this.opts.alignTo == 'target'
                var elmOffset = this.$elm.offset(),
					elm = {
					    l: elmOffset.left,
					    t: elmOffset.top,
					    w: this.$elm.outerWidth(),
					    h: this.$elm.outerHeight()
					};
                xL = elm.l + (this.opts.alignX != 'inner-right' ? 0 : elm.w); // left edge
                xC = xL + Math.floor(elm.w / 2); 			// h center
                xR = xL + (this.opts.alignX != 'inner-left' ? elm.w : 0); // right edge
                yT = elm.t + (this.opts.alignY != 'inner-bottom' ? 0 : elm.h); // top edge
                yC = yT + Math.floor(elm.h / 2); 			// v center
                yB = yT + (this.opts.alignY != 'inner-top' ? elm.h : 0); // bottom edge
            }

            // keep in viewport and calc arrow position
            switch (this.opts.alignX) {
                case 'right':
                case 'inner-left':
                    pos.l = xR + this.opts.offsetX;
                    if (this.opts.keepInViewport && pos.l + this.tipOuterW > win.l + win.w)
                        pos.l = win.l + win.w - this.tipOuterW;
                    if (this.opts.alignX == 'right' || this.opts.alignY == 'center')
                        pos.arrow = 'left';
                    break;
                case 'center':
                    pos.l = xC - Math.floor(this.tipOuterW / 2);
                    if (this.opts.keepInViewport) {
                        if (pos.l + this.tipOuterW > win.l + win.w)
                            pos.l = win.l + win.w - this.tipOuterW;
                        else if (pos.l < win.l)
                            pos.l = win.l;
                    }
                    break;
                default: // 'left' || 'inner-right'
                    pos.l = xL - this.tipOuterW - this.opts.offsetX;
                    if (this.opts.keepInViewport && pos.l < win.l)
                        pos.l = win.l;
                    if (this.opts.alignX == 'left' || this.opts.alignY == 'center')
                        pos.arrow = 'right';
            }
            switch (this.opts.alignY) {
                case 'bottom':
                case 'inner-top':
                    pos.t = yB + this.opts.offsetY;
                    // 'left' and 'right' need priority for 'target'
                    if (!pos.arrow || this.opts.alignTo == 'cursor')
                        pos.arrow = 'top';
                    if (this.opts.keepInViewport && pos.t + this.tipOuterH > win.t + win.h) {
                        pos.t = yT - this.tipOuterH - this.opts.offsetY;
                        if (pos.arrow == 'top')
                            pos.arrow = 'bottom';
                    }
                    break;
                case 'center':
                    pos.t = yC - Math.floor(this.tipOuterH / 2);
                    if (this.opts.keepInViewport) {
                        if (pos.t + this.tipOuterH > win.t + win.h)
                            pos.t = win.t + win.h - this.tipOuterH;
                        else if (pos.t < win.t)
                            pos.t = win.t;
                    }
                    break;
                default: // 'top' || 'inner-bottom'
                    pos.t = yT - this.tipOuterH - this.opts.offsetY;
                    // 'left' and 'right' need priority for 'target'
                    if (!pos.arrow || this.opts.alignTo == 'cursor')
                        pos.arrow = 'bottom';
                    if (this.opts.keepInViewport && pos.t < win.t) {
                        pos.t = yB + this.opts.offsetY;
                        if (pos.arrow == 'bottom')
                            pos.arrow = 'top';
                    }
            }
            this.pos = pos;
        }
    };

    $.fn.poshytip = function (options) {
        if (typeof options == 'string') {
            var args = arguments,
				method = options;
            Array.prototype.shift.call(args);
            // unhook live events if 'destroy' is called
            if (method == 'destroy') {
                this.die ?
					this.die('mouseenter.poshytip').die('focus.poshytip') :
					$(document).undelegate(this.selector, 'mouseenter.poshytip').undelegate(this.selector, 'focus.poshytip');
            }
            return this.each(function () {
                var poshytip = $(this).data('poshytip');
                if (poshytip && poshytip[method])
                    poshytip[method].apply(poshytip, args);
            });
        }

        var opts = $.extend({}, $.fn.poshytip.defaults, options);

        // generate CSS for this tip class if not already generated
        if (!$('#poshytip-css-' + opts.className)[0])
            $(['<style id="poshytip-css-', opts.className, '" type="text/css">',
				'div.', opts.className, '{visibility:hidden;position:absolute;top:0;left:0;}',
				'div.', opts.className, ' table.tip-table, div.', opts.className, ' table.tip-table td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;vertical-align:middle;}',
				'div.', opts.className, ' td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:', opts.bgImageFrameSize, 'px;width:', opts.bgImageFrameSize, 'px;overflow:hidden;}',
				'div.', opts.className, ' td.tip-right{background-position:100% 0;}',
				'div.', opts.className, ' td.tip-bottom{background-position:100% 100%;}',
				'div.', opts.className, ' td.tip-left{background-position:0 100%;}',
				'div.', opts.className, ' div.tip-inner{background-position:-', opts.bgImageFrameSize, 'px -', opts.bgImageFrameSize, 'px;}',
				'div.', opts.className, ' div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}',
			'</style>'].join('')).appendTo('head');

        // check if we need to hook live events
        if (opts.liveEvents && opts.showOn != 'none') {
            var handler,
				deadOpts = $.extend({}, opts, { liveEvents: false });
            switch (opts.showOn) {
                case 'hover':
                    handler = function () {
                        var $this = $(this);
                        if (!$this.data('poshytip'))
                            $this.poshytip(deadOpts).poshytip('mouseenter');
                    };
                    // support 1.4.2+ & 1.9+
                    this.live ?
						this.live('mouseenter.poshytip', handler) :
						$(document).delegate(this.selector, 'mouseenter.poshytip', handler);
                    break;
                case 'focus':
                    handler = function () {
                        var $this = $(this);
                        if (!$this.data('poshytip'))
                            $this.poshytip(deadOpts).poshytip('showDelayed');
                    };
                    this.live ?
						this.live('focus.poshytip', handler) :
						$(document).delegate(this.selector, 'focus.poshytip', handler);
                    break;
            }
            return this;
        }

        return this.each(function () {
            new $.Poshytip(this, opts);
        });
    }

    // default settings
    $.fn.poshytip.defaults = {
        content: '[title]', // content to display ('[title]', 'string', element, function(updateCallback){...}, jQuery)
        className: 'tip-white', // class for the tips
        bgImageFrameSize: 10, 	// size in pixels for the background-image (if set in CSS) frame around the inner content of the tip
        showTimeout: 500, 	// timeout before showing the tip (in milliseconds 1000 == 1 second)
        hideTimeout: 100, 	// timeout before hiding the tip
        timeOnScreen: 0, 	// timeout before automatically hiding the tip after showing it (set to > 0 in order to activate)
        showOn: 'hover', // handler for showing the tip ('hover', 'focus', 'none') - use 'none' to trigger it manually
        liveEvents: false, 	// use live events
        alignTo: 'cursor', // align/position the tip relative to ('cursor', 'target')
        alignX: 'right', // horizontal alignment for the tip relative to the mouse cursor or the target element
        // ('right', 'center', 'left', 'inner-left', 'inner-right') - 'inner-*' matter if alignTo:'target'
        alignY: 'top', 	// vertical alignment for the tip relative to the mouse cursor or the target element
        // ('bottom', 'center', 'top', 'inner-bottom', 'inner-top') - 'inner-*' matter if alignTo:'target'
        offsetX: -22, 	// offset X pixels from the default position - doesn't matter if alignX:'center'
        offsetY: 18, 	// offset Y pixels from the default position - doesn't matter if alignY:'center'
        keepInViewport: true, 	// reposition the tooltip if needed to make sure it always appears inside the viewport
        allowTipHover: true, 	// allow hovering the tip without hiding it onmouseout of the target - matters only if showOn:'hover'
        followCursor: false, 	// if the tip should follow the cursor - matters only if showOn:'hover' and alignTo:'cursor'
        fade: true, 	// use fade animation
        slide: true, 	// use slide animation
        slideOffset: 8, 	// slide animation offset
        showAniDuration: 300, 	// show animation duration - set to 0 if you don't want show animation
        hideAniDuration: 300, 	// hide animation duration - set to 0 if you don't want hide animation
        refreshAniDuration: 0, 	// refresh animation duration - set to 0 if you don't want animation when updating the tooltip asynchronously
        side: ''
    };

})(jQuery);