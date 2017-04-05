var EventHandler = (function () {
    //公共事件列表
    var eventList = {
        //回调函数列表，所有的this关键字为触发事件的元素
        serialize: function (triggerName) {
            var $dom=$(this).closest(".cuform");
            //调用序列化模块
            var params=Serialize.serializeObject($dom);
            console.log(params);
            Event.trigger(triggerName,params);
        }

    };

    var callHandler = function (eventName, triggerName) {
        var handler = eventList[eventName];
        if (handler && typeof handler === "function") {
            //确保自定义的回调函数this指向触发事件的元素
            handler.call(this, triggerName)

        } else {
            console.error(eventName + "回调函数未找到");
        }

    };
    var setHandler = function (eventName, fn) {
        if (typeof fn === "function") {
            eventList[eventName] = fn;
        }

    }
    return {
        callHandler: callHandler,
        setHandler: setHandler
    }

})();
