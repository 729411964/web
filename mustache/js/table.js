
/*!
 * cutable 1.0.0
 * author： niulei
 * Time: 2017.3.16
 */

$(function(){

  Cutable.prototype.initTable(); //执行初始化方法



})
var Cutable=function(){}

//注册cutable组件
ParsingHelper.registerComponent("cutable",Cutable);

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
Cutable.prototype.initTag = function ($tag) {

    var $table=$tag;
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
    Cutable.prototype.refreshTable(options.tableId);


};
//通过配置生成模板
Cutable.prototype.initTemplate=function(tableId,columns){
  var $table=$("table[tableid='"+tableId+"']");
  TemplateHelper.parseOptions("initTable",tableId,columns,"");

}
//生成表头
Cutable.prototype.initHeader=function(tableId,columns){
  var $table=$("table[tableid='"+tableId+"']");
  var tableHeadId=tableId+"header";
  var html="";
  TemplateHelper.parseOptions("initHeader",tableHeadId,columns,"");
  html=TemplateHelper.render(tableHeadId,columns);
  $table.find("thead").html(html);

}
//刷新表格
Cutable.prototype.refreshTable=function(tableId){
  var sd={
    rows:[
      {deviceNumber:"12345",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654",operStaffNo:"73f",operTime:"grfe",remark:"beizhu"},
      {deviceNumber:"12323245",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654",operStaffNo:"73f",operTime:"grfe",remark:"beizhu"},
      {deviceNumber:"1233445",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654",operStaffNo:"73f",operTime:"grfe",remark:"beizhu"},
      {deviceNumber:"1233445",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654",operStaffNo:"73f",operTime:"grfe",remark:"beizhu"},
      {deviceNumber:"12354545",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654",operStaffNo:"73f",operTime:"grfe",remark:"beizhu"},
      {deviceNumber:"123566545",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654",operStaffNo:"73f",operTime:"grfe",remark:"beizhu"}

    ]
  }
  var fd={
    rows:[
      {deviceNumber:"5656",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654"},
      {deviceNumber:"23435",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654"},
      {deviceNumber:"65768",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654"},
      {deviceNumber:"09090",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654"},
      {deviceNumber:"12334",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654"},
      {deviceNumber:"67564",storeName:"we",poolName:"chi",operType:"asd",batchNo:"654"}

    ]
  }
  if(tableId=="3434"){
    var $table=$("table[tableid='"+tableId+"']");
    var html="";
    html=TemplateHelper.render(tableId,sd);
    $table.find("tbody").html(html);

  }else{
    var $table=$("table[tableid='"+tableId+"']");
    var html="";
    html=TemplateHelper.render(tableId,fd);
    $table.find("tbody").html(html);

  }
}
//提示语
Cutable.prototype.getTips=function(tableId){

}
//为表格添加按钮
Cutable.prototype.addButton=function(tableId,fn){

}
