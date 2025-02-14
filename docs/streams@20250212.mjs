/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as ES2024 from "./ES2024@20250212.mjs";

// Implements the async iterable interface
// Produces data independent of consumption, therefore a push source
export class Source extends ES2024.AsyncIterator {
  #info;
  constructor(init) {
    super();
    let _resolve = null;
    let _reject = null;
    this.#info = {};
    const waitForInput = () => {
      this.#info.waiting = new ES2024.Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      });
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
      this.#info.waiting.then(resolve, reject);
    });
  }
}
export const __Source__ = Source.prototype;
Object.defineProperty(__Source__, ES2024.Symbol.toStringTag, {
  value: "Source",
  writable: false,
  enumerable: false,
  configurable: false,
});

function createSourceFromEvent(target, eventName) {
  let _next;
  let _complete;
  let _error;
  const source = new Source(( next, complete, error ) => {
    target.addEventListener(eventName, next);
    _next = next;
    _complete = complete;
    _error = error;
  });
  const complete = (value) => {
    target.removeEventListener(eventName, _next);
    _complete(value);
  };
  const error = (reason) => {
    target.removeEventListener(eventName, _next);
    _error(reason);
  };
  return {
    source,
    complete,
    error,
  };
}

// input must be async iterator
// settles when the input ends
export class Stream extends ES2024.Promise {
  #canceled;
  constructor(iterator, handler) {
    super((resolve, reject) => {
      (async () => {
        let { value, done } = await iterator.next();
        while (!done && !this.#canceled) {
          handler(value);
          ({ value, done } = await iterator.next());
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

// enqueue is initiated by the input
// input must be async iterable
export class Outlet extends Iterator {
  constructor(input) {
    const contents = [];
    let newInput = () => {};
    const reader = new Sink((value) => {
      if (value !== undefined) {
        contents.push(value);
        newInput();
      }
    });
    const reading = reader.stream(input);
 //    const ret = await reading;
    return {
      dequeue() {
        return contents.shift();
      },
      backlog() {
        return contents.length;
      },
      cancel: reading.cancel,
    };
  }
  #dequeue() {
    
  }
  *[ES2024.Symbol.iterator]() {
    while (!done) {
      yield contents.shift();
    }
  }
  async *[ES2024.Symbol.asyncIterator]() {
    while (!done) {
      if (contents.length === 0) {
        await new ES2024.Promise((resolve) => { newInput = resolve });
      }
      yield contents.shift();
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
