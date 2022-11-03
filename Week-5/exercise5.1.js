const doTask1 = () => new Promise(function(resolve, reject){
    let taskCompleted = false;
    // Some task here
    taskCompleted = true;
    (taskCompleted) ? resolve('Task 1 completed') : reject(new Error('Task 1 failed'));
});

const doTask2 = () => new Promise(function(resolve, reject){
    let taskCompleted = false;
    // Some task here
    taskCompleted = true;
    (taskCompleted) ? resolve('Task 2 completed') : reject(new Error('Task 2 failed'));
});

const doTask3 = () => new Promise(function(resolve, reject){
    let taskCompleted = false;
    // Some task here
    taskCompleted = true;
    (taskCompleted) ? resolve('Task 3 completed') : reject(new Error('Task 3 failed'));
});
// async function
async function asyncFunc() {
    let task1 = await doTask1();
    console.log(task1);
    let task2 = await doTask2();
    console.log(task2);
    let task3 = await doTask3();
    console.log(task3);
}

asyncFunc();

async function* genFunc() {
    yield await doTask1().then((x) => console.log(x));
    yield await doTask2().then((x) => console.log(x));
    yield await doTask3().then((x) => console.log(x));
    return;
}

let gen = genFunc();

gen.next();
gen.next();
gen.next();