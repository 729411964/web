var a = 23;
let b = 34;
var c = function () {
    console.log(b);
};
console.log("模块二装载");
export {a,c}