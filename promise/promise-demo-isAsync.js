function asyncFunction() {
    return new Promise(function (resolve, reject) {
           while(true){
               console.log("异步函数执行中");

           }

        resolve("hello world");
    });
}
asyncFunction().then(function (value) {
    console.log(value)
}).catch(function (error) {
    console.log(error);
});
console.log("4545");
/**
 * node端-输出结果
 * 一直在输出 "异步函数执行中"  而未输出4545  这是在浏览器端测试的结果 证明promise里的函数逻辑还是在走主线程，跟settimeout类似。
 *
 * 浏览器端 输出结果与node端一致
 * */