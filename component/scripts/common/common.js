/*
 * commonJS 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description:  公共JS,用来存放公共模块的地方，由于未使用那些打包工具，所以只能手动写到一块。
 */

$(function () {
    //加载公共css文件
    LoadStyle.loadTheme("common");
    //加载样式文件
    LoadStyle.loadTheme(ParsingHelper.getTag());
    //解析标签
    ParsingHelper.parsingTag();
    //标签解析完毕后，进行事件绑定与校验绑定
    InitModal.initHtml($("body"));


})
/*
 * InitModal 1.0.0
 * author： niulei
 * Time: 2017.4.13
 * description: 标签解析完后，用来绑定事件和校验。
 */
var InitModal = (function($){

  // 初始化页面绑定的函数
  var initHtml = function($dom){
    var hasEventDom = $dom.find('[bindlist]');
    var hasListenDom = $dom.find('[listen]');
    var hasRegExpDom = $dom.find('[regexp]');
    hasEventDom.each(function(index, item){
      // 绑定事件
      BindEvent.bindEvent($(item));
    });
    hasListenDom.each(function(index, item){
      // 订阅事件
      BindEvent.setListener($(item));
    });
    hasRegExpDom.each(function(index, item){
      //绑定校验事件
      CheckHelper.bindCheck($(item));
    });
  };
  return {
    initHtml:initHtml
  }

})(jQuery)

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
		    data : data.params || {} ,
		    cache: data.cache ? true : false,
		    dataType : data.dataType ?  data.dataType : "json",
		    traditional:true,
		    success : function(returnData) {
          //data.successF(returnData);//请求成功
          var respCode=data.respCode || "0000";
          if(returnData.respCode == respCode){
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
        //获取标签名
        var tagName = $tag[0].tagName.toLowerCase();
        //获得当前标签的解析位置 index
        var tagIndex = $tag.data("tagindex");
        //将配置绑定到Dom上
        $dom.data("options", options);
        //为组件设置内联样式
        $dom.css($tag.data("cbstyle") || {});
        //为组件设置唯一的id
        $dom.attr("cid", CidFactory.makingCid(tagName, tagIndex, options.cid));
        //将自定义标签的样式覆盖在Dom上。
        $tag.attr("class") && $dom.attr("class",$tag.attr("class"));
        //解析标签上的校验配置
        CheckHelper.parseOptions($tag, $dom);
        //解析标签上的事件与订阅
        BindEvent.parseOptions($tag, $dom);
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
    //已解析的自定义标签个数
    var tagNumberlist={};
    var registerComponent = function (componentName, fn) {
        var fdStart = componentName ? componentName.indexOf("cb-") : "-1";
        if (fdStart == 0) {
            //若是以cb开头，则通过
            if (typeof fn === "function") {
                componentList[componentName.toLowerCase()] = fn;
                tagNumberlist[componentName.toLowerCase()] = 0 ;
            }
        } else {
            //若不是以cb开头，则不通过
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
                tagNumberlist[tagName] += 1;
                $tag.data("tagindex",tagNumberlist[tagName]);
                return componentList[tagName]["prototype"]["initTag"]($tag);
            } else {
                return $tag;
            }
        }
    };
    //递归解析标签
    var recursivlyParse = function ($tag) {
        //获得解析后的Dom节点
        var $dom = initTag($tag[0].tagName, $tag);
        var tagArray = $dom.children();
        tagArray.each(function (index, item) {
            //解析具体的组件
            recursivlyParse($(this));
        })
    }
    var parsingTag = function () {
        //递归解析标签
        recursivlyParse($("body"));
    }
    return {
        registerComponent: registerComponent,
        getTag: getTag,
        parsingTag: parsingTag,
        recursivlyParse:recursivlyParse
    }
})();


/*
 * TemplateHelper 1.0.0
 * author： niulei
 * Time: 2017.3.21
 * description： 此模块为公共模块，目的为缓存模板和利用模板生成html，因为可能会换模板引擎，所以模板的生成，渲染，缓存在此模块定义。
 */
var TemplateHelper = (function () {

    var checkEngineName = function (EngineName){
      var templateEngine = TemplateList.getEngineName();
      if (!EngineName) {
          //若没有传模板引擎，则采用默认的模板引擎
          EngineName = templateEngine;
      } else if (!TemplateList.getTemplateFactory[EngineName]) {
          //若采用的模板引擎不存在，则使用默认的模板引擎
          console.error("不支持" + EngineName + "模板引擎，已使用默认模板引擎" + templateEngine + "生成Dom");
          EngineName = templateEngine;
      }
      return EngineName;
    }

    var templateList = {};//缓存模板的地方

    var parseOptions = function (type, id, options, EngineName) {
        //通过配置文件，生成模板   ，
        //校验模板名称，若不存在，则返回默认的模板名称
        EngineName = checkEngineName(EngineName);
        if (id && typeof id === "string") {
            //调用生成模板的方法
            var templateFactory = TemplateList.getTemplateFactory(EngineName,type);
            var template = templateFactory(options);
            //将生成的模板存入缓存列表中
            templateList[id] = template;
        } else {
            console.error("请传入组件的唯一标识");
        }

    }
    var renderTemplate = function (id, data, EngineName) {
        //通过id来查找模板，查找到模板后通过数据渲染出html片段。
        //校验模板名称，若不存在，则返回默认的模板名称
        EngineName = checkEngineName(EngineName);
        if (!templateList[id]) {
            console.error("未找到" + id + "模板");
            return false;
        }
        var templateFactory = TemplateList.getTemplateFactory(EngineName,"render");
        return templateFactory(templateList[id], data);

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
    var bindEvent = function ($dom) {
        var bindList=$dom.attr("bindlist") ? $dom.attr("bindlist").split(",") : [];
        for (var i = 0;i<bindList.length;i++){
          (function ($) {
              var eventType = bindList[i].split("-") || [];
              $dom.on(eventType[0], function (event) {
                  //阻止事件冒泡
                  event.stopPropagation();
                  //改变callHandler函数this的指向，确保回调函数中的this都为触发事件的元素
                  EventHandler.callHandler.call(event.target, eventType[1], eventType[2]);
              })
          })(jQuery)
        }


    };
    var setListener = function ($dom) {
        var listenList = $dom.attr("listen");
        if (!listenList) {
            //若未配置订阅者，则回退
            return false;
        }
        listenList = JSON.parse(listenList);
        for (var i in listenList) {
            EventListenr.listenEvent.call($dom, i, listenList[i]);
        }

    };
    var parseOptions = function ($tag, $dom) {
      //通过是否含有hasbind属性获得要绑定事件的具体Dom
      $tag.attr("bindlist") ? $dom.attr("bindlist",$tag.attr("bindlist")) : false;
      var $bindDom = $dom.find('[hasbind]').length > 0 ? $dom.find('[hasbind]') : $dom;
      var attributes = $tag[0].attributes || err("获取标签属性出错",3);
      var listenList = $tag.attr("listen");
      var bindList = $bindDom.attr("listenlist") ? $bindDom.attr("listenlist").split(",") :[];
      var eventParam = [];
      var nodeValue = [];
      for (var i in attributes) {
          if (attributes.hasOwnProperty(i)) {
              var strStart = attributes[i].nodeName.indexOf("bind");
              if (strStart == 0) {
                  //若是以bind开头，则。
                  nodeValue = attributes[i].nodeValue ? attributes[i].nodeValue.split(",") : [];
                  //获得绑定事件类型
                  eventParam[0] = getEventName(attributes[i].nodeName);
                  //获得事件的回调函数
                  eventParam[1] = nodeValue[0];
                  //获得发布事件的消息名
                  eventParam[2] = nodeValue[1];
                  //获得事件绑定标识，为了更换回调函数
                  // eventParam[3] = nodeValue[2];
                  bindList.push(eventParam.join("-"));
              } else {

              }
          }
      }
      listenList ? $dom.attr("listen",listenList) : false;
      bindList.length > 0 ? $bindDom.attr("bindlist",bindList.join(",")) : false;


  };
  var setListener = function ($dom) {
      var listenList = $dom.attr("listen");
      if (!listenList) {
          //若未配置订阅者，则回退
          return false;
      }
      listenList = JSON.parse(listenList);
      for (var i in listenList) {
          EventListenr.listenEvent.call($dom, i, listenList[i]);
      }
    }
    return {
        bindEvent: bindEvent,
        setListener: setListener,
        parseOptions: parseOptions
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
    };
    //匹配正则
    var checkRegExp = function ($dom, regExpName, regTip) {
        var str = $.trim($dom.val());
        var regTip = regTip === "default" ? "输入不合法" : regTip;
        var regExp = new RegExp(ValidateRules.getCheckRegExp(regExpName) || regExpName);
        var result = regExp.test(str);
        return [result , regTip];
    }
    //校验处理函数
    var triggerChecking = function ($dom, regList) {
        for (var item in regList) {
            var regExp = regList[item].split("-");
            var hanler = ValidateRules.getCheckHandler(regExp[0]);
            var result = hanler ? hanler($dom, regExp[1]) : checkRegExp($dom, regExp[0], regExp[1]);
            checkResult(result[0],$dom, result[1]);
        }
    }
    //回调函数
    var checkHandler = function (event) {
        var $this = event ? $(event.target) : $(this);
        var regList = $this.data("reglist") || [];
        if(regList.length > 0){
          triggerChecking($this, regList);
        } else{
          return false;
        }
    };
    var bindCheck = function ($dom) {
        var tagName =  $dom[0].tagName.toLowerCase();
        var regList = $dom.attr("regexp") ? $dom.attr("regexp").split(",") : [];
        var tipStyle = $dom.attr("tipstyle");
        var $checkDom = $dom;
        var tagNameList = ValidateRules.getTagName();
        var tagName = ValidateRules.getEventName();
        if($.inArray(tagName,tagNameList) == -1){
          $checkDom = $dom.find(tagNameList.join(","));
        }
        if($checkDom.length < 1){
          console.error("校验元素中，必须包含 "+tagNameList.join(","));
          return false;
        }
        //校验样式处理
        addCheckStyle($dom, regList, tipStyle);
        //将参数绑定在checkDom上
        $checkDom.data("reglist",regList);
        $checkDom.data("tipstyle",tipStyle);
        //绑定keyup事件
        $checkDom.on(tagName, checkHandler);
    };
    //校验表单
    var checkForm = function ($form) {
        var flag=true;
        var tagNameList = ValidateRules.getTagName();
        var $items=$form.find(tagNameList.join(","));
        $items.each(function(){
          checkHandler.call(this);
          if($(this).data("resulttip") && $(this).data("resulttip").length > 0 ){
            flag=false;
            $(this).focus();
          }
        });
        return flag;
    };

    //设置错误校验弹出的主题
    var setTheme = function (themeName) {

        if(themeName && typeof themeName === "string"){
          LoadStyle.loadTheme("check-style",true);
        }else{
          return false;
        }
    };
    //根据校验结果 来弹出和隐藏相应的提示
    var checkResult = function (result,$dom,regTip) {
        result?hideTip($dom,regTip):showTip($dom,regTip);

    };
    var hideTip = function($dom,regTip){
      //隐藏校验结果
      var resultTip=$dom.data("resulttip") || [];
      var index=$.inArray(regTip,resultTip);
      if(regTip === "hideAllTip" || resultTip.length<1){
        resultTip=[];
        $dom.removeClass("validate-color");
        $dom.siblings(".reg-tip").remove();
        $dom.data("isinvalid",false);
      }else{
        if(index !== -1){
          resultTip.splice(index ,1);
        }
      }
      $dom.data("resulttip",resultTip);
    };

    //隐藏所有的提示信息，一般为重置输入时使用
    var hideAllTip = function($form){
      var tagNameList = ValidateRules.getTagName();
      $form.find(tagNameList.join(",")).each(function(index,item){
        hideTip($(this),"hideAllTip");
      })

    };
    //显示校验结果
    var showTip = function($dom,regTip){
      var resultTip=$dom.data("resulttip") || [];
      var index=$.inArray(regTip,resultTip);
      if(index == -1){
        resultTip.push(regTip);
        $dom.data("resulttip",resultTip);
      }
      $dom.addClass("validate-color");
      buildTipDiv($dom,regTip);

    };
    // 创建提示框的函数
    var buildTipDiv = function($dom,regTip){
      var html='<div class="reg-tip invalid-div"></div>';
      if($dom.data("isinvalid")){
        //若已有错误提示框，则只变更内容
        $dom.siblings(".reg-tip").text(regTip);
      }else{
        //若无错误提示框，则创建
        var tipStyle=$dom.data("tipstyle");
        if(tipStyle !=="default"){
           //若有配置项，则更换样式
            html=html.replace("invalid-div"," "+tipStyle+" ");
        }
        var $html=$(html);
        $html.text(regTip);
        $dom.parent().css("position","relative");
        $dom.after($html);
        if(tipStyle =="default"){
           //若无配置项，则采用默认的样式
           $html.css("left",$dom.position().left+"px");
           $html.css("top",$dom.outerHeight()+"px");

        }
        $dom.data("isinvalid",true);
      }
    };
    //加载校验的样式文件
    var addCheckStyle = function($dom, regList, tipStyle){
      LoadStyle.loadTheme("check-style");
      //获得校验类型
      for(var i =0 ;i<regList.length; i++){
        var index=$.inArray("required",regList[i].split("-"));
        if(index !== -1){
          $dom.find("label").addClass("required");
          break ;
        }
      }


    };
    var parseOptions = function($tag, $dom){
      var regList = $tag.attr("regexp");
      if(!regList){
        return false;
      }
      var regexp = [];
      var tipStyle = $tag.attr("tipstyle") || "default";
      var $checkDom = $dom.find('[hascheck]').length > 0 ? $dom.find('[hascheck]') : $dom;
      var newRegList =[];
      regList = regList.split(",");
      for(var i = 0;i < regList.length;i++){
        regexp = regList[i].split("-");
        if(!regexp[1]){
          regexp[1] = "default";
        }
        newRegList.push(regexp.join("-"));
      }
      regList=newRegList.join(",");
      if(regList){
        $checkDom.attr("regexp",regList);
        $checkDom.attr("tipstyle",tipStyle);
      }
    }
    return {
        bindCheck: bindCheck,
        checkForm: checkForm,
        setTheme:setTheme,
        hideAllTip:hideAllTip,
        parseOptions:parseOptions
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
  var serializing=function($form){
    var result={};
    var array=$form.serializeArray();
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
  var serializeObject=function($form){
    if($form[0].tagName.toLowerCase()=="form"){
      return serializing($form);
    }else{
      err("序列化出错",2);
    }

  };
  return {
    serializeObject:serializeObject
  };
})();
/*
 * CidFactory 1.0.0
 * author： niulei
 * Time: 2017.4.11
 * description: 生成组件唯一标识
 */
 var CidFactory = (function(){
   var cidList = [];
   var makingCid = function(tagName, tagIndex, cid){

     if(cid && cid+"" !== tagName && $.inArray(cid+"",cidList) == -1){
       cidList.push(cid+"");
       return cid;
     }else{
       return tagName+tagIndex;
     }
   };
   return {
     makingCid:makingCid
   }
 })()
