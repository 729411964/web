//Node 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。安装 Node v8.5.0 或以上版本，要用--experimental-modules参数才能打开该功能。
//node --experimental-modules src/js/module1.mjs

import * as module2 from "./module2.mjs"
console.log(module2.c());