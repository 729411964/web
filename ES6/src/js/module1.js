// node端运行ES6模块，也需要通过转换为ES5运行
import * as module2 from "./module2.js"
console.log(module2.c());
console.log("模块一装载");
export var a =3 ;