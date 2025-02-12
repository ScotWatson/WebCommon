/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// This module is safe for all ECMAScript 2024 implementations

export const __AsyncFunction__ = globalThis.Object.getPrototypeOf(async () => {});

// Fundamental Objects
// ECMAScript 2024 20.1.1
export const Object = globalThis.Object;
export const __Object__ = globalThis.Object.prototype;
// ECMAScript 2024 20.2.1
export const Function = globalThis.Function;
export const __Function__ = globalThis.Function.prototype;
// ECMAScript 2024 20.3.1
export const Boolean = globalThis.Boolean;
export const __Boolean__ = globalThis.Boolean.prototype;
// ECMAScript 2024 20.4.1
export const Symbol = globalThis.Symbol;
export const __Symbol__ = globalThis.Symbol.prototype;
// ECMAScript 2024 20.5.1
export const Error = globalThis.Error;
export const __Error__ = globalThis.Error.prototype;
// ECMAScript 2024 20.5.5.1
export const EvalError = globalThis.EvalError;
export const __EvalError__ = globalThis.EvalError.prototype;
// ECMAScript 2024 20.5.5.2
export const RangeError = globalThis.RangeError;
export const __RangeError__ = globalThis.RangeError.prototype;
// ECMAScript 2024 20.5.5.3
export const ReferenceError = globalThis.ReferenceError;
export const __ReferenceError__ = globalThis.ReferenceError.prototype;
// ECMAScript 2024 20.5.5.4
export const SyntaxError = globalThis.SyntaxError;
export const __SyntaxError__ = globalThis.SyntaxError.prototype;
// ECMAScript 2024 20.5.5.5
export const TypeError = globalThis.TypeError;
export const __TypeError__ = globalThis.TypeError.prototype;
// ECMAScript 2024 20.5.5.6
export const URIError = globalThis.URIError;
export const __URIError__ = globalThis.URIError.prototype;
// ECMAScript 2024 20.5.7.1
export const AggregateError = globalThis.AggregateError;
export const __AggregateError__ = globalThis.AggregateError.prototype;
// Numbers and Dates
// ECMAScript 2024 21.1.1
export const Number = globalThis.Number;
export const __Number__ = globalThis.Number.prototype;
// ECMAScript 2024 21.2.1
export const BigInt = globalThis.BigInt;
export const __BigInt__ = globalThis.BigInt.prototype;
// ECMAScript 2024 21.4.2
export const Date = globalThis.Date;
export const __Date__ = globalThis.Date.prototype;
// Text Processing
// ECMAScript 2024 22.1.1
export const String = globalThis.String;
export const __String__ = globalThis.String.prototype;
// ECMAScript 2024 22.2.4
export const RegExp = globalThis.RegExp;
export const __RegExp__ = globalThis.RegExp.prototype;
// Indexed Collections
// ECMAScript 2024 23.1.1
export const Array = globalThis.Array;
export const __Array__ = globalThis.Array.prototype;
// ECMAScript 2024 23.2.5
export const BigInt64Array = globalThis.BigInt64Array;
export const __BigInt64Array__ = globalThis.BigInt64Array.prototype;
// ECMAScript 2024 23.2.5
export const BigUint64Array = globalThis.BigUint64Array;
export const __BigUint64Array__ = globalThis.BigUint64Array.prototype;
// ECMAScript 2024 23.2.5
export const Float32Array = globalThis.Float32Array;
export const __Float32Array__ = globalThis.Float32Array.prototype;
// ECMAScript 2024 23.2.5
export const Float64Array = globalThis.Float64Array;
export const __Float64Array__ = globalThis.Float64Array.prototype;
// ECMAScript 2024 23.2.5
export const Int8Array = globalThis.Int8Array;
export const __Int8Array__ = globalThis.Int8Array.prototype;
// ECMAScript 2024 23.2.5
export const Int16Array = globalThis.Int16Array;
export const __Int16Array__ = globalThis.Int16Array.prototype;
// ECMAScript 2024 23.2.5
export const Int32Array = globalThis.Int32Array;
export const __Int32Array__ = globalThis.Int32Array.prototype;
// ECMAScript 2024 23.2.5
export const Uint8Array = globalThis.Uint8Array;
export const __Uint8Array__ = globalThis.Uint8Array.prototype;
// ECMAScript 2024 23.2.5
export const Uint8ClampedArray = globalThis.Uint8ClampedArray;
export const __Uint8ClampedArray__ = globalThis.Uint8ClampedArray.prototype;
// ECMAScript 2024 23.2.5
export const Uint16Array = globalThis.Uint16Array;
export const __Uint16Array__ = globalThis.Uint16Array.prototype;
// ECMAScript 2024 23.2.5
export const Uint32Array = globalThis.Uint32Array;
export const __Uint32Array__ = globalThis.Uint32Array.prototype;
// Keyed Collections
// ECMAScript 2024 24.1.1
export const Map = globalThis.Map;
export const __Map__ = globalThis.Map.prototype;
// ECMAScript 2024 24.2.1
export const Set = globalThis.Set;
export const __Set__ = globalThis.Set.prototype;
// ECMAScript 2024 24.3.1
export const WeakMap = globalThis.WeakMap;
export const __WeakMap__ = globalThis.WeakMap.prototype;
// ECMAScript 2024 24.4
export const WeakSet = globalThis.WeakSet;
export const __WeakSet__ = globalThis.WeakSet.prototype;
// Structured Data
// ECMAScript 2024 25.1.4
export const ArrayBuffer = globalThis.ArrayBuffer;
export const __ArrayBuffer__ = globalThis.ArrayBuffer.prototype;
// ECMAScript 2024 25.3.2
export const DataView = globalThis.DataView;
export const __DataView__ = globalThis.DataView.prototype;
// Managing Memory
// ECMAScript 2024 26.1.1
export const WeakRef = globalThis.WeakRef;
export const __WeakRef__ = globalThis.WeakRef.prototype;
// ECMAScript 2024 26.2.1
export const FinalizationRegistry = globalThis.FinalizationRegistry;
export const __FinalizationRegistry__ = globalThis.FinalizationRegistry.prototype;
// Control Abstraction Objects
// ECMAScript 2024 27.2.3
export const Promise = globalThis.Promise;
export const __Promise__ = globalThis.Promise.prototype;
// Reflection
// ECMAScript 2024 28.2.1
export const Proxy = globalThis.Proxy;
export const __Proxy__ = globalThis.Proxy.prototype;
