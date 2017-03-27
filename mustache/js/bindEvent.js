/*!
 * bindEvent 1.0.0
 * author： niulei
 * Time: 2017.3.24
 * description: 绑定事件的模块，即在自定义标签解析完毕后，为制定的标签添加事件
 */

var BindEvent=function(){};

(function(){
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
  }
  BindEvent.getEventName=function(eventName){
    return eventList[eventName];
  }
})();

BindEvent.prototype.bindEvent=function($dom,eventType,handler){

}

//获得绑定事件的列表
BindEvent.prototype.setEvent=function($tag,$dom){
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
    $dom.on(BindEvent.getEventName(name),function(event){
      var event=eventList[name].split(",");
      //改变callHandler函数this的指向，确保回调函数中的this都为触发事件的元素
      EventHandler.callHandler.call(this,event[0],event[1]);
    })
  }

}
