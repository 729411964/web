/*
 * cb-select 1.0.0
 * author： anwenzhen
 * Time: 2017.4.12
 * description: 下拉框。
 */

var CbSelect = function () {
};

//注册CbSelect组件
ParsingHelper.registerComponent("cb-select", CbSelect);

//保存容cb-select组件结构的列表
(function () {
    //cb-select组件结构列表
    var domDivList = {
        default: '    <div class="cb-select-div clearfix">' +
        '    </div>'
    };

    //根据 cb-select获得容器结构
    CbSelect.getDomDiv = function (domDivName) {
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
        cid: "cb-select",
        type: "text"
    };
    CbSelect.getOptions = function () {
        return $.extend({}, options);
    }
})();

CbSelect.prototype.initTag = function ($tag) {
    //获得具体的配置项
    var options = $.extend(CbSelect.getOptions(), $tag.data("options"));
    var $dom = $(CbSelect.getDomDiv(options["domDiv"]).replace("wing", options["type"]));
    $tag.after($dom);
    //处理公共部位的宏命令
    Macro.macroCommand($tag, $dom, options);
    var tagIndex = $tag.data("tagindex");
    if (options.isRequest !== true || options.isRequest !== 'true') {
        CbSelect.prototype.initData($dom, options, tagIndex);
    }
    $tag.remove();
    return $dom;
};

CbSelect.prototype.initData = function ($dom, options, tagIndex) {
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
                TemplateHelper.parseOptions("initSelectData", options.name, dataList, "");
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
        TemplateHelper.parseOptions("initSelectData", options.name, options, "");
        html = TemplateHelper.render(options.name, options);
        $dom.append(html);
    }
};




