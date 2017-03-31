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
   var domDivList={
     default:'    <div class="cuview1-div clearfix">'+

             '    </div>'
             ,

     cuview1:'    <div class="cuview2-div clearfix">'+

                     '    </div>'
   };

   //根据 cuviewDivName获得容器结构
   CuView.getdomDiv=function(domDivName){
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
     var options=$.extend(CuView.getOptions(),$tag.data("options"));
     var $dom=$(CuView.getdomDiv(options["domDiv"]));
     $tag.after($dom);
     //处理公共部位的宏命令
     Macro.macroCommand($tag,$dom,options);
     //处理列合并的函数
     CuView.prototype.colspan($tag,$dom,options);
     //移除自定义标签
     $tag.remove();
     return $dom;

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
