/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as Main from "./main.mjs";

Main.hello();
const initScript = document.getElementById("init");
Main.window.initializeMessages(initScript.messageQueue);
console.log(Function.prototype === Main.__Function__);
const thisSource = new Main.Source(({ next, complete, error }) => {
  let i = 0;
  setInterval(() => {
    ++i;
    next(i);
  }, 500);
});
const thisSink = new Main.Sink(console.log);
const thisStream = thisSink.stream(thisSource);
const worker = new Worker("./worker.js");
