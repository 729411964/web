/*
 * cb-radio 1.0.0
 * author： anwenzhen
 * Time: 2017.4.12
 * description: 单选框。
 */

var CbRadio = function () {
};

//注册CbRadio组件
ParsingHelper.registerComponent("cb-radio", CbRadio);

//保存容cb-radio组件结构的列表
(function () {
    //cb-radio组件结构列表
    var domDivList = {
        default: '    <div class="cb-radio-div clearfix">' +
        '    </div>'
    };

    //根据 cb-radio获得容器结构
    CbRadio.getDomDiv = function (domDivName) {
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
        cid: "cb-radio",
        type: "text"
    };
    CbRadio.getOptions = function () {
        return $.extend({}, options);
    }
})();

CbRadio.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbRadio.getOptions(), $tag.data("options"));
    var $dom = $(CbRadio.getDomDiv(options["domDiv"]).replace("wing", options["type"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    var tagIndex = $tag.data("tagindex");
    if (options.isRequest !== true && options.isRequest !== 'true') {
        CbRadio.prototype.initData($dom, options, tagIndex);
    }
    $tag.remove();
    return $dom;
};

CbRadio.prototype.initData = function ($dom, options, tagIndex) {
    //ajax加载请求数据
    if (options.service) {
        var list = options.list;
        var serviceId = options.service;
        var data = {
            "type": "POST",
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
                var html = "";
                TemplateHelper.parseOptions("initRadioData", options.name, dataList, "");
                html = TemplateHelper.render(options.name, dataList);
                $dom.append(html);
            },
            //业务数据有误的提示 带确认
            "errorF": function (value1, value2, value3) {
            }
        };
        CommonAjax.ajax(data);
    } else {
        //没有请求
        options.tagIndex = tagIndex;
        var html = "";
        TemplateHelper.parseOptions("initRadioData", options.name, options, "");
        html = TemplateHelper.render(options.name, options);
        $dom.append(html);
    }
};




