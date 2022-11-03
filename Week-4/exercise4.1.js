const STATE = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED',
}

function getNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function isThenable(val) {
    return val instanceof MyPromise;
}

class MyPromise {
    constructor(callback) {
        // Initial state of Promise
        this.state = STATE.PENDING;
        this.value = undefined;
        this.handlers = [];
        try {
            callback(this._resolve, this._reject);
        } catch (err) {
            this._reject(err)
        }
    }

    _resolve = (value) => {
        this.updateResult(value, STATE.FULFILLED);
    }
      
    _reject = (error) => {
        this.updateResult(error, STATE.REJECTED);
    }

    updateResult(value, state) {
        setTimeout(() => {
            // process the promise if it is still in pending state
            if (this.state !== STATE.PENDING) {
              return;
            }
          
            // check is value is also a promise
            if (isThenable(value)) {
              return value.then(this._resolve, this._reject);
            }
            
            this.value = value;
            this.state = state;
            
            // execute handlers if already attached
            this.executeHandlers();
        }, 0);
    }

    addHandlers(handlers) {
        this.handlers.push(handlers);
        this.executeHandlers();
    }

    executeHandlers() {
        // Don't execute handlers if promise is not yet fulfilled or rejected
        if (this.state === STATE.PENDING) {
            return null;
        }
        
        // We have multiple handlers because add them for .finally block too
        this.handlers.forEach((handler) => {
            if (this.state === STATE.FULFILLED) {
                return handler.onSuccess(this.value);
            } 
            return handler.onFail(this.value);
        });
        // After processing all handlers, we reset it to empty.
        this.handlers = [];
    }

    then(onSuccess, onFail) {
        return new MyPromise((res, rej) => {
            this.addHandlers({
                onSuccess: function(value) {
                    // if no onSuccess provided, resolve the value for the next promise chain
                    if (!onSuccess) {
                        return res(value);
                    }
                    try {
                        return res(onSuccess(value))
                    } catch(err) {
                        return rej(err);
                    }
                },
                onFail: function(value) {
                    // if no onFail provided, reject the value for the next promise chain
                    if (!onFail) {
                        return rej(value);
                    }
                    try {
                        return res(onFail(value))
                    } catch(err) {
                        return rej(err);
                    }
                }
            });
        });
    }
    
    catch(onFail) {
        return this.then(null, onFail);
    }
    
    finally(callback) {
        return callback();
    }
}

const nCheck = new MyPromise((res, rej) => {
    let n = getNumber();
    setTimeout(() => {
        if (n % 5 === 0)
            rej(n + ' is divisible by 5!!!');
        else
            res(n + ' is not divisible by 5');
    }, 0);
});

nCheck
    .then((val) => {console.log(val)})
    .catch((err) => {console.log(err)})
    .finally((cb) => {console.log('Check Completed')});