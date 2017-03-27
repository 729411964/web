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
            fn.apply(this,arguments);//挨个执行消息缓存区中的事件处理
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
console.log(Event.listen.toString());
