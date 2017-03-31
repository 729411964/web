/*
 * commonJS 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description:  公共JS,用来存放公共模块的地方，由于未使用那些打包工具，所以只能手动写到一块。
 */

$(function(){
  var tagArray=ParsingHelper.getTag();
  var tagNames=tagArray.join(",");
  var $tag=$(tagNames);
  $tag.each(function(){
    //解析具体的组件
    ParsingHelper.initTag($(this)[0].tagName,$(this));
  })
})

/*
 * Macro 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description: 宏命令集合，用于执行一系列的操作
 */
var Macro=(function(){
  var macroCommand=function($tag,$dom,options){
    //将配置绑定到Dom上
    $dom.data("options",options);
    //通过是否含有hasbind属性获得要绑定事件的具体Dom
    var $bindDom=$dom.find($('[hasbind]'));
    //为组件设置唯一的id
    $dom.attr("cid",options.id);
    //将自定义标签的样式放在Dom上。
    $dom.addClass($tag.attr("class"));
    //将配置文件绑定到组件上
    //为组件绑定事件
     BindEvent.bindEvent($tag,$bindDom);
    //为组件订阅事件
    BindEvent.setListener($tag,$dom);
    //添加校验规则。
  };
  return {
    macroCommand:macroCommand
  }

})()
/*
 * parsingHelper 1.0.0
 * author： niulei
 * Time: 2017.3.23
 * description:  公共组件，解析模板
 */
var ParsingHelper=(function(){
  // 缓存已注册的组件
  var componentList={};
  var registerComponent=function(componentName,fn){
    var fdStart = componentName?componentName.indexOf("cu"):"-1";
    if(fdStart == 0){
      //若是以cu开头，则通过
      if(typeof fn ==="function"){
        componentList[componentName]=fn;
      }
    }else{
      //若不是以cu开头，则不通过
      console.error("解析模块注册"+componentName+"组件时出错");
      return false;
    }

  };
  var getTag=function(){
    var tagArray=[];
    for(var i in componentList){
      if(componentList.hasOwnProperty(i)){
        tagArray.push(i);
      }
    }
    return tagArray;
  };
  var initTag=function(tagName,$tag){
    if(tagName && typeof tagName==="string"){
      tagName=tagName.toLowerCase();
      componentList[tagName]["prototype"]["initTag"]($tag);
    }
  };
  return {
    registerComponent:registerComponent,
    getTag:getTag,
    initTag:initTag
  }
})();



/*
 * TemplateHelper 1.0.0
 * author： niulei
 * Time: 2017.3.21
 * description： 此模块为公共模块，目的为缓存模板和利用模板生成html，因为可能会换模板引擎，所以模板的生成，渲染，缓存在此模块定义。
 */
var TemplateHelper=(function(){

  var templateEngine="mustache";

  var templateList={};//缓存模板的地方

  var makingTemplate={
     //按照配置和所选模板引擎生成模板
     mustache:{
       render:function(template,data){
         //根据模板和数据，返回html片段
         return result=Mustache.render(template,data);
       },
       initHeader:function(options){
           var template="<tr>{{#.}}<th field='{{field}}'>{{title}}</th>{{/.}}</tr>";
           return template;
       },
       initTable:function(options){
         var template="{{#rows}}<tr>";
         for(var i=0;i<options.length;i++){
           template=template+"<td>{{"+options[i].field+"}}</td>";

         }
         template=template+"</tr>{{/rows}}"
         return template;
       }

     },
     xxx:{

     }
  }

  var parseOptions=function(type,id,options,EngineName){
     //通过配置文件，生成模板   ，
     if(!EngineName){
       //若没有传模板引擎，则采用默认的模板引擎
       EngineName=templateEngine;
     }else if(!makingTemplate[EngineName]){
       //若采用的模板引擎不存在，则使用默认的模板引擎
       console.error("不支持"+EngineName+"模板引擎，已使用默认模板引擎"+templateEngine+"生成模板");
       EngineName=templateEngine;
     }
     if(id && typeof id==="string"){
       //调用生成模板的方法
        var template=makingTemplate[EngineName][type](options);
        //将生成的模板存入缓存列表中
        templateList[id]=template;
     }else{
       console.error("请传入组件的唯一标识");
     }

  }
  var renderTemplate=function(id,data,EngineName){
     //通过id来查找模板，查找到模板后通过数据渲染出html片段。
     if(!EngineName){
       //若没有传模板引擎，则采用默认的模板引擎
       EngineName=templateEngine;
     }else if(!makingTemplate[EngineName]){
       //若采用的模板引擎不存在，则使用默认的模板引擎
       console.error("不支持"+EngineName+"模板引擎，已使用默认模板引擎"+templateEngine+"生成Dom");
       EngineName=templateEngine;
     }
     if(!templateList[id]){
       console.error("未找到"+id+"模板");
       return false;
     }
     return makingTemplate[EngineName]["render"](templateList[id],data);

  };
  return {
    render:renderTemplate,
    parseOptions:parseOptions
  }

 })();
/*
 * bindEvent 1.0.0
 * author： niulei
 * Time: 2017.3.24
 * description: 绑定事件的模块，即在自定义标签解析完毕后，为制定的标签添加事件
 */
var BindEvent=(function(){
  var eventList={
    //此处事件均为冒泡事件。
    "bindcl":"click",
    "binddb":"dbclick",
    "bindfs":"focus",
    "bindfsi":"focusin",
    "bindfso":"focusout",
    "bindbl":"blur",
    "bindcg":"change",
    "bindku":"keyup",
    "bindkd":"keydown",
    "bindkp":"keypress"
    //若要支持不冒泡的事件，则在此处另行配置事件列表，而后，在setEvent的函数中添加限制
  };
  var getEventName=function(eventName){
    return eventList[eventName];
  };

  //绑定事件函数
  var bindEvent=function($tag,$dom){
    var attributes=$tag[0].attributes;
    var eventList={};
    for(var i in attributes){
      if(attributes.hasOwnProperty(i)){
        var strStart=attributes[i].nodeName.indexOf("bind");
        if(strStart == 0){
          //若是以bind开头，则将其推入列表中
          eventList[attributes[i].nodeName]=attributes[i].nodeValue;
        }else{

        }
      }
    }
    attributes=null; //由于事件绑定会产生闭包，所以在此处释放内存空间
    for(var name in eventList){
      $dom.attr(name,eventList[name]);
      (function(){
        var eventType=eventList[name].split(",");
        $dom.on(getEventName(name),function(event){
          //改变callHandler函数this的指向，确保回调函数中的this都为触发事件的元素
          EventHandler.callHandler.call(this,eventType[0],eventType[1]);
        })
      })()

    }

  };
  var setListener=function($tag,$dom){
    var listenList=$tag.attr("listen");
    if(!listenList){
      //若未配置订阅者，则回退
      return false;
    }
    listenList=JSON.parse(listenList);
    for(var i in listenList){
      Eventlistenr.listenEvent.call($dom,i,listenList[i]);
    }

  };
  return {
    bindEvent:bindEvent,
    setListener:setListener
  }

})();
/*
 * Event 1.0.0
 * author： niulei
 * Time: 2017.3.24
 * description: 事件发布订阅中心，用于发布订阅事件
 */
var Event=(function(){
  var clientList={},
    listen,
    trigger,
    remove;
    var listen=function(key,fn){ //订阅事件的函数
      if(!clientList[key]){
        clientList[key]=[];
      }
      if(typeof fn ==="function"){
        fn.context=this;
        clientList[key].push(fn); //若fn是函数，则把fn推入消息缓存区clientList
      }else{
        console.log(fn);//若fn不是函数，不推入缓存区
      }

    };
    var trigger=function(){
      var key=Array.prototype.shift.call(arguments),//获得参数中最前面的key类型
          fns=clientList[key];
          if(!fns ||fns.length==0){
            console.log("没有此"+key+"的订阅者");
            return false;
          }
          for(var i=0,fn;fn=fns[i];i++){
            fn.apply(fn.context,arguments);//挨个执行消息缓存区中的事件处理
          }
    };
    var remove=function(){

    };
    return {
      listen:listen,
      trigger:trigger,
      remove:remove
    }

})();
