/*
 * EventListenr 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description:  订阅消息的回调函数列表，便于维护
 */
var EventListenr = (function () {
    //公共订阅回调列表
    var listenList = {
        //回调函数列表，所有的this关键字为调阅消息的元素
        listen1: function (params) {
            console.log($(this));
            console.log("订阅者接受到");
        },
        confirm:function(params){
            console.log("confirm");
        },
        cancel:function(params){
            //console.log("cancel");
            //$(this).hide();
            //$('.modal-content').html('');
        },
        showModal:function(message){
            console.log(message);
            Cbmodal.prototype.modalUpdate.call(this,message);
            //$(this).show();
        }

    };

    var listenEvent = function (eventName, handlerName) {    //找到缓存的回调函数
        var handler = listenList[handlerName];
        if (handler && typeof handler === "function") {
            //确保自定义的回调函数this指向触发事件的元素
            Event.listen.call(this, eventName, handler);

        } else {
            console.error(handlerName + "回调函数未找到");
        }

    };
    var addListenr = function (handlerName, fn) {
        if (typeof fn === "function") {
            listenList[handlerName] = fn;
        }
    }
    return {
        listenEvent: listenEvent,
        addListenr: addListenr
    }

})();
