/*
 * commonJS 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description:  公共JS,用来存放公共模块的地方，由于未使用那些打包工具，所以只能手动写到一块。
 */

$(function () {
    //加载样式文件
    LoadStyle.loadTheme(ParsingHelper.getTag());;
    //解析标签
    ParsingHelper.parsingTag();
})

/*
 * CommonAjax 1.0.0
 * author： niulei
 * Time: 2017.4.1
 * description: 公共ajax模块
 */
 var CommonAjax = (function(){
    var serviceUrl="ss";
    var ajax = function(data){
      $.ajax({
        type : data.type ? data.type : 'POST',
        url : data.url ? data.url  : serviceUrl,
		    data : data.param,
		    cache: data.cache ? true : false,
		    dataType : data.dataType ?  data.dataType : "json",
		    traditional:true,
		    success : function(returnData) {
          //data.successF(returnData);//请求成功
          if(returnData.respCode == '0000'){
            if(data.successF){
              data.successF(returnData);//请求成功
            }else{
              // layer.alert(returnData.respDesc,{icon:'success'});
            }
          }else{
            // layer.alert(returnData.respDesc,{icon:'error'});
          }
    		},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
    			if(data.errorF){
    				data.errorF(XMLHttpRequest, textStatus, errorThrown);
    			}else{
    				//调用提示框组件，提示失败，在平台开发的时候进行补充
            // layer.alert(returnData.respDesc,{icon:'success'});
    			}
    		}
	    });
    };
    return {
      ajax:ajax
    }
 })();

/*
 * LoadStyle 1.0.0
 * author： niulei
 * Time: 2017.4.1
 * description: 样式加载模块
 */
 var LoadStyle = (function () {
     var tagArray={};
     var theme = "blueStyle";
     var pathName = window.document.location.pathname;
     pathName = pathName.substring(0,pathName.substr(1).indexOf('/views')+1);

     var loadTheme = function (tagNames,isUpdate) {
         createLink("common",isUpdate);
         if($.isArray(tagNames)){
           for(var i in tagNames){
             createLink(tagNames[i],isUpdate);
           }
         }else{
           createLink(tagNames,isUpdate);
         }

     };
     var createLink = function(tagName,isUpdate){
        var path = pathName+"/styles/"+theme+"/"+tagName+".css";
        if(!tagArray[tagName]){
           tagArray[tagName]=true;
           $("head").append("<link rel='stylesheet' id='style-"+tagName+"' href='"+path+"'>");
        }else{
          isUpdate ? $("head").find("#style-"+tagName).attr("href",path) : false;
        }
     }
     var setTheme = function (themeName) {
         theme=themeName;
     };
     var remove = function () {

     };
     return {
         loadTheme: loadTheme,
         setTheme: setTheme
     }

 })();

/*
 * Macro 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description: 宏命令集合，用于执行一系列的操作
 */
var Macro = (function () {
    var macroCommand = function ($tag, $dom, options) {
        //将配置绑定到Dom上
        $dom.data("options", options);
        //通过是否含有hasbind属性获得要绑定事件的具体Dom
        var $bindDom = $dom.find($('[hasbind]'));
        //为组件设置唯一的id
        $dom.attr("cid", options.id);
        //将自定义标签的样式放在Dom上。
        $dom.addClass($tag.attr("class"));
        //若有检验配置，则增加校验
        CheckHelper.bindCheck($dom, options);
        //为组件绑定事件
        BindEvent.bindEvent($tag, $bindDom);
        //为组件订阅事件
        BindEvent.setListener($tag, $dom);
        //添加校验规则。
    };
    return {
        macroCommand: macroCommand
    }

})()
/*
 * parsingHelper 1.0.0
 * author： niulei
 * Time: 2017.3.23
 * description:  公共组件，解析模板
 */
var ParsingHelper = (function () {
    // 缓存已注册的组件
    var componentList = {};
    var registerComponent = function (componentName, fn) {
        var fdStart = componentName ? componentName.indexOf("cu") : "-1";
        if (fdStart == 0) {
            //若是以cu开头，则通过
            if (typeof fn === "function") {
                componentList[componentName] = fn;
            }
        } else {
            //若不是以cu开头，则不通过
            console.error("解析模块注册" + componentName + "组件时出错");
            return false;
        }

    };
    var getTag = function () {
        var tagArray = [];
        for (var i in componentList) {
            if (componentList.hasOwnProperty(i)) {
                tagArray.push(i);
            }
        }
        return tagArray;
    };
    var initTag = function (tagName, $tag) {
        if (tagName && typeof tagName === "string") {
            tagName = tagName.toLowerCase();
            if (componentList[tagName]) {

                return componentList[tagName]["prototype"]["initTag"]($tag);
            } else {
                return $tag;
            }
        }
    };
    //递归解析标签
    var recursivlyParse = function ($tag, tagNames) {
        //获得解析后的Dom节点
        var $dom = initTag($tag[0].tagName, $tag);
        var tagArray = $dom.children();
        tagArray.each(function (index, item) {
            //解析具体的组件
            recursivlyParse($(this), tagNames);
        })
    }
    var parsingTag = function () {
        var tagArray = getTag();
        var tagNames = tagArray.join(",");
        //递归解析标签
        recursivlyParse($("body"), tagNames);

    }
    return {
        registerComponent: registerComponent,
        getTag: getTag,
        initTag: initTag,
        parsingTag: parsingTag
    }
})();


/*
 * TemplateHelper 1.0.0
 * author： niulei
 * Time: 2017.3.21
 * description： 此模块为公共模块，目的为缓存模板和利用模板生成html，因为可能会换模板引擎，所以模板的生成，渲染，缓存在此模块定义。
 */
var TemplateHelper = (function () {

    var templateEngine = "mustache";

    var templateList = {};//缓存模板的地方

    var makingTemplate = {
        //按照配置和所选模板引擎生成模板
        mustache: {
            render: function (template, data) {
                //根据模板和数据，返回html片段
                return result = Mustache.render(template, data);
            },
            initHeader: function (options) {
                var template = "<tr>{{#.}}<th field='{{field}}'>{{title}}</th>{{/.}}</tr>";
                return template;
            },
            initTable: function (options) {
                var template = "{{#rows}}<tr>";
                for (var i = 0; i < options.length; i++) {
                    template = template + "<td>{{" + options[i].field + "}}</td>";

                }
                template = template + "</tr>{{/rows}}"
                return template;
            }

        },
        xxx: {}
    }

    var parseOptions = function (type, id, options, EngineName) {
        //通过配置文件，生成模板   ，
        if (!EngineName) {
            //若没有传模板引擎，则采用默认的模板引擎
            EngineName = templateEngine;
        } else if (!makingTemplate[EngineName]) {
            //若采用的模板引擎不存在，则使用默认的模板引擎
            console.error("不支持" + EngineName + "模板引擎，已使用默认模板引擎" + templateEngine + "生成模板");
            EngineName = templateEngine;
        }
        if (id && typeof id === "string") {
            //调用生成模板的方法
            var template = makingTemplate[EngineName][type](options);
            //将生成的模板存入缓存列表中
            templateList[id] = template;
        } else {
            console.error("请传入组件的唯一标识");
        }

    }
    var renderTemplate = function (id, data, EngineName) {
        //通过id来查找模板，查找到模板后通过数据渲染出html片段。
        if (!EngineName) {
            //若没有传模板引擎，则采用默认的模板引擎
            EngineName = templateEngine;
        } else if (!makingTemplate[EngineName]) {
            //若采用的模板引擎不存在，则使用默认的模板引擎
            console.error("不支持" + EngineName + "模板引擎，已使用默认模板引擎" + templateEngine + "生成Dom");
            EngineName = templateEngine;
        }
        if (!templateList[id]) {
            console.error("未找到" + id + "模板");
            return false;
        }
        return makingTemplate[EngineName]["render"](templateList[id], data);

    };
    return {
        render: renderTemplate,
        parseOptions: parseOptions
    }

})();
/*
 * bindEvent 1.0.0
 * author： niulei
 * Time: 2017.3.24
 * description: 绑定事件的模块，即在自定义标签解析完毕后，为制定的标签添加事件
 */
var BindEvent = (function () {
    var eventList = {
        //此处事件均为冒泡事件。
        "bindcl": "click",
        "binddb": "dbclick",
        "bindfs": "focus",
        "bindfsi": "focusin",
        "bindfso": "focusout",
        "bindbl": "blur",
        "bindcg": "change",
        "bindku": "keyup",
        "bindkd": "keydown",
        "bindkp": "keypress"
        //若要支持不冒泡的事件，则在此处另行配置事件列表，而后，在setEvent的函数中添加限制
    };
    var getEventName = function (eventName) {
        return eventList[eventName];
    };

    //绑定事件函数
    var bindEvent = function ($tag, $dom) {
        var attributes = $tag[0].attributes;
        var eventList = {};
        for (var i in attributes) {
            if (attributes.hasOwnProperty(i)) {
                var strStart = attributes[i].nodeName.indexOf("bind");
                if (strStart == 0) {
                    //若是以bind开头，则将其推入列表中
                    eventList[attributes[i].nodeName] = attributes[i].nodeValue;
                } else {

                }
            }
        }
        attributes = null; //由于事件绑定会产生闭包，所以在此处释放内存空间
        for (var name in eventList) {
            $dom.attr(name, eventList[name]);
            (function () {
                var eventType = eventList[name].split(",");
                $dom.on(getEventName(name), function (event) {
                    //改变callHandler函数this的指向，确保回调函数中的this都为触发事件的元素
                    EventHandler.callHandler.call(this, eventType[0], eventType[1]);
                })
            })()

        }

    };
    var setListener = function ($tag, $dom) {
        var listenList = $tag.attr("listen");
        if (!listenList) {
            //若未配置订阅者，则回退
            return false;
        }
        listenList = JSON.parse(listenList);
        for (var i in listenList) {
            Eventlistenr.listenEvent.call($dom, i, listenList[i]);
        }

    };
    return {
        bindEvent: bindEvent,
        setListener: setListener
    }

})();
/*
 * Event 1.0.0
 * author： niulei
 * Time: 2017.3.24
 * description: 事件发布订阅中心，用于发布订阅事件
 */
var Event = (function () {
    var clientList = {};
    var listen = function (key, fn) { //订阅事件的函数
        if (!clientList[key]) {
            clientList[key] = [];
        }
        if (typeof fn === "function") {
            fn.context = this;
            clientList[key].push(fn); //若fn是函数，则把fn推入消息缓存区clientList
        } else {
            console.log(fn);//若fn不是函数，不推入缓存区
        }

    };
    var trigger = function () {
        var key = Array.prototype.shift.call(arguments),//获得参数中最前面的key类型
            fns = clientList[key];
        if (!fns || fns.length == 0) {
            console.log("没有此" + key + "的订阅者");
            return false;
        }
        for (var i = 0, fn; fn = fns[i]; i++) {
            fn.apply(fn.context, arguments);//挨个执行消息缓存区中的事件处理
        }
    };
    var remove = function () {

    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }

})();
/*
 * CheckHelper 1.0.0
 * author： niulei
 * Time: 2017.3.31
 * description: 校验模块，此模块通过正则表达式来对输入进行校验。
 */
var CheckHelper = (function () {
    var resultTipList={
      // 缓存校验结果的列表，现未使用
    }
    var regExpList = {
        //正则表达式列表
        number: "^[0-9]*$",
        lowerLetter: "^[a-z]*$"
    }
    var checkList = {
        //校验规则列表
        required: function ($dom, regTip) {
            //是否为必输项
            var str = $.trim($dom.val());
            var result=true;
            var regTip= regTip === "default" ? "必输项" : regTip;
            if (!str) {
              result=false;
            }
            checkResult(result,$dom,regTip);
        },
        init: function ($dom, regTip) {
            //是否为多少位的数字
            var str = $.trim($dom.val());
            var regTip= regTip === "default" ? "请输入正整数" : regTip;
            var regExp = new RegExp("^[0-9]*$");
            var result = regExp.test(str);
            checkResult(result,$dom,regTip);

        },
        mail: function () {
            //是否为邮箱

        }
    };
    var checkRegExp = function ($dom, regExp, regTip) {
        //匹配正则
        var str = $.trim($dom.val());
        var regTip = regTip === "default" ? "输入不合法" : regTip;
        var regExp = new RegExp(regExpList[regExp] ? regExpList[regExp] : regExp);
        var result = regExp.test(str);
        checkResult(result,$dom, regTip);
    }
    //校验处理函数
    var triggerChecking = function ($dom, regExps) {
        for (var item in regExps) {
            var hanler = checkList[item];
            hanler ? hanler($dom, regExps[item]) : checkRegExp($dom, item, regExps[item]);

        }

    }
    //回调函数
    var checkHandler = function () {
        var $this = $(this);
        var options = $this.data("options") || {};
        //获得校验类型
        var regExp = options["regExp"] ? options["regExp"].split(",") : [];
        //获得校验提示
        var regTip = options["regTip"] ? options["regTip"].split(",") : [];
        var regExps = {};
        for (var i = 0, ln = regExp.length; i < ln; i++) {
            regExps[regExp[i]] = regTip[i] || "default";
        }
        triggerChecking($this, regExps);
    };
    var bindCheck = function ($dom, options) {
        if (!options.regExp) {
            //若未配置校验，则返回
            return false;
        }
        //为dom元素绑定keup事件来校验。
        var $checkDom = $dom.find("input,textarea");
        if($dom.length < 1){
          $checkDom=$dom;
        }
        //校验样式处理
        addCheckStyle($dom, options)
        //绑定校验规则
        $checkDom.data("options", options);
        //绑定keyup事件
        $checkDom.on("keyup", checkHandler);
    };
    var checkForm = function () {
        //校验表单
    };
    var addHandler = function (checkName,handler) {
        //增加校验函数
        if(handler && typeof handler === "function"){
          checkList[checkName] = handler;
        }else{
          return false;
        }

    };
    var addRegExp = function (regName,regExp) {
        //增加校验正则表达式
        if(regExp && typeof regExp === "string"){
          regExpList[regName] = regExp;
        }else{
          return false;
        }

    };
    var setTheme = function (themeName) {
        //设置错误校验弹出的主题
        if(themeName && typeof themeName === "string"){
        }else{
          return false;
        }

    };
    var checkResult = function (result,$dom,regTip) {
        //根据校验结果 来弹出和隐藏相应的提示
        result?hideTip($dom,regTip):showTip($dom,regTip);

    };
    var hideTip = function($dom,regTip){
      //隐藏校验结果
      var resultTip=$dom.data("resulttip") || [];
      var index=$.inArray(regTip,resultTip);
      if(regTip === "hideAllTip"){
        resultTip=[];
      }else{
        if(index !== -1){
          resultTip.splice(index ,1);
        }
      }

      if(resultTip.length<1){
        $dom.removeClass("validate-color");
      }
      $dom.data("resulttip",resultTip);
    };
    var hideAllTip = function($form){
      //隐藏所有的提示信息，一般为重置输入时使用
      $form.find("input,textarea").each(function(index,item){
        hideTip($(this),"hideAllTip");
      })

    }
    var showTip = function($dom,regTip){
      //显示校验结果
      var resultTip=$dom.data("resulttip") || [];
      var index=$.inArray(regTip,resultTip);
      if(index == -1){
        resultTip.push(regTip);
        $dom.data("resulttip",resultTip);
      }
      $dom.addClass("validate-color");
      buildTipDiv($dom,regTip)

    };
    var buildTipDiv = function($dom,regTip){
      // 创建提示框的函数
      var html='<div class="regTip"></div>';
      var $html=$(html);
      var options=$dom.data("options") || {};
      
    }
    var addCheckStyle = function($dom, options){
      //加载校验的样式文件
      LoadStyle.loadTheme("check-style");
      //获得校验类型
      var regExp = options["regExp"] ? options["regExp"].split(",") : [];
      var index=$.inArray("required",regExp);
      if(index !== -1){
        $dom.find("label").addClass("required");
      }

    };
    return {
        bindCheck: bindCheck,
        checkForm: checkForm,
        addHandler: addHandler,
        addRegExp:addRegExp,
        setTheme:setTheme,
        checkResult:checkResult,
        hideAllTip:hideAllTip
    }

})();
/*
 * err 1.0.0
 * author： niulei
 * Time: 2017.4.1
 * description: 错误抛出模块
 */
 var err = (function(){
    var throwErr=function(){
      // console.log("sd")
    }
    return throwErr;

 })();
 /*
  * Serialize 1.0.0
  * author： niulei
  * Time: 2017.4.1
  * description: 序列化模块
  */
var Serialize = (function(){
  var serializing=function($dom){
    var result={};
    var array=$dom.serializeArray();
    for(var i in array){
      var name=array[i]["name"];
      var value=array[i]["value"];
      if(value){
        if(result[name]){
          $.isArray(result[name])?result[name].push(value):result[name]=[result[name]],result[name].push(value);
        }else{
          result[name] = value;
        }
      }
    }
    return result;

  }
  var serializeObject=function($dom){
    if($dom[0].tagName.toLowerCase()=="form"){
      return serializing($dom);
    }else{
      err("序列化出错",2);
    }

  };
  return {
    serializeObject:serializeObject
  };
})();
