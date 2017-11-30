let pageData = {};

//Fn 对外抛出 函数log
var log = function (a) {
    inlog(a);
};
//fn 内部函数
let inlog = function (a) {
    console.log(Array.from(a));
    console.log("foobar".includes(a));
};
//Fn 对外抛出 函数log2
var log2 = function (b) {
    inlog("log2:"+b);
};

export default {
    log1:log,
    log2:log2
};