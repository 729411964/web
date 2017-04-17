/*
 * cb-form-base 1.0.0
 * author： anwenzhen
 * Time: 2017.4.12
 * description: 表单基础组件。
 */

var CbFormBase = function () {
};

//注册CbFormBase组件
ParsingHelper.registerComponent("cb-form-base", CbFormBase);

//保存容cb-form-base组件结构的列表
(function () {
    //cb-form-base组件结构列表
    var domDivList = {
        default: '    <div class="cb-form-base-div clearfix">' +
        '   <label class="label"></label>' +
        '   </div>'
    };

    //根据 cb-form-base获得容器结构
    CbFormBase.getDomDiv = function (domDivName) {
        if (domDivName && typeof domDivName === "string") { //此处校验可以写为公共方法
            var componentDiv = domDivList[domDivName];
            if (componentDiv) {
                return componentDiv;
            } else {
                err("未找到" + domDivName + "组件结构，使用了默认结构", 1);
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
        cid: "cb-form-base"
    };
    CbFormBase.getOptions = function () {
        return $.extend({}, options);
    }
})();

CbFormBase.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbFormBase.getOptions(), $tag.data("options"));
    var $dom = $(CbFormBase.getDomDiv(options["domDiv"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    CbFormBase.prototype.optionsData($tag, $dom, options);
    var tagIndex = $tag.data("tagindex");
    //判断组合组件是不是input组合组件
    if (options.item === 'input' && options.type) {
        $dom.append('<input type=' + options.type + ' name=' + options.name + ' placeholder = ' + options.placeholder + '>');
    } else if (options.item === 'input' && !options.type) {
        $dom.append('<input type="text" name=' + options.name + ' placeholder = ' + options.placeholder + '>');
    } else if(options.item === 'textarea'){
        $dom.append('<textarea  name=' + options.name + '></textarea>');
        if (options.chartNum) {
            $dom.append('<div class="textarea-remark">还可以输入' + options.chartNum + '个字</div>');
            CbFormBase.prototype.validateChartNum($dom, options.chartNum);
        }
    } else {
        if (options.isRequest !== true && options.isRequest !== 'true') {
            CbFormBase.prototype.initData($dom, options, tagIndex);
        }
    }
    $tag.remove();
    return $dom;
};

CbFormBase.prototype.optionsData = function ($tag, $dom, options) {
    $dom.children('label').html(options.label);
};

CbFormBase.prototype.initData = function ($dom, options, tagIndex) {
    //ajax加载请求数据
    if (options.service) {
        var list = options.list;
        var serviceId = options.service;
        var data = {
            "type": "POST",
            "url": "checkbox-data.json",
            "param": {
                "service": serviceId,
                "paraCode": options.paraCode
            },
            "successF": function (returnData) {
                var attrList = [];
                $.each(returnData[list], function (index, item) {
                    var isTrue = true;
                    if (options.option != undefined && options.option.length) {
                        for (var i = 0; i < options.option.length; i++) {
                            if (item[options.value] == options.option[i].key) {
                                isTrue = false;
                            }
                        }
                    }
                    if (isTrue) {
                        attrList.push(returnData[list][index]);
                    }
                });
                if (options.option != undefined && options.option.length) {
                    for (var i = 0; i < options.option.length; i++) {
                        attrList.push(options.option[i]);
                    }
                }
                var dataList = {};
                dataList.tagIndex = tagIndex;
                dataList.option = attrList;
                dataList.name = options.name;
                CbFormBase.prototype.initItemOptions($dom, options.item, options.name, dataList);

            },
            //业务数据有误的提示 带确认
            "errorF": function (value1, value2, value3) {
            }
        };
        CommonAjax.ajax(data);
    } else {
        //没有请求
        options.tagIndex = tagIndex;
        CbFormBase.prototype.initItemOptions($dom, options.item, options.name, options);
    }
};

CbFormBase.prototype.initItemOptions = function ($dom, item, name, options) {
    var html = "";
    if (item === 'select') {
        TemplateHelper.parseOptions("initSelectData", options.name, options, "");
    }
    if (item === 'radio') {
        TemplateHelper.parseOptions("initRadioData", options.name, options, "");
    }
    if (item === 'checkbox') {
        TemplateHelper.parseOptions("initCheckboxData", options.name, options, "");
    }
    html = TemplateHelper.render(options.name, options);
    $dom.append(html);
}

CbFormBase.prototype.validateChartNum = function ($dom, chartNum) {
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




