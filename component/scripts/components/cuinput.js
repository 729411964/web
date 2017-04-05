/*
 * cuinput 1.0.0
 * author： niulei
 * Time: 2017.3.31
 * description: 输入框组件，。
 */

var Cuinput = function () {
};

//注册cuinput组件
ParsingHelper.registerComponent("cuinput", Cuinput);

//保存容cuinput组件结构的列表
(function () {
    //cubtn组件结构列表
    var domDivList = {
        default: '    <div class="cuinput-div">' +
        '      <label class="cuxx"></label>' +
        '      <input class="cuinput" type="wing" hasBind="true">' +
        '    </div>'


    };

    //根据 cubtnDivName获得容器结构
    Cuinput.getDomDiv = function (domDivName) {
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
        id: "cuinput",
        type: "text"

    };
    Cuinput.getOptions = function () {
        return $.extend({}, options);
    }
})();
Cuinput.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(Cuinput.getOptions(), $tag.data("options"));
    var $dom = $(Cuinput.getDomDiv(options["domDiv"]).replace("wing", options["type"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    Cuinput.prototype.optionsData($tag, $dom, options);
    $tag.remove();
    return $dom;

};

Cuinput.prototype.optionsData = function ($tag, $dom, options) {
    $dom.children('label').html(options.label);
    $dom.children('input').attr('placeholder',options.placeholder);
};
