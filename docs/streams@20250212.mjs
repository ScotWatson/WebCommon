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
    const capabilities = {
      next(value) {
        _resolve({
          value,
          done: false,
        });
        waitForInput();
      },
      complete(value) {
        _resolve({
          value,
          done: false,
        });
        waitForInput();
      },
      error(reason) {
        _reject(reason);
        waitForInput();
      },
    };
    init(capabilities);
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
  const ret = new Source(({ next, complete, error }) => {
    target.addEventListener(eventName, next);
    _next = next;
    _complete = complete;
    _error = error;
  });
  const stop = (value) => {
    target.removeEventListener(eventName, _next);
    _complete(value);
  };
  const error = (reason) => {
    target.removeEventListener(eventName, _next);
    _error(reason);
  };
  return {
    ret,
    stop,
    error,
  };
}

// input must be async iterator
// settles when the input ends
class Stream extends ES2024.Promise {
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
export class Sink {
  #handler;
  // handler may be either sync or async function, but return value is ignored and not awaited.
  constructor(handler) {
    this.#handler = handler;
    Object.defineProperty(this, "streamPrototype", {
      value: Object.create(__Stream__),
      writable: true,
      enumerable: false,
      configurable: false,
    });
  }
  // The return value inherits from Promise, therefore it can be treated like a promise.
  stream(input) {
    const ret = new Stream(input, this.#handler);
    Object.setPrototypeOf(ret, this.streamPrototype);
    return ret;
  }
}
export const __Sink__ = Sink.prototype;
Object.defineProperty(__Sink__, ES2024.Symbol.toStringTag, {
  value: "Sink",
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

// enqueue is initiated by the input
// input must be async iterable
export class Queue {
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
