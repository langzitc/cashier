import task from 'node-schedule'
let date = new Date("2017-10-20 00:23:30");
let j = task.scheduleJob(date, function(){
　　　　console.log("执行任务");
});
