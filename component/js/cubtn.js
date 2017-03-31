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
   var cubtnDivList={
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
   Cubtn.getCubtnDiv=function(cubtnDivName){
     if(cubtnDivName &&typeof cubtnDivName ==="string"){ //此处校验可以写为公共方法
       var componentDiv=cubtnDivList[cubtnDivName];
       if(componentDiv){
         return componentDiv;
       }else{
         console.error("未找到"+cubtnDivName+"组件结构，使用了默认结构");
         return cubtnDivList["default"];
       }
       return
     }else{
         return cubtnDivList["default"];
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
   var options=$.extend(Cubtn.getOptions(),$cubtn.data("options"));
   var $cubtnDiv=$(Cubtn.getCubtnDiv(options["domDiv"]));
   $cubtnDiv.find(".cubtn").text($cubtn.text());
   $cubtn.after($cubtnDiv);
   //处理公共部位的宏命令
   Macro.macroCommand($cubtn,$cubtnDiv,options);
   $cubtn.remove();

 }
