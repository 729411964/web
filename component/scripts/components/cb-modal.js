/**
 *cbmodal 1.0.0
 * author： dongjingfeng
 * Time: 2017.4.11
 * description: 模态框组件
 */
var Cbmodal=function(){}

ParsingHelper.registerComponent("cb-modal", Cbmodal);

(function($){
    var modalDivList = {
        "default":'<div class="cbmodal-div">'+
                        '<div class="modal-div">'+
                            '<div class="modal-title"><span>模态框</span><span class="close">&times;</span></div>'+
                            '<div class="modal-content"></div>'+
                            '<div class="modal-operation">'+
                            //'<cb-view>'+
                            //'<cb-btn bindcl="modalShow,event2"  width="50%">确定</cb-btn>'+
                            //'<cb-btn bindcl="modalShow,event3"  width="50%">取消</cb-btn>'+
                            //'</cb-view>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
    };
    Cbmodal.getModalDiv = function(modalDivName){
        if (modalDivName && typeof modalDivName === "string") {
            return modalDivList[modalDivName] ? modalDivList[modalDivName] : modalDivList["default"];
        } else {
            console.error("获取模态框时，有误");
            return modalDivList["default"];
        }
    }
})(jQuery);

(function(){
    var options = {
        domDiv:"defalut",
        cid:"modal1"

    }
    Cbmodal.getOptions = function(){
        return $.extend({}, options);
    }
})()

Cbmodal.prototype.initTag = function($tag,cid){
    //获得具体的配置项
    var $modal=$tag,
        options = $.extend(Cbmodal.getOptions(), $tag.data("options")),
        $modalDiv=$(Cbmodal.getModalDiv(options.domDiv));
    $modal.after($modalDiv);
    //处理公共部位的宏命令
    Macro.macroCommand($modal,$modalDiv,options);
    Cbmodal.prototype.modalClose($tag,$modalDiv,options);
    $modal.remove();
    return $modalDiv;
};

Cbmodal.prototype.modalClose = function($tag,$dom,options){
    //解析组件并放入模态框中显示(一个页面多个模态框)
    //$dom.find(".modal-content").html($tag.html());
    //$("cb-view").attr("data-options",'{"column":"2"}');
    //控制基础关闭功能事件
    $(".modal-title .close").on("click",function(){
        $(this).parents(".cbmodal-div").hide();
        $('.modal-content').html('');
        //模态框隐藏后，恢复对页面的控制
        $("body").css({
            "height":"auto",
            "overflow":"auto"
        });
    })
}
//一个页面一个模态框，根据cid等参数，控制模态框显示内容不同
Cbmodal.prototype.modalUpdate = function(message){
    //通过cid查找要在模态框中显示的dom树
    if ($("div[cid='" + message.cid + "']").length === 1) {
        var $dom = $("div[cid='" + message.cid + "'").clone(),
            newCid = '';
        newCid += 'form1';
        $dom.attr("cid",newCid);
        $(".cbmodal-div .modal-content").html($dom);
        //$(this).find(".modal-content").html($("div[cid='"+ newCid +"'"));
    } else {
        var html = '<p class="danger">获取内容失败</p>';
        $(this).find(".modal-content").html(html);
        //err.throwErr();
    }

    //设置模态框标题，undefined时为默认‘模态框’
    if (message.modalTitle) {
        $(".modal-title>span:first-child").text(message.modalTitle);
        console.log("修改标题-" + message.modalTitle);
    }

    //基础服务-X
    //message.hasBase === undefined ? message.hasBase = true : message.hasBase = message.hasBase;
    ( message.hasBase === undefined ) && ( message.hasBase = true );
    if (!message.hasBase) {
        $(".modal-title .close").html('');
    }

    //是否显示遮罩层
    //message.hasShade === undefined ? message.hasShade = true : message.hasShade = message.hasShade;
    ( message.hasShade === undefined ) && ( message.hasShade = true );
    if (message.hasShade) {
        //模态框显示时，限制对页面的操作
        $("body").css({
            "height":"100%",
            "overflow":"hidden"
        });
    } else {
        //遮罩层不显示时
        $(".cbmodal-div").css({
            "width":"auto",
            "height":"auto",
            "position":"static"
        });
    }
    Cbmodal.prototype.updateData();

    //显示模态框
    $(this).show();

}

Cbmodal.prototype.updateData = function(){
    console.log("加载数据");
}
//Cbmodal.prototype.modalEvent=function(callBack){
//    $()
//    if(callBack){
//        for(var selector in callBack){
//            if( typeof callBack[selector]==="function"){
//                $("."+selector+"").on('click',callBack[selector]);
//            }else{
//                console.error("绑定函数有误");
//            }
//        }
//    }else{
//        console.error("未绑定回调函数");
//    }
//}
