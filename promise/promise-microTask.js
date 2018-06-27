// 添加三个 Task
// Task 1
setTimeout(function() {
    console.log(4);
}, 0);

// Task 2
setTimeout(function() {
    console.log(6);
    // 添加 microTask
    promise.then(function() {
        console.log(8);
    });
}, 0);

// Task 3
setTimeout(function() {
    console.log(7);
}, 0);

var promise = new Promise(function executor(resolve) {
    console.log(1);
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(2);
}).then(function() {
    console.log(5);
});

console.log(3);


//输出结果为：1 2 3 5 4 6 8 7  因为promise属于 microTask  setTimeOut属于 macroTask

