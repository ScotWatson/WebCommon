/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const me = window.document.currentScript;

me.insertScript = function insertScript(id, url) {
  const script = window.document.createElement("script");
  script.id = id;
  script.src = url;
  window.document.write(script.outerHTML);
  return document.getElementById(id);
};

const MessageQueueScript = me.insertScript("MessageQueue", "https://scotwatson.github.io/WebCommon/MessageQueue@20250212.js");

MessageQueueScript.addEventListener("load", () => {
//  const MessageQueue = MessageQueueScript.exports.default;
  me.messageQueue = new window.MessageQueue(window);
  delete window.MessageQueue;
});
