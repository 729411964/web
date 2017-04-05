/*
 * cuvbtn 1.0.0
 * author： niulei
 * Time: 2017.3.27
 * description: 按钮组件，用来发布事件或订阅事件。
 */

var Cubtn = function () {
};

//注册Cubtn组件
ParsingHelper.registerComponent("cubtn", Cubtn);

//保存容cubtn组件结构的列表
(function () {
    //cubtn组件结构列表
    var domDivList = {
        default: '    <div class="cubtn-div">' +
        '      <button class="cubtn" hasBind="true"></button>' +
        '    </div>'

    };

    //根据 cubtnDivName获得容器结构
    Cubtn.getDomDiv = function (domDivName) {
        if (domDivName && typeof domDivName === "string") { //此处校验可以写为公共方法
            var componentDiv = domDivList[domDivName];
            if (componentDiv) {
                return componentDiv;
            } else {
                err("未找到" + domDivName + "组件结构，使用了默认结构",1);
                return domDivList["default"];
            }
            return
        } else {
            return domDivList["default"];
        }
    }

})();
(function () {
    var options = {
        domDiv: "default",
        id: "cubtn",
        type:"button"

    };
    Cubtn.getOptions = function () {
        return $.extend({}, options);
    }
})()
Cubtn.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(Cubtn.getOptions(), $tag.data("options"));
    var $dom = $(Cubtn.getDomDiv(options["domDiv"]));
    $dom.find(".cubtn").text($tag.text());
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    //设置自身的属性
    Cubtn.prototype.setAttr($dom, options);
    $tag.remove();
    return $dom;

};
Cubtn.prototype.setAttr = function($dom, options){
    //设置按钮属性
    options["type"]?$dom.find(".cubtn").attr("type",options["type"]):err("无此属性",1);
    //设置按钮是否失效
    options["disabled"]?$dom.find(".cubtn").prop("disabled",options["type"]).addClass("disabled"):err("无此属性",1);
};
