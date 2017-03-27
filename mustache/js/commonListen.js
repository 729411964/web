var Eventlistenr=(function(){
  //公共事件列表
  var listenList={
    //回调函数列表，所有的this关键字为触发事件的元素
    listen1:function(triggerName){
      console.log($(this));
      console.log("订阅者接受到");
    }

  };

  var listenEvent=function(eventName,handlerName){
    //找到缓存的回调函数
    var handler=listenList[handlerName];
    if(handler&& typeof handler ==="function"){
      //确保自定义的回调函数this指向触发事件的元素
      Event.listen(eventName,handler);

    }else{
      console.error(handlerName+"回调函数未找到");
    }

  };
  var setListenr=function(handlerName,fn){
    if(typeof fn ==="function"){
      listenList[handlerName]=fn;
    }
    console.log(listenList);

  }
  return {
    listenEvent:listenEvent,
    setListenr:setListenr
  }

})();
