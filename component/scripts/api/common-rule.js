/*
 * ValidateRules 1.0.0
 * author： niulei
 * Time: 2017.4.14
 * description:  将校验列表抽出 便于维护
 */

 var ValidateRules = (function () {
   //拥有校验的元素
   var tagNameList = ["input" ,"textarea"];
   // 校验时的事件类型
   var eventName = "keyup focus";
   // 固化的 校验正则表达式
   var regExpList = {
       //正则表达式列表
       number: "^[0-9]*$",
       lowerLetter: "^[a-z]*$"
   };
   //固化的校验规则校验函数 $dom为具体的校验元素 ， regTip 为校验提示
   var checkList = {
       //必输项校验
       required: function ($dom, regTip) {
           //是否为必输项
           var str = $.trim($dom.val());
           var result=true;
           var regTip= regTip === "default" ? "必输项" : regTip;
           if (!str) {
             result=false;
           }
           return [result , regTip];
       },
       //正整数校验
       init: function ($dom, regTip) {
           var str = $.trim($dom.val());
           var regTip= regTip === "default" ? "请输入正整数" : regTip;
           var regExp = new RegExp("^[0-9]*$");
           var result = regExp.test(str);
           return [result , regTip];

       },
       //邮箱校验
       mail: function () {

       }
   };

   //获得规则校验函数。
   var getCheckHandler = function(hanlderName) {
     return checkList[hanlderName] || false ;
   };

   //获得校验规则表达式
   var getCheckRegExp = function(regExpName) {
     return regExpList[regExpName] || false ;
   };

   // 获得可校验的元素
   var getTagName = function() {
     return tagNameList || [] ;
   };

   // 获得校验的事件类型
   var getEventName = function() {
      return eventName || false ;
   };

   //增加校验函数
   var addCheckHandler = function(handlerName, handler) {
     if(handler && typeof handler === "string") {
       checkList[handlerName] = handler;
     }
   }

   //增加校验正则表达式
   var addCheckRegExp = function(regExpName, regExp) {
     if(regExp && typeof regExp === "string") {
       regExpList[regExpName] = regExp;
     }
   }

   return {
     addCheckRegExp:addCheckRegExp,
     addCheckHandler:addCheckHandler,
     getEventName:getEventName,
     getTagName:getTagName,
     getCheckRegExp:getCheckRegExp,
     getCheckHandler:getCheckHandler

   }


 })();
