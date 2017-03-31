
/*!
 * TemplateHelper 1.0.0
 * author： niulei
 * Time: 2017.3.21
 * description： 此模块为公共木块，目的为缓存模板和利用模板生成html，因为可能会换模板引擎，所以模板的生成，渲染，缓存在此模块定义。
 */

var TemplateHelper=(function(){
  var templateEngine="mustache";

  var templateList={};//缓存模板的地方

  var makingTemplate={
    //按照配置和所选模板引擎生成模板
    mustache:{
      render:function(template,data){
        //根据模板和数据，返回html片段
        return result=Mustache.render(template,data);
      },
      initHeader:function(options){
          var template="<tr>{{#.}}<th field='{{field}}'>{{title}}</th>{{/.}}</tr>";
          return template;
      },
      initTable:function(options){
        var template="{{#rows}}<tr>";
        for(var i=0;i<options.length;i++){
          template=template+"<td>{{"+options[i].field+"}}</td>";

        }
        template=template+"</tr>{{/rows}}"
        return template;
      }

    },
    xxx:{

    }
  }

  var parseOptions=function(type,id,options,EngineName){
    //通过配置文件，生成模板   ，
    if(!EngineName){
      //若没有传模板引擎，则采用默认的模板引擎
      EngineName=templateEngine;
    }else if(!makingTemplate[EngineName]){
      //若采用的模板引擎不存在，则使用默认的模板引擎
      console.error("不支持"+EngineName+"模板引擎，已使用默认模板引擎"+templateEngine+"生成模板");
      EngineName=templateEngine;
    }
    if(id && typeof id==="string"){
      //调用生成模板的方法
       var template=makingTemplate[EngineName][type](options);
       //将生成的模板存入缓存列表中
       templateList[id]=template;
    }else{
      console.error("请传入组件的唯一标识");
    }

  }
  var renderTemplate=function(id,data,EngineName){
    //通过id来查找模板，查找到模板后通过数据渲染出html片段。
    if(!EngineName){
      //若没有传模板引擎，则采用默认的模板引擎
      EngineName=templateEngine;
    }else if(!makingTemplate[EngineName]){
      //若采用的模板引擎不存在，则使用默认的模板引擎
      console.error("不支持"+EngineName+"模板引擎，已使用默认模板引擎"+templateEngine+"生成Dom");
      EngineName=templateEngine;
    }
    if(!templateList[id]){
      console.error("未找到"+id+"模板");
      return false;
    }
    return makingTemplate[EngineName]["render"](templateList[id],data);

  };
  return {
    render:renderTemplate,
    parseOptions:parseOptions
  }

})();
