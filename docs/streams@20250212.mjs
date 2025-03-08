/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as ES2024 from "./ES2024@20250212.mjs";

export function createPromiseCapability() {
  const ret = {};
  ret.promise = new ES2024.Promise(( resolve, reject ) => {
    ret.resolve = resolve;
    ret.reject = reject;
  });
  return ret;
}

function createQueue() {
  let contents = [];
  return {
    enqueue: ( value ) => {
      if (value !== undefined) {
        contents.push();
      }
    },
    dequeue: () => {
      return contents.shift();
    },
    get backlog() { return contents.length },
  };
}

// Implements the async iterable interface
// Produces data independent of consumption, therefore a push source
export class Source extends ES2024.AsyncIterator {
  #info;
  constructor(init) {
    super();
    this.#info = {};
    const waitForInput = () => {
      Object.assign(this.#info, createPromiseCapability());
    }
    waitForInput();
    const next = (value) => {
      _resolve({
        value,
        done: false,
      });
      waitForInput();
    };
    const complete = (value) => {
      _resolve({
        value,
        done: true,
      });
      waitForInput();
    };
    const error = (reason) => {
      _reject(reason);
      waitForInput();
    };
    init(next, complete, error);
  }
  // This function may be called more than once, allowing for multiple consumers
  // Client code may stop consuming (calling next()) at any time, so values are not stored up after the last promise returned from next() is settled.
  // Client code that is still consuming is responsible for calling next() as soon as possible after the last return value has settled.
  // Calling next() multiple times between values creates multiple promises that all settle simultaneously.
  next() {
    return new Promise((resolve, reject) => {
      this.#info.promise.then(resolve, reject);
    });
  }
  stream(sinkFunction) {
    return new Stream(this, sinkFunction);
  }
  *pipe() {
    let done = false;
    let retVal;
    let error;
    const queue = createQueue();
    const reader = this.stream((value) => {
      if (value !== undefined) {
        queue.enqueue(value);
      }
    });
    reader.then((value) => {
      done = true;
      retVal = value;
    }, (reason) => {
      done = true;
      error = reason;
    });
    while (!done) {
      yield queue.dequeue();
    }
    if (error === undefined) {
      return retVal;
    } else {
      throw error;
    }
  }
  async *asyncPipe() {
    let done = false;
    let retVal;
    let error;
    let nextInput;
    const queue = createQueue();
    const reader = this.stream((value) => {
      if (value !== undefined) {
        queue.enqueue(value);
        nextInput.resolve();
        nextInput = createPromiseCapability();
      }
    });
    reader.then((value) => {
      done = true;
      retVal = value;
    }, (reason) => {
      done = true;
      error = reason;
    });
    while (!done) {
      yield await dequeue();
    }
    if (error === undefined) {
      return retVal;
    } else {
      throw error;
    }
    async function dequeue() {
      if (queue.backlog === 0) {
        await nextInput.promise;
      }
      return queue.dequeue();
    }
  }
}
export const __Source__ = Source.prototype;
Object.defineProperty(__Source__, ES2024.Symbol.toStringTag, {
  value: "Source",
  writable: false,
  enumerable: false,
  configurable: false,
});

export function createSourceCapability() {
  const ret = {};
  ret.source = new Source(( next, complete, error ) => {
    ret.next = next;
    ret.complete = complete;
    ret.error = error;
  });
  return ret;
}

export function createSourceFromEvent(target, eventName) {
  const controlledSource = createSourceCapability();
  target.addEventListener(eventName, controlledSource.next);
  return {
    source: controlledSource.source,
    complete: (value) => {
      target.removeEventListener(eventName, controlledSource.next);
      controlledSource.complete(value);
    },
    error: (reason) => {
      target.removeEventListener(eventName, controlledSource.next);
      controlledSource.error(reason);
    },
  };
}

// input must be async iterator
// settles when the input ends
export class Stream extends ES2024.Promise {
  #canceled;
  constructor(source, sinkFunction) {
    super((resolve, reject) => {
      (async () => {
        let { value, done } = await source.next();
        while (!done && !this.#canceled) {
          sinkFunction(value);
          ({ value, done } = await source.next());
        }
        if (canceled) {
          throw new Error("Stream was canceled.");
        }
        return value;
        /*
        Similar to the following, except it returns the final value:
        for await (const value of input) {
          handler(value);
        }
        */
      })().then(resolve, reject);
    });
    this.#canceled = false;
  }
  cancel() {
    canceled = true;
  }
};
export const __Stream__ = Stream.prototype;
Object.defineProperty(__Stream__, "constructor", {
  value: __Stream__.constructor,
  writable: false,
  enumerable: false,
  configurable: false,
});
Object.defineProperty(__Stream__, ES2024.Symbol.toStringTag, {
  value: "Stream",
  writable: false,
  enumerable: false,
  configurable: false,
});

// getter is an async iterator that provides input objects
// It takes 0 arguments and returns the next input object
async function * transform(getter) {
  yield await getter.next();
}
//transform(getter);

export class Transform extends Source {
  #contents;
  #reading;
  constructor(input, transformFunction) {
    const output = transformFunction(dequeuer);
    super(( next, complete, error ) => {
      this.trigger = listener( output, next, complete, error );
    });
    this.#contents = [];
    let newInput = () => {};
    const enqueue = (value) => {
      if (value !== undefined) {
        contents.push(value);
        newInput();
      }
    };
    const reader = new Sink(enqueue);
    this.#reading = reader.stream(input);
    const dequeuer = (async function * () {
      while (!done) {
        if (contents.length === 0) {
          await new ES2024.Promise((resolve) => { newInput = resolve });
        }
        yield contents.shift();
      }
    })();
    this.output = new Source();
  }
  backlog() {
    return this.#contents.length;
  },
  cancel() {
    this.#reading.cancel();
  };
}

function listener( asyncIterator, next, complete, error ) {
  return async () => {
    try {
      const { value, done } = await asyncIterator.next();
      if (done) {
        complete(value);
      } else {
        next(value);
      }
    } catch (reason) {
      error(reason);
    }
  }
}

// A Generator is returned from a GeneratorFunction
// A Generator is an Iterator
export function createStreamFromIterator(iterator, triggerStream) {
  return new Stream(({ next, complete, error }) => {
    (function wait() {
      const waiting = triggerStream.next();
      waiting.then(({ done: triggerDone }) => {
        try {
          const { value, done } = iterator.next();
          if (triggerDone || done) {
            complete(value);
          } else {
            next(value);
          }
          wait();
        } catch (reason) {
          error(reason);
        }
      }, (reason) => {
        error(reason);
      });
    })();
  });
}
// An AsyncGenerator is returned from a AsyncGeneratorFunction
export function createStreamFromAsyncGenerator(asyncGenerator) {
  return new Stream(({ next, complete, error }) => {
    (function wait() {
      const waiting = asyncGenerator.next();
      waiting.then(({ value, done }) => {
        if (done) {
          complete(value);
        } else {
          next(value);
        }
        wait();
      }, (reason) => {
        error(reason);
      });
    })();
  });
}

// An active sink requires data immediately when requested, therefore a queue is always required for an active sink, making it a passive sink
// Therefore, all sources are active sources. Passive sources are made active by trigger sources.
// Transforms have a queue on the input side

function transformNode(transform, triggerSource) {
  const output = new Stream(({ next, complete, error }) => {
    const reading = sink(input, (value) => {
      next(value);
    });
    reading.then((value) => {
      complete(value);
    });
  });
}
