//因为ES6 let 块级作用域的原因，可以不需要使用立即执行函数来创建私有作用域，且使用babel转换时，也做了处理
{
    let a = 34;
    var c = function () {
        console.log(a);
    }
}
{
    let a = 45;
    var b = function () {
        console.log(a);
    }
}
