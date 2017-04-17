/*
 * cb-form 1.0.0
 * author： niulei
 * Time: 2017.4.1
 * description: 表单容器组件。
 */

var CbForm = function () {
};

//注册Cbbtn组件
ParsingHelper.registerComponent("cb-form", CbForm);

//保存容cbbtn组件结构的列表
(function () {
    //cbbtn组件结构列表
    var domDivList = {
        default: '  <div class="cb-form-div">'+
                  '    <div class="cb-form-head"></div>'+
                  '    <form class="cb-form"></form>'+
                  '  </div>'


    };

    //根据 cbbtnDivName获得容器结构
    CbForm.getDomDiv = function (domDivName) {
        if (domDivName && typeof domDivName === "string") { //此处校验可以写为公共方法
            var componentDiv = domDivList[domDivName];
            if (componentDiv) {
                return componentDiv;
            } else {
                err("未找到" + domDivName + "组件结构，使用了默认结构",1);
                return domDivList["default"];
            }
        } else {
            return domDivList["default"];
        }
    }

})();
(function () {
    var options = {
        domDiv: "default"
    };
    CbForm.getOptions = function () {
        return $.extend({}, options);
    }
})()
CbForm.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbForm.getOptions(), $tag.data("options"));
    var $dom = $(CbForm.getDomDiv(options["domDiv"]));
    $tag.after($dom);
    //将自定义标签中的内容插入到生成的form中
    $dom.find(".cb-form").append($tag.html());
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    //设置自身的属性
    CbForm.prototype.setAttr($dom, options);
    $tag.remove();
    return $dom;

};
CbForm.prototype.setAttr = function($dom, options){
    //设置标题属性
    options["title"]?$dom.find(".cb-form-head").text(options["title"]):err("无此属性",1);
    //设置宽度
    options["width"]?$dom.css("width",options["width"]):err("无此属性",1);
};
