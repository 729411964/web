import store from 'store';
let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

//数据存储
util.storeSet=function(param,data){
    store.set(param,data);
};
//数据获取
util.storeGet=function(param){
    return store.get(param)
};
//数据删除
util.storeRemove=function(param){
    store.remove(param)
};
//数据全清
util.storeClear=function(){
    store.clearAll();
};
//所有存储数据列表展示
util.storeList=function(){
    store.each(function(value, key) {
        console.log(key, '==', value)
    });
};
//获取值的类型
util.getType = function (obj) {
    var typeStr = Object.prototype.toString.call(obj),
        typeArr = [];
    typeStr = typeStr.substring(1, typeStr.length - 1);
    typeArr = typeStr.split(" ");
    return typeArr[1];
};
/**
 * @param  {[Function]}  延时调用函数
 * @param  {[Number]}  延迟多长时间
 * @return {[Number]}  至少多长时间触发一次
 */
util.throttle =  function(fn, delay, mustRun){
    var timer = null,
        previous = null;

    return function(){
        var now = +new Date(),
            context = this,
            args = arguments;
        if (!previous ) previous = now;
        var remaining = now - previous;
        if(mustRun && remaining >= mustRun){
            fn.apply(context, args);
            previous = now;
        }else{
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);

        }
    }
}

export default util;