/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as Streams from "./streams@20250212.mjs";

// If not cross-origin-isolated, the browser does not provide concurrent access to SharedArrayBuffers.
// ECMAScript 2024 25.2.3
export const SharedArrayBuffer = self.window.crossOriginIsolated ? globalThis.SharedArrayBuffer : () => { throw new Error("Only available in cross origin isolation."); };
export const __SharedArrayBuffer__ = self.window.crossOriginIsolated ? globalThis.SharedArrayBuffer.prototype : null;

class Window {
  constructor() {
  }
  initializeMessages(queue) {
    this.message = new Streams.Source(({ next, complete, error }) => {
      queue.addEventListener("message", next);
      queue.start();
    });
  }
};
export const window = new Window();
