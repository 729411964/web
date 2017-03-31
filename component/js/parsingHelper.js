/*!
 * parsingHelper 1.0.0
 * author： niulei
 * Time: 2017.3.23
 * description:  公共组件，解析模板
 */
 var ParsingHelper=function(){};

//立即执行函数，用来保存注册的组件
 (function(){
   // 缓存已注册的组件
   var componentList={};
   ParsingHelper.registerComponent=function(componentName,fn){
     var fdStart = componentName?componentName.indexOf("cu"):"-1";
     if(fdStart == 0){
       //若是以cu开头，则通过
       if(typeof fn ==="function"){
         componentList[componentName]=fn;
       }
     }else{
       //若不是以cu开头，则不通过
       console.error("解析模块注册"+componentName+"组件时出错");
       return false;
     }

   }
   ParsingHelper.getTag=function(){
     var tagArray=[];
     for(var i in componentList){
       if(componentList.hasOwnProperty(i)){
         tagArray.push(i);
       }
     }
     return tagArray;
   }
   ParsingHelper.initTag=function(tagName,$tag){
     if(tagName && typeof tagName==="string"){
       tagName=tagName.toLowerCase();
       componentList[tagName]["prototype"]["initTag"]($tag);
     }
   }
 })()

 $(function(){
   var tagArray=ParsingHelper.getTag();
   var tagNames=tagArray.join(",");
   var $tag=$(tagNames);
   $tag.each(function(){
     //解析具体的组件
     ParsingHelper.initTag($(this)[0].tagName,$(this));
   })
 })
