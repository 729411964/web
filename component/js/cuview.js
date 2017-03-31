/*!
 * cuview 1.0.0
 * author： niulei
 * Time: 2017.3.22
 * description:  容器组件，可提供网格化的功能
 */

 var CuView=function(){};

//注册cuview组件
 ParsingHelper.registerComponent("cuview",CuView);

 //保存容器结构的列表
 (function($){
   //容器结构列表
   var cuviewDivList={
     default:'    <div class="cuview1-div clearfix">'+

             '    </div>'
             ,

     cuview1:'    <div class="cuview2-div clearfix">'+

                     '    </div>'
   };

   //根据 cuviewDivName获得容器结构
   CuView.getCuviewDiv=function(cuViewDivName){
     if(cuViewDivName &&typeof cuViewDivName ==="string"){ //此处校验可以写为公共方法
       var componentDiv=cuviewDivList[cuViewDivName];
       if(componentDiv){
         return componentDiv;
       }else{
         console.error("未找到"+cuViewDivName+"组件结构，使用了默认结构");
         return cuviewDivList["default"];
       }
       return
     }else{
         return cuviewDivList["default"];
     }
   }

 })(jQuery);
 (function(){
   var options={
     domDiv:"default",
     id:"cuview"

   };
   CuView.getOptions=function(){
     return $.extend({},options);
   }
 })()
 CuView.prototype.initTag=function($tag){
     var $cuview=$tag;
     var options=$.extend(CuView.getOptions(),$cuview.data("options"));
     var $cuviewDiv=$(CuView.getCuviewDiv(options["domDiv"]));
     $cuview.after($cuviewDiv);
     //处理公共部位的宏命令
     Macro.macroCommand($cuview,$cuviewDiv,options);
     //处理列合并的函数
     CuView.prototype.colspan($cuview,$cuviewDiv,options);
     //移除自定义标签
     $cuview.remove();

 }
 CuView.prototype.colspan=function($cuview,$cuviewDiv,options){
   var column=1/options["column"]*100;
   var children=$cuview.children();
   children.each(function(){
     var tagName=$(this)[0].tagName;
     var colspan=$(this).attr("colspan");
     if(!colspan){
       colspan=1;
     }
    $(this).appendTo($cuviewDiv).wrap("<div class='content-item' style='width:"+column*colspan+"%'></div>");

   })
 }
