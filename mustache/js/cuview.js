/*!
 * cuview 1.0.0
 * author： niulei
 * Time: 2017.3.22
 * description:  容器组件，可提供网格化的功能
 */

 $(function(){
    CuView.prototype.initCuView();
 })

 var CuView=function(){};

 //保存容器结构的列表
 (function($){
   //容器结构列表
   var cuviewDivList={
     cuview1:'    <div class="cuview1-div" component="wing">'+
              '      <div class="cuview-title">容器一</div>'+
              '      <div class="content-div clearfix"></div>'+
              '      <div class="btn-div clearfix"></div>'+
             '    </div>'
             ,

     cuview2:'    <div class="cuview2-div" component="wing">'+
                      '      <div class="cuview-title">容器二</div>'+
                      '      <div class="btn-div clearfix"></div>'+
                      '      <div class="content-div clearfix"></div>'+
                     '    </div>'
   };

   //根据 cuviewDivName获得容器结构
   CuView.getCuviewDiv=function(cuViewDivName){
     if(cuViewDivName &&typeof cuViewDivName ==="string"){ //此处校验可以写为公共方法
       return cuviewDivList[cuViewDivName];
     }else{
         console.error("获取容器结构时，有误");
         return cuviewDivList["cuview1"];
     }
   }

 })(jQuery);
 CuView.prototype.initCuView=function(){
   $("cuview").each(function(){
     var $cuview=$(this);
     var options=$cuview.data("options");
     var $cuviewDiv=$(CuView.getCuviewDiv(options["cuviewDiv"]));
     var column=1/options["column"]*100;
     $(this).after($cuviewDiv);
     var children=$(this).children();
     children.each(function(){
       var tagName=$(this)[0].tagName;
       var colspan=$(this).attr("colspan");
       if(!colspan){
         colspan=1;
       }

       if(tagName.toLowerCase()=="cubtn"){
         $(this).appendTo($cuviewDiv.find(".btn-div")).wrap("<div class='btn-item'></div>");

       }else{
         $(this).appendTo($cuviewDiv.find(".content-div")).wrap("<div class='content-item' style='width:"+column*colspan+"%'></div>");
       }
     })
     $(this).remove();
   })
 }
