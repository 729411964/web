/*!
 * cuvbtn 1.0.0
 * author： niulei
 * Time: 2017.3.27
 * description: 按钮组件，用来发布事件或订阅事件。
 */

var Cubtn=function(){};

//注册Cubtn组件
 ParsingHelper.registerComponent("cubtn",Cubtn);

 //保存容cubtn组件结构的列表
 (function(){
   //cubtn组件结构列表
   var domDivList={
     default:'    <div class="cubtn-div">'+
              '      <button class="cubtn" hasBind="true"></button>'+
             '    </div>'
             ,

     cubtn1:'    <div class="cubtn1-div">'+
              '      <button class="cubtn" hasBind="true"></button>'+
             '    </div>'
             ,

     cubtn2:'    <div class="cubtn2-div">'+
                      '      <button class="cubtn" hasBind="true"></button>'+
                     '    </div>'
   };

   //根据 cubtnDivName获得容器结构
   Cubtn.getDomDiv=function(domDivName){
     if(domDivName &&typeof domDivName ==="string"){ //此处校验可以写为公共方法
       var componentDiv=domDivList[domDivName];
       if(componentDiv){
         return componentDiv;
       }else{
         console.error("未找到"+domDivName+"组件结构，使用了默认结构");
         return domDivList["default"];
       }
       return
     }else{
         return domDivList["default"];
     }
   }

 })();
(function(){
  var options={
    domDiv:"default",
    id:"cubtn"

  };
  Cubtn.getOptions=function(){
    return $.extend({},options);
  }
})()
 Cubtn.prototype.initTag=function($tag){
   var $cubtn=$tag;
   //获得具体的配置项
   var options=$.extend(Cubtn.getOptions(),$tag.data("options"));
   var $dom=$(Cubtn.getDomDiv(options["domDiv"]));
   $dom.find(".cubtn").text($tag.text());
   $tag.after($dom);
   //处理公共部位的宏命令
   Macro.macroCommand($tag,$dom,options);
   $tag.remove();

 }
