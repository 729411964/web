/*
 * cb-text 1.0.0
 * author： anwenzhen
 * Time: 2017.4.12
 * description: 文本展示。
 */

var CbText = function () {
};

//注册cb-text组件
ParsingHelper.registerComponent("cb-text", CbText);

//保存容cb-text组件结构的列表
(function () {
    //cb-text组件结构列表
    var domDivList = {
        default: '    <div class="cb-text-div clearfix">' +
        '      <div class="cb-label"></div>' +
        '    </div>'
    };

    //根据cb-textDivName获得容器结构
    CbText.getDomDiv = function (domDivName) {
        if (domDivName && typeof domDivName === "string") { //此处校验可以写为公共方法
            var componentDiv = domDivList[domDivName];
            if (componentDiv) {
                return componentDiv;
            } else {
                err("未找到" + domDivName + "组件结构，使用了默认结构", 1);
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
    CbText.getOptions = function () {
        return $.extend({}, options);
    }
})();

CbText.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbText.getOptions(), $tag.data("options"));
    var $dom = $(CbText.getDomDiv(options["domDiv"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    CbText.prototype.optionsData($tag, $dom, options);
    $tag.remove();
    return $dom;
};

CbText.prototype.optionsData = function ($tag, $dom, options) {
    $dom.children('.cb-label').html(options.text);
};
