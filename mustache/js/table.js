
/*!
 * cutable 1.0.0
 * author： niulei
 * Time: 2017.3.16
 */

$(function(){

  Cutable.prototype.initTable(); //执行初始化方法


})
var Cutable=function(){}

//表格的配置
Cutable.tableOptions={
  id:"default",
  pagination:true,
  pageSize:10,
  idField:false

};

//表格的模板配置，key值为表格的tableId
(function($){
  //表格模板列表
  var templateList={};
  //将模板推入列表的函数
  Cutable.setTemplate=function(tableId,template){
    if(typeof template ==="string" &&template){
      templateList[tableId]=template;
    }else{
      console.error("表格数据模板出错");
    }
  }
  //根据 tableId获得模板
  Cutable.getTemplate=function(tableId){
    if(tableId &&typeof tableId ==="string"){
      return templateList[tableId];
    }else{
        console.error("获取表格模板时，表格Id有误");
    }
  }

})(jQuery);

//保存表格结构的列表
(function($){
  //表格结构列表
  var tableDivList={};

  //根据 tableDivName获得表格结构
  Cutable.getTableDiv=function(tableDivName){
    if(tableDivName &&typeof tableDivName ==="string"){
      return tableDivList[tableDivName];
    }else{
        console.error("获取表格结构时，有误");
    }
  }

})(jQuery);

//  初始化表格配置，生成表格tableId，推入模板，并删除掉自定义标签
Cutable.prototype.initTable = function () {
  $("cutable").each(function(index,item){
    var $table=$(this);
    var options=$table.data("options");
    console.log(options);

    //清除自定义标签
    $table.remove();

  });

};
//通过配置表头生成模板
Cutable.prototype.initTemplate=function(tableId){

}
//生成表头
Cutable.prototype.initHeader=function(tableId){

}
//刷新表格
Cutable.prototype.refreshTable=function(tableId){

}
//提示语
Cutable.prototype.getTips=function(tableId){

}
