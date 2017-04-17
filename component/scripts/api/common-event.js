/*
 * EventHandler 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description:  事件回调函数列表，为了更好地维护。
 */
var EventHandler = (function () {
    //公共事件列表
    var eventList = {
        //回调函数列表，所有的this关键字为触发事件的元素
        serialize: function (triggerName) {
            var $form=$(this).closest("form");
            var params={};
            //调用序列化模块
            if(!CheckHelper.checkForm($form)){
              return false;
            };
            $.extend(params,Serialize.serializeObject($form));
            console.log(params);
            Event.trigger(triggerName,params);
        },
        modal:function(triggerName){
            //Eventlistenr.listenEvent(triggerName,operation);
            Event.trigger(triggerName);
        },
        modalShow:function(triggerName,message){
            /*
            * 触发模态框事件时
            * 1.传入要显示的Dom树的唯一标识cid需传入的参数
            * 2.要显示的模态框标题，undefined时为默认标题
            * 3.传入是否需要基础服务，例如X；因具体情况不定，不提供其他基础服务
            * 4.是否需要遮罩层
            * */
            var message = {
                "cid":"cb-form1",
                //"modalTitle":"我是模态框",
                //"hasBase":false,
                //"hasShade":false
            };
            //if (arguments.length > 1) {
                Event.trigger(triggerName,message);
            //} else {
            //    Event.trigger(triggerName);
            //}
        }

    };

    var callHandler = function (eventName, triggerName) {  //wing　event1
        var handler = eventList[eventName];
        if (handler && typeof handler === "function") {
            //确保自定义的回调函数this指向触发事件的元素
            handler.call(this, triggerName)

        } else {
            console.error(eventName + "回调函数未找到");
        }

    };
    var addHandler = function (eventName, fn) {
        if (typeof fn === "function") {
            eventList[eventName] = fn;
        }

    }
    return {
        callHandler: callHandler,
        addHandler: addHandler
    }

})();
