/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// This module is safe for all ECMAScript 2024 implementations

export const Object = self.Object;
export const __Object__ = self.Object.prototype;
export const __Function__ = self.Function.prototype;
export const __AsyncFunction__ = self.Object.getPrototypeOf(async () => {});
export const __Array__ = self.Array.prototype;
export const __Number__ = self.Number.prototype;
export const __Promise__ = self.Promise.prototype;


// Fundamental Objects
Object // ECMAScript 2024 20.1.1
Function // ECMAScript 2024 20.2.1
Boolean // ECMAScript 2024 20.3.1
Symbol // ECMAScript 2024 20.4.1
Error // ECMAScript 2024 20.5.1
EvalError // ECMAScript 2024 20.5.5.1
RangeError // ECMAScript 2024 20.5.5.2
ReferenceError // ECMAScript 2024 20.5.5.3
SyntaxError // ECMAScript 2024 20.5.5.4
TypeError // ECMAScript 2024 20.5.5.5
URIError // ECMAScript 2024 20.5.5.6
AggregateError // ECMAScript 2024 20.5.7.1
// Numbers and Dates
Number // ECMAScript 2024 21.1.1
BigInt // ECMAScript 2024 21.2.1
Date // ECMAScript 2024 21.4.2
// Text Processing
String // ECMAScript 2024 22.1.1
RegExp // ECMAScript 2024 22.2.4
// Indexed Collections
Array // ECMAScript 2024 23.1.1
BigInt64Array // ECMAScript 2024 23.2.5
BigUint64Array // ECMAScript 2024 23.2.5
Float32Array // ECMAScript 2024 23.2.5
Float64Array // ECMAScript 2024 23.2.5
Int8Array // ECMAScript 2024 23.2.5
Int16Array // ECMAScript 2024 23.2.5
Int32Array // ECMAScript 2024 23.2.5
Uint8Array // ECMAScript 2024 23.2.5
Uint8ClampedArray // ECMAScript 2024 23.2.5
Uint16Array // ECMAScript 2024 23.2.5
Uint32Array // ECMAScript 2024 23.2.5
// Keyed Collections
Map // ECMAScript 2024 24.1.1
Set // ECMAScript 2024 24.2.1
WeakMap // ECMAScript 2024 24.3.1
WeakSet // ECMAScript 2024 24.4
// Structured Data
ArrayBuffer // ECMAScript 2024 25.1.4
SharedArrayBuffer // ECMAScript 2024 25.2.3
DataView // ECMAScript 2024 25.3.2
// Managing Memory
WeakRef // ECMAScript 2024 26.1.1
FinalizationRegistry // ECMAScript 2024 26.2.1
// Control Abstraction Objects
Promise // ECMAScript 2024 27.2.3
// Reflection
Proxy // ECMAScript 2024 28.2.1


