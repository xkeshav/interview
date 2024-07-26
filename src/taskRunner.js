function TaskRunner(l) {
    const limit = l;
    const taskQueue = {};
    const runningTask = 0;
    const currentRunningTaskList = [];

    function run(fn, id) {
      currentRunningTaskList.push({[id]: fn});
      if(currentRunningTaskList.length > limit) {
        console.log('wait');
      } else {
        runningTask++;
        (async (args)=>{
          const done = await fn(args);
          done.then(()=>{
            const idx = currentRunningTaskList.findIndex( task => task === id );
            currentRunningTaskList.splice(0, idx);
            currentRunningTaskList.push(fn);
            run(fn.id)
          })
        });
      }
    }
}

const taskRunner = new TaskRunner(3);

const task = (arg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task Completed!!!", arg);
      resolve(true);
    }, 2000)
  })
};

taskRunner.run(task, 'id-1');
taskRunner.run(task, 'id-2');
taskRunner.run(task, 'id-3');
taskRunner.run(task, 'id-4');
taskRunner.run(task, 'id-5');
taskRunner.run(task, 'id-6');
taskRunner.run(task, 'id-7');