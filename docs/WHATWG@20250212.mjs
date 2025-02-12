/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as Iterators from "iterators";

// If not cross-origin-isolated, the browser does not provide concurrent access to SharedArrayBuffers.
// ECMAScript 2024 25.2.3
export const SharedArrayBuffer = window.crossOriginIsolated ? globalThis.SharedArrayBuffer : () => { throw new Error("Only available in cross origin isolation."); };
export const __SharedArrayBuffer__ = window.crossOriginIsolated ? globalThis.SharedArrayBuffer.prototype : null;

class Window {
  constructor() {
    this.message = new Iterators.Source();
  }
};
export window = new Window();
