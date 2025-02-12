import * as App from "./modules.mjs";
App.hello();
const loadingIterators = import("https://scotwatson.github.io/WebCommon/20250212/iterators.mjs");
loadingIterators.then((Iterators) => {
  console.log(Function.prototype === Iterators.__Function__);
  const thisSource = new Iterators.Source(({ next, complete, error }) => {
    let i = 0;
    setInterval(() => {
      ++i;
      next(i);
    }, 500);
  });
  const thisSourceView = thisSource[Symbol.asyncIterator]();
  const thisSink = new Iterators.Sink(console.log);
  const thisStream = thisSink.stream(thisSource);
});
