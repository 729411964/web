/*
 * cb-input 1.0.0
 * author： anwenzhen
 * Time: 2017.4.12
 * description: 输入框组件，。
 */

var CbInput = function () {
};

//注册cb-input组件
ParsingHelper.registerComponent("cb-input", CbInput);

//保存容cb-input组件结构的列表
(function () {
    //cb-input组件结构列表
    var domDivList = {
        default: '    <div class="cb-input-div clearfix">' +
        '      <input class="cb-input"  type="wing" hasBind="true">' +
        '    </div>'
    };

    //根据cb-inputDivName获得容器结构
    CbInput.getDomDiv = function (domDivName) {
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
        domDiv: "default",
        type: "text"

    };
    CbInput.getOptions = function () {
        return $.extend({}, options);
    }
})();

CbInput.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbInput.getOptions(), $tag.data("options"));
    var $dom = $(CbInput.getDomDiv(options["domDiv"]).replace("wing", options["type"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    CbInput.prototype.optionsData($tag, $dom, options);
    $tag.remove();
    return $dom;
};

CbInput.prototype.optionsData = function ($tag, $dom, options) {
    $dom.children('label').html(options.label);
    $dom.children('input').attr('placeholder',options.placeholder);
    $dom.children('input').attr('name',options.name);
};
