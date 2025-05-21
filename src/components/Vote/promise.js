class SimplePromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.successCallbacks = [];
    this.failureCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.successCallbacks.forEach(callback => callback(this.value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.failureCallbacks.forEach(callback => callback(this.value));
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onSuccess, onFail) {
    if (this.state === 'fulfilled') {
      onSuccess(this.value);
    } else if (this.state === 'rejected') {
      onFail(this.value);
    } else {
      this.successCallbacks.push(onSuccess);
      this.failureCallbacks.push(onFail);
    }
    
    // Note: This simple version doesn't support chaining
    return this;
  }

  catch(onFail) {
    return this.then(null, onFail);
  }
}

const promise = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise.then(
  result => console.log(result), // "Success!"
  error => console.error(error)
);