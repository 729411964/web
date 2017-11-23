/**
 *
 * ES5 只有全局作用域和函数作用域 ES6中出现了块级作用域 let 与 const
 */


// 块级作用域

{
    let a = 10;
    var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
