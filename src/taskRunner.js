/* 
  Question: Create a task runner which run a number of task as a given time; we can pass the limit while initialize  
  Company: AngelOne (Round 2)
*/
class TaskRunner {
  #limit;
  #taskQueue = [];
  #taskCount = 0;
  #taskList = []; // if we want to track total task

  constructor(limit) {
    this.#limit = limit;
  }

  #runTask() {
    if (this.#taskQueue.length === 0) {
      console.log(`No tasks left in the queue. ${this.#taskCount} running. Nothing will run next.`)
      console.log(this.#taskList);
      return;
    }
    if (this.#taskCount >= this.#limit) {
      console.log(`Reached limit of running tasks ${this.#limit}. No new task will run until one finishes.`)
      return;
    }

    const {task, id} = this.#taskQueue.shift();
    this.#taskCount++;

    task(id).then((res)=>{
      console.log(res);
    }
    ).finally(()=>{
      this.#taskCount--;
      this.#taskList.push( {task , id, isCompleted: true});
      this.#runTask();
    }
    )
  }

  run(fn, id) {
    this.#taskQueue.push({ task: fn,id: id});
    this.#runTask();
  }
}

const taskRunner = new TaskRunner(3);

const task = (arg)=>{
  //1-4 seconds delay
  const randomDelay = Math.floor(Math.random() * 3000) + 1000;
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log("Task Completed!", arg);
      resolve(true);
    }
    , randomDelay)
  }
  )
}
;

taskRunner.run(task, 'id-1');
taskRunner.run(task, 'id-2');
taskRunner.run(task, 'id-3');
taskRunner.run(task, 'id-4');
taskRunner.run(task, 'id-5');
taskRunner.run(task, 'id-6');
taskRunner.run(task, 'id-7');
