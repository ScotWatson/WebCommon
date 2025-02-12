/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as App from "./modules.mjs";

App.hello();
console.log(Function.prototype === App.__Function__);
const thisSource = new App.Source(({ next, complete, error }) => {
  let i = 0;
  setInterval(() => {
    ++i;
    next(i);
  }, 500);
});
const thisSourceView = thisSource[Symbol.asyncIterator]();
const thisSink = new App.Sink(console.log);
const thisStream = thisSink.stream(thisSource);
