/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export const __Object__ = Object.prototype;
export const __Function__ = Function.prototype;
export const __AsyncFunction__ = Object.getPrototypeOf(async () => {});
export const __Array__ = Array.prototype;
export const __Number__ = Number.prototype;
export const __Promise__ = Promise.prototype;

export const GeneratorFunction = (function* () {}).constructor;
export const __GeneratorFunction__ = GeneratorFunction.prototype;
export const __Generator__ = __GeneratorFunction__.prototype;
// Per ECMAScript 2024, __Generator__.constuctor === __GeneratorFunction__, but typeof __GeneratorFunction__ !== "function".
export const __Iterator__ = Object.getPrototypeOf(__Generator__);
export const Iterator = __Iterator__.constructor;  // Not guarenteed by ECMAScript 2024, but supported by major browsers
export const AsyncGeneratorFunction = (async function* () {}).constructor;
export const __AsyncGeneratorFunction__ = AsyncGeneratorFunction.prototype;
export const __AsyncGenerator__ = __AsyncGeneratorFunction__.prototype;
// Per ECMAScript 2024, __AsyncGenerator__.constuctor === __AsyncGeneratorFunction__, but typeof __AsyncGeneratorFunction__ !== "function".
export const __AsyncIterator__ = Object.getPrototypeOf(__AsyncGenerator__);
export const AsyncIterator = __AsyncIterator__.constructor;  // Not guarenteed by ECMAScript 2024, but supported by major browsers

// Implements the async iterable interface
// Produces data independent of consumption, therefore a push source
class SourceView extends __AsyncIterator__ {
  #info;
  constructor(info) {
    this.#info = info;
  }
  next() {
    return new Promise((resolve, reject) => {
      this.#info.waiting.then(resolve, reject);
    });
  }
}
export const __SourceView__ = SourceView.prototype;
export class Source {
  #info;
  constructor(init) {
    let _resolve = null;
    let _reject = null;
    this.#info = {};
    const waitForInput = () => {
      this.#info.waiting = new Promise((resolve, reject) => {
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
    this.viewPrototype = Object.create(__SourceView__);
    init(capabilities);
  }
  [Symbol.asyncIterator]() {
    // This function returns a SourceView
    // This function may be called more than once, allowing for multiple consumers
    // Client code may stop consuming (calling next()) at any time, so values are not stored up after the last promise returned from next() is settled.
    // Client code that is still consuming is responsible for calling next() as soon as possible after the last return value has settled.
    // Calling next() multiple times between values creates multiple promises that all settle simultaneously.
    SourceView.prototype = this.viewPrototype;
    return new SourceView(this.#info);
  }
}
export const __Source__ = Source.prototype;
__Source__.prototype = __SourceView__;
__SourceView__.constructor = __Source__;

// input must be async iterator
// settles when the input ends
export class Sink {
  #handler;
  // handler may be either sync or async function, but return value is ignored and not awaited.
  constructor(handler) {
    this.#handler = handler;
  }
  // similar to an async function, except the promise is cancelable
  stream(input) {
    let canceled = false;
    const ret = (async () => {
      const { value, done } = await input.next();
      while (!done && !canceled) {
        this.#handler(value);
        ({ value, done } = await input.next());
      }
      if (canceled) {
        throw new Error("Stream was canceled.");
      }
      return value;
      /*
      Similar to the following, except it returns the final value:
      for await (const value of input) {
        this.#handler(value);
      }
      */
    })();
    ret.cancel = () => {
      canceled = true;
    };
    return ret;
  }
}

// enqueue is initiated by the input
// input must be async iterable
export class Queue {
  constructor(input) {
    const contents = [];
    const reader = new Sink((value) => {
      if (value !== undefined) {
        contents.push(value);
      }
    });
    const reading = reader.stream(input);
    const ret = await reading;
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

function transform(inputCapabilities, outputCapabilities) {
  const in = await inputCapabilities.get();
  outputCapabilities.put(in);
}
