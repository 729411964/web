/*
 * TemplateList 1.0.0
 * author： niulei
 * Time: 2017.3.29
 * description:  模板列表，便于维护。
 */
var TemplateList = (function(){

  //默认模板名
  var templateEngine = "mustache";

  var makingTemplate = {
      //按照配置和所选模板引擎生成模板
      mustache: {
          render: function (template, data) {
              //根据模板和数据，返回html片段
              return result = Mustache.render(template, data);
          },
          initHeader: function (options) {
              var template = "<tr>{{#.}}<th field='{{field}}'>{{title}}</th>{{/.}}</tr>";
              return template;
          },
          initTable: function (options) {
              var template = "{{#rows}}<tr>";
              for (var i = 0; i < options.length; i++) {
                  template = template + "<td>{{" + options[i].field + "}}</td>";

              }
              template = template + "</tr>{{/rows}}"
              return template;
          },

          //多选框
          initCheckboxData: function (options) {
              var template = '<ul class="checkbox-list">';
              $.each(options['option'],function (index,item) {
                  var html = '<li><input type="checkbox" name ='+options.name+' value='+item.key+' id='+options.name+'-'+options.tagIndex+'-'+item.key+'>' +
                      '<label class="checkbox-label" for='+options.name+'-'+options.tagIndex+'-'+item.key+'></label><span>'+item.value+'</span></li>';
                  template = template + html;
              })

              template = template + "</ul>";
              return template;
          },
          //单选框
          initRadioData : function (options) {
              var template = '<ul class="radio-list">';
              $.each(options['option'],function (index,item) {
                  var html = '<li><input type="radio" name ='+options.name+' value='+item.key+' id='+options.name+'-'+options.tagIndex+'-'+item.key+'>' +
                      '<label class="radio-label" for='+options.name+'-'+options.tagIndex+'-'+item.key+'></label><span>'+item.value+'</span></li>';
                  template = template + html;
              })

              template = template + "</ul>";
              return template;
          },
          //下拉框
          initSelectData : function (options) {
              var template = '<select class="select-list" '+options.name+'>';
              $.each(options['option'],function (index,item) {
                  var html = '<option value='+item.key+'>'+item.value+'</option>';
                  template = template + html;
              })

              template = template + "</select>";
              return template;
          }
      },
      xxx: {}
  };
  //获得具体的模板工厂
  var getTemplateFactory = function (EngineName,type){
    return type ? makingTemplate[EngineName][type] : makingTemplate[EngineName];
  };

  var getEngineName = function(){
    return templateEngine;
  };

  //添加模板工厂
  var addTemFactory = function (type, fn, EngineName){
    //校验模板名称，若不存在，则返回默认的模板名称
    if (!EngineName) {
        //若没有传模板引擎，则采用默认的模板引擎
        EngineName = templateEngine;
    } else if (!makingTemplate[EngineName]) {
        //若采用的模板引擎不存在，则使用默认的模板引擎
        console.error("不支持" + EngineName + "模板引擎，已使用默认模板引擎" + templateEngine + "生成Dom");
        EngineName = templateEngine;
    }
    if(type && typeof type ==="string" && typeof fn ==="function"){
      makingTemplate[EngineName][type]=fn;
      return true;
    }else{
      return false;
    }

  };


  return {
    getTemplateFactory:getTemplateFactory,
    getEngineName:getEngineName,
    addTemFactory:addTemFactory
  };


})();
