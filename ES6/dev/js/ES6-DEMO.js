"use strict";

//因为ES6 let 块级作用域的原因，可以不需要使用立即执行函数来创建私有作用域，且使用babel转换时，也做了处理
{
    var a = 34;
    var c = function c() {
        console.log(a);
    };
}
{
    var _a = 45;
    var b = function b() {
        console.log(_a);
    };
}