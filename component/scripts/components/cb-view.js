/*
 * cbview 1.0.0
 * author： niulei
 * Time: 2017.3.22
 * description:  容器组件，可提供网格化的功能
 */

var CbView = function () {
};

//注册cbview组件
ParsingHelper.registerComponent("cb-view", CbView);

//保存容器结构的列表
(function ($) {
    //容器结构列表
    var domDivList = {
        default: '    <div class="cb-view-div clearfix">' +

        '    </div>'

    };

    //根据 cbviewDivName获得容器结构
    CbView.getdomDiv = function (domDivName) {
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

})(jQuery);
(function () {
    var options = {
        domDiv: "default"

    };
    CbView.getOptions = function () {
        return $.extend({}, options);
    }
})()
CbView.prototype.initTag = function ($tag) {
    var options = $.extend(CbView.getOptions(), $tag.data("options"));
    var $dom = $(CbView.getdomDiv(options["domDiv"]));
    $tag.after($dom);
    //处理列合并的函数
    CbView.prototype.colspan($tag, $dom, options);
    //设置自身的属性
    CbView.prototype.setAttr($dom, options);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    //移除自定义标签
    $tag.remove();
    return $dom;

}
CbView.prototype.colspan = function ($cbview, $cbviewDiv, options) {
    var column = options["column"]?1 / options["column"] * 100:100;
    var children = $cbview.children();
    children.each(function () {
        var tagName = $(this)[0].tagName;
        var colspan = $(this).attr("colspan");
        if (!colspan) {
            colspan = 1;
        }
        $(this).appendTo($cbviewDiv).wrap("<div class='content-item' style='width:" + column * colspan + "%'></div>");

    })
}
CbView.prototype.setAttr = function($dom, options){
    var $item=$dom.find(".content-item")
    //设置按钮属性
    options["height"]?$item.css("height",options["height"]):err("无此属性",1);

};
