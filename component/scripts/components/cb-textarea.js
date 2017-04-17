/*
 * cb-textarea 1.0.0
 * author： anwenzhen
 * Time: 2017.4.12
 * description: 输入文本框组件。
 */

var CbTextarea = function () {
};

//注册cb-textarea组件
ParsingHelper.registerComponent("cb-textarea", CbTextarea);

//保存容cb-textarea组件结构的列表
(function () {
    //cb-textarea组件结构列表
    var domDivList = {
        default: '    <div class="cb-textarea-div clearfix">' +
        '      <label class="cblabel"></label>' +
        '      <textarea class="cb-textarea"  type="wing" hasBind="true"></textarea>' +
        '    </div>'
    };

    //根据 cb-textareaDivName获得容器结构
    CbTextarea.getDomDiv = function (domDivName) {
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
        domDiv: "default",
        type: "text"
    };
    CbTextarea.getOptions = function () {
        return $.extend({}, options);
    }
})();

CbTextarea.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbTextarea.getOptions(), $tag.data("options"));
    var $dom = $(CbTextarea.getDomDiv(options["domDiv"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    CbTextarea.prototype.optionsData($tag, $dom, options);
    $tag.remove();
    return $dom;
};

CbTextarea.prototype.optionsData = function ($tag, $dom, options) {
    $dom.children('label').html(options.label);
    $dom.children('textarea').attr("name", options.name);
    if (options.chartNum) {
        $dom.append('<div class="textarea-remark">还可以输入' + options.chartNum + '个字</div>');
        CbTextarea.prototype.validateChartNum($dom, options.chartNum);
    }
};

CbTextarea.prototype.validateChartNum = function ($dom, chartNum) {
    $dom.children('textarea').on('keyup', function () {
        var charLength = $dom.children('textarea').val().length;
        var chartRemainderNum = chartNum - charLength;
        if (chartRemainderNum == 0 || chartRemainderNum > 0) {
            $dom.children('.textarea-remark').html('还可以输入' + chartRemainderNum + '个字');
        } else {
            var textareaValue = $dom.children('textarea').val().substr(0, charLength - 1);
            $(this).val(textareaValue);
        }
    })
};
