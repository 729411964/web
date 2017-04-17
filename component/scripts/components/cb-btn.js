/*
 * cb-btn 1.0.0
 * author： niulei
 * Time: 2017.3.27
 * description: 按钮组件，用来发布事件或订阅事件。
 */

var CbBtn = function () {
};

//注册CbBtn组件
ParsingHelper.registerComponent("cb-btn", CbBtn);

//保存容cb-btn组件结构的列表
(function () {
    //cb-btn组件结构列表
    var domDivList = {
        default: '    <div class="cb-btn-div">' +
        '      <button class="cb-btn" hasBind="true"></button>' +
        '    </div>'

    };

    //根据 cb-btnDivName获得容器结构
    CbBtn.getDomDiv = function (domDivName) {
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
        type:"button"

    };
    CbBtn.getOptions = function () {
        return $.extend({}, options);
    }
})();
CbBtn.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbBtn.getOptions(), $tag.data("options"));
    //获取Dom结构，且转化为Jquery对象
    var $dom = $(CbBtn.getDomDiv(options["domDiv"]));
    //处理自定义标签中的内容
    $dom.find(".cb-btn").text($tag.text());
    //将处理好的Dom结构插在自定义标签后
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    //设置自身的属性
    CbBtn.prototype.setAttr($dom, options);
    //删除自定义标签
    $tag.remove();
    //返回解析后的Dom
    return $dom;

};
CbBtn.prototype.setAttr = function($dom, options){
    //设置按钮属性
    options["type"]?$dom.find(".cb-btn").attr("type",options["type"]):err("无此属性",1);
    //设置按钮是否失效
    options["disabled"]?$dom.find(".cb-btn").prop("disabled",options["type"]).addClass("disabled"):err("无此属性",1);
};
