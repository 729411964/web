
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
  var tableDivList={
    table1:'    <div class="table1-div" >'+
             '      <div class="table-title">查询结果</div>'+
             '      <div class="operation-div"></div>'+
             '      <table class="table1" tableId="wing"><thead></thead><tbody></tbody></table>'+
            '    </div>'
            ,

    table2:'    <div class="table2-div">'+
                     '      <div class="table-title">查询结果2</div>'+
                     '      <div class="operation-div"></div>'+
                     '      <table class="table1" tableId="wing"><thead></thead><tbody></tbody></table>'+
                    '    </div>'
  };

  //根据 tableDivName获得表格结构
  Cutable.getTableDiv=function(tableDivName){
    if(tableDivName &&typeof tableDivName ==="string"){ //此处校验可以写为公共方法
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
    var tableDiv=Cutable.getTableDiv(options["tableDiv"]);
    tableDiv=tableDiv.replace("wing",options.tableId);
    //将加载出来的模板插入页面中
    $table.after(tableDiv);
    //清除自定义标签
    $table.remove();
    //初始化表头
    Cutable.prototype.initHeader(options.tableId,options.columns);
    //初始化渲染数据的模板
    Cutable.prototype.initTemplate(options.tableId,options.columns);
    //监听事件，加载表格
    // Event.listen("xxx",function(){
    //   Cutable.prototype.refreshTable(tableId);
    // })
  });

};
//通过配置生成模板
Cutable.prototype.initTemplate=function(tableId,columns){

}
//生成表头
Cutable.prototype.initHeader=function(tableId,columns){
  var $table=$("table[tableid='"+tableId+"']");
  var s=Mustache.render("<tr>{{#.}}<th field='{{field}}'>{{title}}</th>{{/.}}</tr>",columns);
  $table.find("thead").html(s);

}
//刷新表格
Cutable.prototype.refreshTable=function(tableId){

}
//提示语
Cutable.prototype.getTips=function(tableId){

}
//为表格添加按钮
Cutable.prototype.addButton=function(tableId,fn){

}
